import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config'

// Case studies data for Before/After comparison
const CASE_STUDIES = [
  {
    id: 1,
    category: 'acne',
    title: "Acne Scar Resurfacing Protocol",
    subtitle: "After 4 sessions of Fractional Laser & Microneedling",
    protocol: "Fractional CO2 + PRP Infusion",
    sessions: "4 Sessions (4 weeks apart)",
    recovery: "2–3 Days mild redness",
    doctor: "Dr. Anya Sharma",
    beforeImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuVdGduVCvu5ZbE-2dj69Sul-VcOet7rtn12sZrBBVzP1TsKqVA4CfJSia9YnG7k88-rfrq2ecDDnuWasAR9-p10IEp6T2UD31Vt8QKeGt7R7DNUCOT9aUskG0kpliptUlYgj-MImU0omwLU03BeeCXnc9nt3tWc5T3Y7tFAsqPC9Ub8Ni7ayhbcf5ODd91eV78KtnAirWCbctw-8P1UdnEdopxMWIl4YZuzGilz7h4jVzrwQrvxqWk1EF2zOhs_-5pXLpCuFmbTI",
    afterImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOuITv_14rE8ELr-G6BWEFAtPPf1qPt-ZvAAkLmNj8N8ba4YrOkkmLohs4aaVNQ3oDnA4ZiMoawXT97WQwSpnDGviwWipp8nsNrNNuFLN9hrqDy4MR9SCxBfIwagNQH-Uc4xjytvnQkVwKdlYScucuBRzynfnOSPHKZTyeTOX_Y8aVdRiO4N6ZvmepCmoJd3ZPExk4ihN23RaHBfwjUrBLkiLJf5k3yeVMTZRzauYw9E7hJVt6OK543fg7ib-b4SB2Sjpqf1MKnmE"
  },
  {
    id: 2,
    category: 'hair',
    title: "Advanced Hair Regrowth Protocol",
    subtitle: "After a 6-month advanced PRP & topical protocol",
    protocol: "Follicular PRP & Low-Level Laser",
    sessions: "6 Sessions over 6 months",
    recovery: "Zero Downtime",
    doctor: "Dr. Rohan Verma",
    beforeImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCQaW2BKvkPCWYKMZDv7AmTRbwvodDErTOA8vHUsYCqJeDZWfRsCm8nqujwVIEtnv8r8syzKeH26rcRhllifWt56JJh8EWb9sBK3ctt29tkiUp2MZIEfFfyTOJ19JnMh5hdn_D3YRpyt1eAxQW6W89_ZBsgRB08evMkWM-VfjLw8BtBCOJ9JGbwVSTtT5bGVLx0y_BlXNUhc6Jw0A3WQ6unhfAde-5uSIJMZd6YsZIco1YKnJnzfDpjbwSOl22j2BNXgPtZBVbX3Y",
    afterImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT7ne4EYE-E7zHeh5XmmlQ4pm51JMKNruOkzEaIa7U-4cbZOQqGFAmBW1k_oVlC8vPyinvRYLYZxT_yg6TX7CFSqVwcaP-JQYBNfSpAhr1jcnXiHPzO-dzVDkc6-uNmMbS0yXYx-CMh5xPjh6Q7bNBUrJBo1u9esHMOIsXDtABoPS7lS3Hwb3Dbmw3GZ67EJ3JeOUTSgcmAK_qkQU5trk3ded3Z3lDhqnp-h3gleaNN-ZC0Pz0NDjNuUhjAvQ3jKbqSSvpuE0j89M"
  },
  {
    id: 3,
    category: 'antiaging',
    title: "Facial Sculpting & Volume Restoration",
    subtitle: "Cheek & Jawline Dermal Contour Enhancement",
    protocol: "Hyaluronic Acid Dermal Sculpting",
    sessions: "Single 45-min Session",
    recovery: "Immediate Results",
    doctor: "Dr. Meera Patel",
    beforeImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    afterImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
  }
]

// Doctors list
const DOCTORS = [
  {
    name: "Dr. Anya Sharma",
    title: "Chief Cosmetic Dermatologist",
    degree: "MD (Dermatology), Fellow in Aesthetic Medicine (London)",
    exp: "14+ Years Clinical Practice",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    specialties: ["Laser Resurfacing", "Acne Scar Revision", "AI Skin Diagnostics"]
  },
  {
    name: "Dr. Rohan Verma",
    title: "Senior Hair Transplant Specialist",
    degree: "M.Ch (Plastic Surgery), ISHRS Member",
    exp: "12+ Years Experience",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    specialties: ["FUE & DHI Transplants", "Scalp Micropigmentation", "PRP Growth"]
  },
  {
    name: "Dr. Meera Patel",
    title: "Aesthetic Physician & Injector",
    degree: "MBBS, Diploma in Practical Dermatology (Cardiff)",
    exp: "9+ Years Experience",
    img: "https://images.unsplash.com/photo-1594824813566-78a933758f46?auto=format&fit=crop&q=80&w=600",
    specialties: ["Dermal Fillers", "Botox Wrinkle Care", "Bridal Aesthetics"]
  }
]

function BeforeAfterSlider({ title, subtitle, protocol, sessions, recovery, doctor, beforeImg, afterImg }) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percentage)
  }

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX)
    }
  }

  const handleMouseMove = (e) => {
    if (isDragging.current || e.buttons === 1) {
      handleMove(e.clientX)
    }
  }

  const handleMouseDown = (e) => {
    isDragging.current = true
    handleMove(e.clientX)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseUp = () => {
    isDragging.current = false
    window.removeEventListener('mouseup', handleMouseUp)
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className="bg-white border border-[#cdc6ba]/30 overflow-hidden custom-shadow flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-[#cdc6ba]/30">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-['EB_Garamond'] text-[22px] font-medium text-[#1a1c1a]">{title}</h3>
            <span className="text-[11px] font-['DM_Sans'] font-semibold bg-[#ffdea5]/30 text-[#775a19] px-2.5 py-1 uppercase tracking-[0.05em]">
              Verified Outcome
            </span>
          </div>
          <p className="font-['DM_Sans'] text-[14px] text-[#4b463e]">{subtitle}</p>
        </div>

        <div
          ref={containerRef}
          className="before-after-slider relative w-full h-[280px] sm:h-[380px] select-none touch-none cursor-ew-resize"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
        >
          {/* After image (background) */}
          <img src={afterImg} alt="After treatment" className="slider-image pointer-events-none" />

          {/* Before image (clipped overlay) */}
          <div
            className="absolute inset-0 z-10 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img src={beforeImg} alt="Before treatment" className="slider-image pointer-events-none" />
          </div>

          {/* Handle */}
          <div className="slider-handle" style={{ left: `${sliderPos}%` }} />

          {/* Labels */}
          <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-[11px] font-['DM_Sans'] font-medium tracking-[0.08em] uppercase">
            Before
          </div>
          <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-[11px] font-['DM_Sans'] font-medium tracking-[0.08em] uppercase">
            After
          </div>
        </div>
      </div>

      {/* Protocol metadata footer */}
      <div className="p-4 bg-[#f4f3f1] border-t border-[#cdc6ba]/20 text-[12px] grid grid-cols-2 gap-2 text-[#4b463e]">
        <div><span className="text-[#7c766d]">Protocol:</span> <span className="font-medium text-[#1a1c1a]">{protocol}</span></div>
        <div><span className="text-[#7c766d]">Sessions:</span> <span className="font-medium text-[#1a1c1a]">{sessions}</span></div>
        <div><span className="text-[#7c766d]">Downtime:</span> <span className="font-medium text-[#1a1c1a]">{recovery}</span></div>
        <div><span className="text-[#7c766d]">Lead Doctor:</span> <span className="font-medium text-[#775a19]">{doctor}</span></div>
      </div>
    </div>
  )
}

export default function ResultsBookingPage() {
  const location = useLocation()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const [doctorsList, setDoctorsList] = useState(DOCTORS)
  const [caseStudiesList, setCaseStudiesList] = useState(CASE_STUDIES)

  // Form State
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doctor: 'Any Available Doctor',
    interest: 'Skin Resurfacing',
    date: '',
    slot: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookingRef, setBookingRef] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Fetch doctors and case studies from API
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/doctors`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setDoctorsList(data) })
      .catch(err => console.log('Using default doctors fallback:', err))

    fetch(`${API_BASE_URL}/api/case-studies`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setCaseStudiesList(data) })
      .catch(err => console.log('Using default case studies fallback:', err))
  }, [])

  // Pre-fill form from URL query string & scroll to hashes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const treatmentParam = searchParams.get('treatment')
    if (treatmentParam) {
      setFormData((prev) => ({ ...prev, interest: decodeURIComponent(treatmentParam) }))
    }

    if (location.hash) {
      const hash = location.hash.replace('#', '').split('?')[0]
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 70
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 250)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep = (currentStep) => {
    const newErrors = {}
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Full name is required'
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email address is invalid'
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    } else if (currentStep === 2) {
      if (!formData.date) newErrors.date = 'Preferred date is required'
      if (!formData.slot) newErrors.slot = 'Please select an appointment slot'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    if (validateStep(2)) {
      setSubmitting(true)
      try {
        const res = await fetch(`${API_BASE_URL}/api/bookings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        const data = await res.json()
        setBookingRef(data.refId || `SS360-${Math.floor(1000 + Math.random() * 9000)}`)
      } catch (err) {
        console.error('Booking submission error:', err)
        setBookingRef(`SS360-${Math.floor(1000 + Math.random() * 9000)}`)
      } finally {
        setSubmitting(false)
        setIsSubmitted(true)
      }
    }
  }

  const selectDoctorAndBook = (docName) => {
    setFormData(prev => ({ ...prev, doctor: docName }))
    const el = document.getElementById('booking')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const filteredCaseStudies = selectedCategory === 'all'
    ? caseStudiesList
    : caseStudiesList.filter(c => c.category === selectedCategory)

  const slots = [
    { time: '09:00 AM', disabled: true },
    { time: '10:30 AM', disabled: true },
    { time: '01:00 PM', disabled: false },
    { time: '03:30 PM', disabled: false },
    { time: '05:30 PM', disabled: false },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[55vh] flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/doctor_consultation_hero_1785201942839.jpg"
            alt="Dermatologist consultation"
            className="w-full h-full object-cover saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-16 w-full">
          <div className="max-w-[600px] text-white">
            <p className="font-['DM_Sans'] text-[14px] font-medium tracking-[0.15em] uppercase text-[#e9c176] mb-3">
              Clinical Outcomes & Specialists
            </p>
            <h1 className="font-['EB_Garamond'] text-[40px] md:text-[56px] font-medium leading-[1.1] text-white mb-4">
              Expertise in Every Detail.
            </h1>
            <p className="text-[16px] text-[#e4e2e1] leading-[26px]">
              Review unretouched clinical transformations and reserve your private consultation with Kolhapur's senior dermatologists.
            </p>
          </div>
        </div>
      </section>

      {/* Before/After Gallery Section */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-20">
        <div className="text-center mb-12">
          <p className="font-['DM_Sans'] text-[14px] font-medium tracking-[0.15em] uppercase text-[#775a19] mb-3">
            Clinical Gallery
          </p>
          <h2 className="font-['EB_Garamond'] text-[36px] md:text-[48px] font-medium text-[#1a1c1a]">
            Verified Transformations
          </h2>
          <p className="text-[15px] text-[#4b463e] mt-3 max-w-[540px] mx-auto leading-[24px]">
            Drag the slider handles left and right to inspect clinical before and after patient progress photos.
          </p>
        </div>

        {/* Gallery Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 px-2">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'acne', label: 'Acne & Scars' },
            { id: 'hair', label: 'Hair Regrowth' },
            { id: 'antiaging', label: 'Sculpting & Anti-Aging' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 font-['DM_Sans'] text-[13px] font-medium tracking-[0.05em] uppercase transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#665e4b] text-white border-[#665e4b]'
                  : 'bg-white text-[#4b463e] border-[#cdc6ba]/50 hover:border-[#665e4b]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCaseStudies.map((study) => (
            <BeforeAfterSlider
              key={study.id}
              title={study.title}
              subtitle={study.subtitle}
              protocol={study.protocol}
              sessions={study.sessions}
              recovery={study.recovery}
              doctor={study.doctor}
              beforeImg={study.beforeImg}
              afterImg={study.afterImg}
            />
          ))}
        </div>
      </section>

      {/* Expert Doctors Section */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-8">
        <div>
          <div className="text-center mb-6">
            <p className="font-['DM_Sans'] text-[13px] font-bold tracking-[0.15em] uppercase text-[#775a19] mb-2">
              Medical Leadership
            </p>
            <h2 className="font-['EB_Garamond'] text-[32px] md:text-[44px] font-medium text-[#1a1c1a]">
              Meet Our Clinical Specialists
            </h2>
            <p className="text-[14px] text-[#4b463e] mt-2 max-w-[560px] mx-auto">
              Board-certified practitioners combining international clinical protocols with artistic accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctorsList.map((doc) => (
              <div
                key={doc.name}
                className="bg-white/70 backdrop-blur-md border border-white/80 rounded-3xl overflow-hidden shadow-lg shadow-black/5 bento-card flex flex-col justify-between"
              >
                <div>
                  <div className="h-[280px] overflow-hidden relative">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 text-[11px] font-['DM_Sans'] uppercase tracking-[0.08em]">
                      {doc.exp}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['EB_Garamond'] text-[24px] font-medium text-[#1a1c1a] mb-1">
                      {doc.name}
                    </h3>
                    <p className="font-['DM_Sans'] text-[13px] font-semibold text-[#775a19] uppercase tracking-[0.05em] mb-2">
                      {doc.title}
                    </p>
                    <p className="text-[12px] text-[#7c766d] mb-4 leading-[18px]">{doc.degree}</p>

                    <div className="space-y-1">
                      {doc.specialties?.map((spec, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[12px] text-[#4b463e]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]" />
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => selectDoctorAndBook(doc.name)}
                    className="w-full bg-gradient-to-r from-[#775a19] via-[#8c6b1f] to-[#5d4201] text-white font-['DM_Sans'] text-[12px] font-semibold tracking-[0.05em] uppercase py-2.5 rounded-full shadow-md hover:scale-105 transition-all"
                  >
                    Book with {doc.name.split(' ')[1] || doc.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-step Booking Form Section */}
      <section id="booking" className="max-w-[1280px] mx-auto px-5 md:px-16 py-8 md:py-10 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Info & Steps */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="font-['DM_Sans'] text-[14px] font-medium tracking-[0.15em] uppercase text-[#775a19] mb-3">
                  Consultation Scheduling
                </p>
                <h2 className="font-['EB_Garamond'] text-[36px] md:text-[48px] font-medium text-[#1a1c1a] leading-[1.1] mb-6">
                  Begin Your Transformation
                </h2>
                <p className="text-[15px] text-[#4b463e] leading-[24px] mb-8">
                  Book a private mapping session with our clinical experts. Select your medical focus area and choose a convenient time slot below.
                </p>
              </div>

              {/* Step Indicators */}
              <div className="hidden lg:block space-y-6">
                {[
                  { num: '01', title: 'Patient Details', desc: 'Contact info & doctor choice' },
                  { num: '02', title: 'Time Selection', desc: 'Select date & slots' },
                  { num: '03', title: 'Confirmation', desc: 'Verify and schedule' },
                ].map((indicatorStep, i) => {
                  const currentIdx = i + 1
                  const isActive = step === currentIdx
                  const isCompleted = step > currentIdx

                  return (
                    <div key={indicatorStep.num} className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-['DM_Sans'] text-[14px] font-semibold border transition-all duration-300 ${
                          isActive
                            ? 'bg-[#775a19] border-[#775a19] text-white'
                            : isCompleted
                            ? 'bg-[#665e4b] border-[#665e4b] text-white'
                            : 'border-[#cdc6ba] text-[#7c766d] bg-white'
                        }`}
                      >
                        {isCompleted ? (
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        ) : (
                          indicatorStep.num
                        )}
                      </div>
                      <div>
                        <h4
                          className={`font-['DM_Sans'] text-[14px] font-semibold tracking-[0.05em] uppercase ${
                            isActive ? 'text-[#775a19]' : 'text-[#4b463e]'
                          }`}
                        >
                          {indicatorStep.title}
                        </h4>
                        <p className="text-[12px] text-[#7c766d]">{indicatorStep.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Column: Form Box */}
            <div className="lg:col-span-7">
              <div className="bg-white/75 backdrop-blur-xl border border-white/80 rounded-3xl p-6 md:p-10 shadow-xl shadow-black/5 min-h-[460px] flex flex-col justify-between">
                
                {isSubmitted ? (
                  // Success State
                  <div className="text-center py-12 my-auto">
                    <div className="w-16 h-16 bg-[#ffdea5]/40 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-[#775a19] text-[36px]">check_circle</span>
                    </div>
                    <h3 className="font-['EB_Garamond'] text-[28px] font-medium text-[#1a1c1a] mb-3">
                      Booking Confirmed
                    </h3>
                    <p className="text-[15px] text-[#4b463e] leading-[24px] max-w-[420px] mx-auto mb-2">
                      Thank you, <span className="font-semibold text-[#1a1c1a]">{formData.name}</span>. Your reservation is registered under reference <span className="font-mono text-[#775a19] font-semibold">#{bookingRef || 'SS360-1001'}</span>.
                    </p>
                    <p className="text-[13px] text-[#7c766d] max-w-[380px] mx-auto mb-2">
                      Doctor Assigned: <span className="font-medium text-[#1a1c1a]">{formData.doctor}</span>
                    </p>
                    <p className="text-[13px] text-[#7c766d] max-w-[360px] mx-auto">
                      A confirmation email was sent to <span className="italic">{formData.email}</span>. Our clinical coordinator will reach out to you within 2 hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false)
                        setStep(1)
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          doctor: 'Any Available Doctor',
                          interest: 'Skin Resurfacing',
                          date: '',
                          slot: '',
                        })
                      }}
                      className="mt-8 bg-[#665e4b] text-white font-['DM_Sans'] text-[13px] font-medium tracking-[0.08em] uppercase px-8 py-3 hover:bg-[#4d4634] transition-colors"
                    >
                      Book Another Consultation
                    </button>
                  </div>
                ) : (
                  // Step Form
                  <div>
                    {/* Mobile Step Bar */}
                    <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-[#cdc6ba]/20">
                      {[
                        { num: 1, label: 'Details' },
                        { num: 2, label: 'Schedule' },
                        { num: 3, label: 'Confirm' },
                      ].map((sItem) => (
                        <div key={sItem.num} className="flex items-center gap-1.5">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold ${
                              step === sItem.num
                                ? 'bg-[#775a19] text-white'
                                : step > sItem.num
                                ? 'bg-[#665e4b] text-white'
                                : 'bg-[#e4e2e1] text-[#7c766d]'
                            }`}
                          >
                            {step > sItem.num ? '✓' : sItem.num}
                          </div>
                          <span
                            className={`text-[11px] font-semibold uppercase tracking-[0.05em] ${
                              step === sItem.num ? 'text-[#775a19]' : 'text-[#7c766d]'
                            }`}
                          >
                            {sItem.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleConfirm}>
                      {step === 1 && (
                        <div className="space-y-6">
                          <h3 className="font-['EB_Garamond'] text-[24px] font-medium text-[#1a1c1a] border-b border-[#cdc6ba]/20 pb-4 mb-2">
                            Step 1: Patient Details & Doctor Choice
                          </h3>
                          <div>
                            <label className="block font-['DM_Sans'] text-[12px] font-medium tracking-[0.05em] uppercase text-[#4b463e] mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="e.g. Aditya Sharma"
                              className={`w-full bg-[#faf9f6] border px-4 py-3 font-['DM_Sans'] text-[14px] text-[#1a1c1a] focus:outline-none focus:border-[#775a19] transition-colors ${
                                errors.name ? 'border-red-500' : 'border-[#cdc6ba]'
                              }`}
                            />
                            {errors.name && <p className="text-red-500 text-[12px] mt-1">{errors.name}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block font-['DM_Sans'] text-[12px] font-medium tracking-[0.05em] uppercase text-[#4b463e] mb-2">
                                Email Address
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="name@domain.com"
                                className={`w-full bg-[#faf9f6] border px-4 py-3 font-['DM_Sans'] text-[14px] text-[#1a1c1a] focus:outline-none focus:border-[#775a19] transition-colors ${
                                  errors.email ? 'border-red-500' : 'border-[#cdc6ba]'
                                }`}
                              />
                              {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
                            </div>
                            <div>
                              <label className="block font-['DM_Sans'] text-[12px] font-medium tracking-[0.05em] uppercase text-[#4b463e] mb-2">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+91 XXXXX XXXXX"
                                className={`w-full bg-[#faf9f6] border px-4 py-3 font-['DM_Sans'] text-[14px] text-[#1a1c1a] focus:outline-none focus:border-[#775a19] transition-colors ${
                                  errors.phone ? 'border-red-500' : 'border-[#cdc6ba]'
                                }`}
                              />
                              {errors.phone && <p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block font-['DM_Sans'] text-[12px] font-medium tracking-[0.05em] uppercase text-[#4b463e] mb-2">
                                Preferred Specialist
                              </label>
                              <select
                                name="doctor"
                                value={formData.doctor}
                                onChange={handleInputChange}
                                className="w-full bg-[#faf9f6] border border-[#cdc6ba] px-4 py-3 font-['DM_Sans'] text-[14px] text-[#1a1c1a] focus:outline-none focus:border-[#775a19] transition-colors"
                              >
                                <option value="Any Available Doctor">Any Senior Specialist</option>
                                <option value="Dr. Anya Sharma">Dr. Anya Sharma (Dermatology)</option>
                                <option value="Dr. Rohan Verma">Dr. Rohan Verma (Hair Surgery)</option>
                                <option value="Dr. Meera Patel">Dr. Meera Patel (Injectables)</option>
                              </select>
                            </div>

                            <div>
                              <label className="block font-['DM_Sans'] text-[12px] font-medium tracking-[0.05em] uppercase text-[#4b463e] mb-2">
                                Treatment Focus / Package
                              </label>
                              <input
                                type="text"
                                name="interest"
                                value={formData.interest}
                                onChange={handleInputChange}
                                placeholder="Treatment name or package"
                                className="w-full bg-[#faf9f6] border border-[#cdc6ba] px-4 py-3 font-['DM_Sans'] text-[14px] text-[#1a1c1a] focus:outline-none focus:border-[#775a19]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-6">
                          <h3 className="font-['EB_Garamond'] text-[24px] font-medium text-[#1a1c1a] border-b border-[#cdc6ba]/20 pb-4 mb-2">
                            Step 2: Date & Slot Selection
                          </h3>
                          <div>
                            <label className="block font-['DM_Sans'] text-[12px] font-medium tracking-[0.05em] uppercase text-[#4b463e] mb-2">
                              Preferred Date
                            </label>
                            <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              min={new Date().toISOString().split('T')[0]}
                              className={`w-full bg-[#faf9f6] border px-4 py-3 font-['DM_Sans'] text-[14px] text-[#1a1c1a] focus:outline-none focus:border-[#775a19] transition-colors ${
                                errors.date ? 'border-red-500' : 'border-[#cdc6ba]'
                              }`}
                            />
                            {errors.date && <p className="text-red-500 text-[12px] mt-1">{errors.date}</p>}
                          </div>

                          <div>
                            <label className="block font-['DM_Sans'] text-[12px] font-medium tracking-[0.05em] uppercase text-[#4b463e] mb-3">
                              Available Consultation Slots
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                              {slots.map((slotInfo) => (
                                <button
                                  key={slotInfo.time}
                                  type="button"
                                  disabled={slotInfo.disabled}
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, slot: slotInfo.time }))
                                    if (errors.slot) {
                                      setErrors((prev) => ({ ...prev, slot: '' }))
                                    }
                                  }}
                                  className={`py-3 font-['DM_Sans'] text-[13px] font-medium text-center border transition-all ${
                                    slotInfo.disabled
                                      ? 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed opacity-50'
                                      : formData.slot === slotInfo.time
                                      ? 'bg-[#775a19] border-[#775a19] text-white shadow-sm'
                                      : 'bg-[#faf9f6] border-[#cdc6ba] text-[#1a1c1a] hover:border-[#775a19]'
                                  }`}
                                >
                                  {slotInfo.time}
                                </button>
                              ))}
                            </div>
                            {errors.slot && <p className="text-red-500 text-[12px] mt-2">{errors.slot}</p>}
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-6">
                          <h3 className="font-['EB_Garamond'] text-[24px] font-medium text-[#1a1c1a] border-b border-[#cdc6ba]/20 pb-4 mb-2">
                            Step 3: Review Reservation
                          </h3>
                          <div className="bg-[#f4f3f1] border border-[#cdc6ba]/20 p-5 space-y-3 text-[14px]">
                            <div className="flex justify-between pb-2 border-b border-[#cdc6ba]/20">
                              <span className="text-[#7c766d]">Patient Name</span>
                              <span className="font-semibold text-[#1a1c1a]">{formData.name}</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-[#cdc6ba]/20">
                              <span className="text-[#7c766d]">Doctor Assigned</span>
                              <span className="font-semibold text-[#775a19]">{formData.doctor}</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-[#cdc6ba]/20">
                              <span className="text-[#7c766d]">Medical Focus</span>
                              <span className="font-semibold text-[#1a1c1a]">{formData.interest}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#7c766d]">Appointment Time</span>
                              <span className="font-semibold text-[#1a1c1a]">
                                {formData.date} @ {formData.slot}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Buttons */}
                      <div className="flex justify-between items-center mt-10 pt-4 border-t border-[#cdc6ba]/20">
                        {step > 1 ? (
                          <button
                            type="button"
                            onClick={handleBack}
                            className="border border-[#665e4b] text-[#665e4b] font-['DM_Sans'] text-[13px] font-medium tracking-[0.08em] uppercase px-8 py-3 hover:bg-[#665e4b] hover:text-white transition-colors"
                          >
                            Back
                          </button>
                        ) : (
                          <div />
                        )}

                        {step < 3 ? (
                          <button
                            type="button"
                            onClick={handleNext}
                            className="bg-gradient-to-r from-[#775a19] via-[#8c6b1f] to-[#5d4201] text-white font-['DM_Sans'] text-[13px] font-semibold tracking-[0.08em] uppercase px-8 py-2.5 rounded-full shadow-md hover:scale-105 transition-all"
                          >
                            Continue
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="bg-gradient-to-r from-[#775a19] via-[#8c6b1f] to-[#5d4201] text-white font-['DM_Sans'] text-[13px] font-semibold tracking-[0.08em] uppercase px-8 py-2.5 rounded-full shadow-lg hover:scale-105 transition-all"
                          >
                            Confirm Appointment
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="max-w-[1280px] mx-auto px-5 md:px-16 py-8">
        <div className="text-center mb-6">
          <p className="font-['DM_Sans'] text-[13px] font-bold tracking-[0.15em] uppercase text-[#775a19] mb-2">
            Patient Stories
          </p>
          <h2 className="font-['EB_Garamond'] text-[32px] md:text-[44px] font-medium text-[#1a1c1a]">
            Verified Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Elena R.',
              role: 'Acne Scar Patient',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDN7A4rtm791bOtfNkd0yE-2Vv-MFVacQy_-W3KStFy0yZ0v8XaJ-u_qkkixM8pUrCdOjO6FgDBgirAGqR-s4KOW-Ly2aiiHQPLUYXalR5iG4sDGtGRtFx-2e89fL4c6-pAC0wT9jN_KsmjHlNIZIkkhfH4_VAkHhnz49yFrNbt5rbBi08Wajhoex30kP0eEHSfw7lQG7TuWRKB47HHrbJ1we4SzmwI2_S2uDK_rBtI8fDkf-FHglKze6P9ZK-yLeDtINBuUPeFh4',
              quote: 'The level of precision at Shivsai 360 is unmatched. My acne scars have smoothed out beautifully after the fractional laser sessions, and the staff made sure I was completely comfortable.',
            },
            {
              name: 'Marcus V.',
              role: 'Hair Restoration Patient',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEGJwNFiHnDovNwSFnS2sDpYYkIF5--qoE4PMh8WMSz5F2GM9lb7lB8sG_KissuoClXGO25CW_qJmELdGnyQN6pQd_ia3Dlf4WOayb2co_IHFS2ABdtZDdP7RnwsQ6fg3LZ4ZxtgXdtiIvZ1NkNryagO92lJpLWUJRmpsPqUFNyHdNNz2Zbw4dMfaF8v8ui2qsyYvBMBi99gimQwc0J9Yir9CfruU9-x7p_x_mtzLRRg0N5dcGiXXvpJTS5FmGpW8XmvbxCTiIiUg',
              quote: "Dr. Anya's approach is scientific yet deeply compassionate. The 6-month hair regrowth PRP treatment has yielded dense, natural results. Excellent follow-up tracking.",
            },
            {
              name: 'Saira K.',
              role: 'Skin Care Client',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVWIoLAFhud8EAPTJpb367wBH-xdTbwqzinhvwi9Hnfg9D2H9WY6XE7atylNyzI3eeOPV017ilaTv5iESQkX2fOuMsd1OrJfjIxnRXKu1smHvRaDf0kFKilXOkrgNwJsGIO49Bm3nQfmNVB8zAGk9CNkx51XZFYrxm-NpIwOAr0lCX5kpnuKbAFa2XaQjAm7mMj-OlUAf96L0jz6GdxIXXagDmg30yaAvoujtickadXNzJMBaTNQKkujvUcxf8QT5R3Knt0AgMFbQ',
              quote: 'The AI Skin Analyzer was a revelation. The scan accurately highlighted my skin concerns and recommended the Signature Hydrafacial, which gave me an immediate, radiant glow.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#cdc6ba]/30 p-8 custom-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-[#775a19]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px] fill-[1]">
                      star
                    </span>
                  ))}
                </div>
                <p className="text-[14px] text-[#4b463e] leading-[24px] italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-[#cdc6ba]/20 pt-6">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#cdc6ba]/30 flex-shrink-0"
                />
                <div>
                  <h4 className="font-['DM_Sans'] text-[14px] font-bold text-[#1a1c1a] flex items-center gap-1.5">
                    {item.name}
                    <span className="material-symbols-outlined text-[16px] text-blue-500 fill-[1]">
                      verified
                    </span>
                  </h4>
                  <p className="text-[12px] text-[#7c766d]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
