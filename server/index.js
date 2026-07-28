import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import multer from 'multer'

const __dirname = join(process.cwd(), 'server')

const app = express()
const PORT = 3001

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors())
app.use(express.json())

// Serve uploaded images
const uploadsDir = join(__dirname, 'uploads')
try {
  if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true })
} catch (e) {
  console.log('Uploads dir warning:', e.message)
}
app.use('/uploads', express.static(uploadsDir))

// Multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    cb(null, `${Date.now()}-${uuidv4().slice(0, 8)}.${ext}`)
  }
})
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

// In-memory fallback cache for Vercel read-only environment
const MEMORY_CACHE = {}

// ── Data Helpers ───────────────────────────────────────────────────────────
const DATA_DIR = join(__dirname, 'data')

function readJSON(filename) {
  if (MEMORY_CACHE[filename]) return MEMORY_CACHE[filename]
  const filepath = join(DATA_DIR, filename)
  try {
    if (!existsSync(filepath)) return filename.includes('treatments') ? { skin: [], hair: [], makeup: [] } : []
    const data = JSON.parse(readFileSync(filepath, 'utf-8'))
    MEMORY_CACHE[filename] = data
    return data
  } catch (e) {
    return filename.includes('treatments') ? { skin: [], hair: [], makeup: [] } : []
  }
}

function writeJSON(filename, data) {
  MEMORY_CACHE[filename] = data
  try {
    writeFileSync(join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf-8')
  } catch (e) {
    console.log('Vercel read-only storage fallback active:', e.message)
  }
}

// ── Simple Auth ────────────────────────────────────────────────────────────
const ADMIN_USER = { username: 'admin', password: 'admin', name: 'Shivsai Admin' }

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const token = authHeader.split(' ')[1]
  if (token !== 'shivsai360-admin-token') {
    return res.status(401).json({ error: 'Invalid token' })
  }
  next()
}

// ── Auth Routes ────────────────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    return res.json({ token: 'shivsai360-admin-token', admin: { name: ADMIN_USER.name } })
  }
  res.status(401).json({ error: 'Invalid credentials' })
})

// ── Treatment Routes ───────────────────────────────────────────────────────
app.get('/api/treatments', (req, res) => {
  const treatments = readJSON('treatments.json')
  res.json(treatments)
})

app.post('/api/treatments', authMiddleware, (req, res) => {
  const treatments = readJSON('treatments.json')
  const { category, ...treatmentData } = req.body
  const cat = category || 'skin'
  if (!treatments[cat]) treatments[cat] = []

  const newTreatment = {
    id: `${cat[0]}${Date.now()}`,
    ...treatmentData
  }
  // Auto-format price if not provided
  if (newTreatment.price && !newTreatment.priceFormatted) {
    newTreatment.priceFormatted = `₹${Number(newTreatment.price).toLocaleString('en-IN')}`
  }
  treatments[cat].push(newTreatment)
  writeJSON('treatments.json', treatments)
  res.status(201).json(newTreatment)
})

app.put('/api/treatments/:id', authMiddleware, (req, res) => {
  const treatments = readJSON('treatments.json')
  const { id } = req.params
  const updates = req.body

  for (const cat of Object.keys(treatments)) {
    const idx = treatments[cat].findIndex(t => t.id === id)
    if (idx !== -1) {
      // If category changed, move it
      if (updates.category && updates.category !== cat) {
        const moved = { ...treatments[cat][idx], ...updates }
        delete moved.category
        if (moved.price && !moved.priceFormatted) {
          moved.priceFormatted = `₹${Number(moved.price).toLocaleString('en-IN')}`
        }
        treatments[cat].splice(idx, 1)
        if (!treatments[updates.category]) treatments[updates.category] = []
        treatments[updates.category].push(moved)
        writeJSON('treatments.json', treatments)
        return res.json(moved)
      }

      treatments[cat][idx] = { ...treatments[cat][idx], ...updates }
      delete treatments[cat][idx].category
      if (treatments[cat][idx].price) {
        treatments[cat][idx].priceFormatted = `₹${Number(treatments[cat][idx].price).toLocaleString('en-IN')}`
      }
      writeJSON('treatments.json', treatments)
      return res.json(treatments[cat][idx])
    }
  }
  res.status(404).json({ error: 'Treatment not found' })
})

app.delete('/api/treatments/:id', authMiddleware, (req, res) => {
  const treatments = readJSON('treatments.json')
  const { id } = req.params

  for (const cat of Object.keys(treatments)) {
    const idx = treatments[cat].findIndex(t => t.id === id)
    if (idx !== -1) {
      treatments[cat].splice(idx, 1)
      writeJSON('treatments.json', treatments)
      return res.json({ success: true })
    }
  }
  res.status(404).json({ error: 'Treatment not found' })
})

// ── Doctor Routes ──────────────────────────────────────────────────────────
app.get('/api/doctors', (req, res) => {
  res.json(readJSON('doctors.json'))
})

app.post('/api/doctors', authMiddleware, (req, res) => {
  const doctors = readJSON('doctors.json')
  const newDoctor = { id: `doc${Date.now()}`, ...req.body }
  doctors.push(newDoctor)
  writeJSON('doctors.json', doctors)
  res.status(201).json(newDoctor)
})

app.put('/api/doctors/:id', authMiddleware, (req, res) => {
  const doctors = readJSON('doctors.json')
  const idx = doctors.findIndex(d => d.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Doctor not found' })

  doctors[idx] = { ...doctors[idx], ...req.body }
  writeJSON('doctors.json', doctors)
  res.json(doctors[idx])
})

app.delete('/api/doctors/:id', authMiddleware, (req, res) => {
  let doctors = readJSON('doctors.json')
  const idx = doctors.findIndex(d => d.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Doctor not found' })

  doctors.splice(idx, 1)
  writeJSON('doctors.json', doctors)
  res.json({ success: true })
})

// ── Case Study Routes ──────────────────────────────────────────────────────
app.get('/api/case-studies', (req, res) => {
  res.json(readJSON('case-studies.json'))
})

app.post('/api/case-studies', authMiddleware, (req, res) => {
  const studies = readJSON('case-studies.json')
  const newStudy = { id: `cs${Date.now()}`, ...req.body }
  studies.push(newStudy)
  writeJSON('case-studies.json', studies)
  res.status(201).json(newStudy)
})

app.put('/api/case-studies/:id', authMiddleware, (req, res) => {
  const studies = readJSON('case-studies.json')
  const idx = studies.findIndex(s => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Case study not found' })

  studies[idx] = { ...studies[idx], ...req.body }
  writeJSON('case-studies.json', studies)
  res.json(studies[idx])
})

app.delete('/api/case-studies/:id', authMiddleware, (req, res) => {
  let studies = readJSON('case-studies.json')
  const idx = studies.findIndex(s => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Case study not found' })

  studies.splice(idx, 1)
  writeJSON('case-studies.json', studies)
  res.json({ success: true })
})

// ── Booking Routes ─────────────────────────────────────────────────────────
app.get('/api/bookings', authMiddleware, (req, res) => {
  res.json(readJSON('bookings.json'))
})

app.post('/api/bookings', (req, res) => {
  const bookings = readJSON('bookings.json')
  const refId = `SS360-${Math.floor(1000 + Math.random() * 9000)}`
  const newBooking = {
    id: uuidv4(),
    refId,
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  bookings.push(newBooking)
  writeJSON('bookings.json', bookings)
  res.status(201).json(newBooking)
})

app.post('/api/bookings/:id/status', authMiddleware, (req, res) => {
  const bookings = readJSON('bookings.json')
  const idx = bookings.findIndex(b => b.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Booking not found' })

  bookings[idx].status = req.body.status
  bookings[idx].updatedAt = new Date().toISOString()
  writeJSON('bookings.json', bookings)
  res.json(bookings[idx])
})

// ── Callback Routes ────────────────────────────────────────────────────────
app.get('/api/callbacks', authMiddleware, (req, res) => {
  res.json(readJSON('callbacks.json'))
})

app.post('/api/callbacks', (req, res) => {
  const callbacks = readJSON('callbacks.json')
  const newCallback = {
    id: uuidv4(),
    phone: req.body.phone,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  callbacks.push(newCallback)
  writeJSON('callbacks.json', callbacks)
  res.status(201).json(newCallback)
})

app.post('/api/callbacks/:id/resolve', authMiddleware, (req, res) => {
  const callbacks = readJSON('callbacks.json')
  const idx = callbacks.findIndex(c => c.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Callback not found' })

  callbacks[idx].status = 'resolved'
  callbacks[idx].resolvedAt = new Date().toISOString()
  writeJSON('callbacks.json', callbacks)
  res.json(callbacks[idx])
})

// ── Upload Route ───────────────────────────────────────────────────────────
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  const url = `/uploads/${req.file.filename}`
  const host = req.get('host')
  const protocol = req.protocol
  res.json({ url, fullUrl: `${protocol}://${host}${url}` })
})

// ── Stats Route ────────────────────────────────────────────────────────────
app.get('/api/stats', authMiddleware, (req, res) => {
  const treatments = readJSON('treatments.json')
  const bookings = readJSON('bookings.json')
  const callbacks = readJSON('callbacks.json')

  const totalTreatments = Object.values(treatments).reduce((sum, arr) => sum + arr.length, 0)
  const totalBookings = bookings.length
  const pendingCallbacks = callbacks.filter(c => c.status === 'pending').length
  const pendingBookings = bookings.filter(b => b.status === 'pending').length
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length

  // Estimate monthly revenue from confirmed bookings
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthBookings = bookings.filter(b => {
    const d = new Date(b.createdAt)
    return d >= monthStart && (b.status === 'confirmed' || b.status === 'completed')
  })

  // Rough revenue estimate: average treatment price * confirmed bookings this month
  const allPrices = Object.values(treatments).flat().map(t => t.price || 0)
  const avgPrice = allPrices.length > 0 ? allPrices.reduce((a, b) => a + b, 0) / allPrices.length : 0
  const monthlyRevenue = Math.round(monthBookings.length * avgPrice)

  res.json({
    totalBookings,
    pendingBookings,
    confirmedBookings,
    pendingCallbacks,
    totalTreatments,
    monthlyRevenue
  })
})

// ── Start Server ───────────────────────────────────────────────────────────
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ Shivsai 360 API Server running at http://localhost:${PORT}`)
    console.log(`📂 Data directory: ${DATA_DIR}`)
    console.log(`📸 Uploads directory: ${uploadsDir}`)
  })
}

export default app
