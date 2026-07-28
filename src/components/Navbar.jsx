import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `font-['DM_Sans'] text-[14px] font-medium leading-[20px] tracking-[0.08em] uppercase transition-all ease-in-out duration-300 ${
      isActive
        ? 'text-[#775a19] border-b border-[#775a19] pb-1'
        : 'text-[#4b463e] hover:text-[#775a19]'
    }`

  const handleNavClick = (path) => (e) => {
    e.preventDefault()
    navigate(path)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setMobileOpen(false)
  }

  const handleHashLink = (path, hash) => (e) => {
    e.preventDefault()
    setMobileOpen(false)
    navigate(`${path}#${hash}`)
    setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 70
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 120)
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/45 backdrop-blur-2xl border-b border-white/60 shadow-sm">
        <div className="flex justify-between items-center h-14 md:h-16 px-5 md:px-16 max-w-[1280px] mx-auto">
          <Link
            to="/"
            onClick={handleNavClick('/')}
            className="font-['EB_Garamond'] text-[22px] md:text-[24px] font-medium text-[#665e4b] italic cursor-pointer active:scale-95 transition-transform"
          >
            Shivsai 360
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end onClick={handleNavClick('/')} className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/services" onClick={handleNavClick('/services')} className={linkClass}>
              Services
            </NavLink>
            <NavLink to="/results" onClick={handleNavClick('/results')} className={linkClass}>
              Gallery
            </NavLink>
            <a
              href="/services#ai-analyzer"
              onClick={handleHashLink('/services', 'ai-analyzer')}
              className="font-['DM_Sans'] text-[13px] font-medium leading-[20px] tracking-[0.08em] uppercase text-[#4b463e] hover:text-[#775a19] transition-all duration-300"
            >
              AI Skin Analyzer
            </a>
            <a
              href="/results#reviews"
              onClick={handleHashLink('/results', 'reviews')}
              className="font-['DM_Sans'] text-[13px] font-medium leading-[20px] tracking-[0.08em] uppercase text-[#4b463e] hover:text-[#775a19] transition-all duration-300"
            >
              Reviews
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/results#booking"
              onClick={handleHashLink('/results', 'booking')}
              className="hidden sm:block bg-gradient-to-r from-[#775a19] via-[#8c6b1f] to-[#5d4201] text-white font-['DM_Sans'] text-[12px] font-semibold tracking-[0.08em] uppercase px-6 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-300"
            >
              Book Now
            </Link>
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              <span className="material-symbols-outlined text-[#665e4b] text-[28px]">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/30 transition-opacity"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-72 bg-[#faf9f6] shadow-xl p-8 flex flex-col gap-6 pt-20 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-6 right-6" onClick={() => setMobileOpen(false)}>
              <span className="material-symbols-outlined text-[#665e4b]">close</span>
            </button>
            <NavLink to="/" end className={linkClass} onClick={handleNavClick('/')}>
              Home
            </NavLink>
            <NavLink to="/services" className={linkClass} onClick={handleNavClick('/services')}>
              Services
            </NavLink>
            <NavLink to="/results" className={linkClass} onClick={handleNavClick('/results')}>
              Gallery
            </NavLink>
            <a
              href="/services#ai-analyzer"
              onClick={handleHashLink('/services', 'ai-analyzer')}
              className="font-['DM_Sans'] text-[14px] font-medium leading-[20px] tracking-[0.08em] uppercase text-[#4b463e] hover:text-[#775a19] transition-all duration-300"
            >
              AI Skin Analyzer
            </a>
            <Link
              to="/results#booking"
              onClick={handleHashLink('/results', 'booking')}
              className="bg-gradient-to-r from-[#775a19] via-[#8c6b1f] to-[#5d4201] text-white text-center font-['DM_Sans'] text-[13px] font-semibold tracking-[0.08em] uppercase px-8 py-3 mt-4 rounded-full shadow-md"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
