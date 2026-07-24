import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuickActionBar from './components/QuickActionBar'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ResultsBookingPage from './pages/ResultsBookingPage'

export default function App() {
  return (
    <div className="bg-[#faf9f6] min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/results" element={<ResultsBookingPage />} />
        </Routes>
      </main>
      <Footer />
      <QuickActionBar />
    </div>
  )
}
