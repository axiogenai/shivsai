import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuickActionBar from './components/QuickActionBar'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ResultsBookingPage from './pages/ResultsBookingPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#f8f6f0] via-[#f2eee3] to-[#e8e2d2] text-[#1a1c1a]">
      <ScrollToTop />
      {/* Ambient Glass Blur Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#e8d2a7]/50 to-[#c9a84c]/30 blur-[130px] animate-pulse" />
        <div className="absolute top-[30%] -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-[#775a19]/20 via-[#e2cf9e]/40 to-transparent blur-[150px]" />
        <div className="absolute bottom-[10%] left-[15%] w-[550px] h-[550px] rounded-full bg-gradient-to-r from-[#d1c5ae]/45 to-[#f0dfbd]/40 blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="pt-14 md:pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/results" element={<ResultsBookingPage />} />
          </Routes>
        </main>
        <Footer />
        <QuickActionBar />
      </div>
    </div>
  )
}
