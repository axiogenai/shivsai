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

  const handleHashLink = (path, hash) => (e) => {
    e.preventDefault()
    navigate(path)
    setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#faf9f6]/90 backdrop-blur-md shadow-sm border-b border-[#cdc6ba]/30">
        <div className="flex justify-between items-center h-20 px-5 md:px-16 max-w-[1280px] mx-auto">
          <Link
            to="/"
            className="font-['EB_Garamond'] text-[24px] font-medium leading-[32px] text-[#665e4b] italic cursor-pointer active:scale-95 transition-transform"
          >
            Shivsai 360
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/services" className={linkClass}>
              Services
            </NavLink>
            <NavLink to="/results" className={linkClass}>
              Gallery
            </NavLink>
            <a
              href="/services#ai-analyzer"
              onClick={handleHashLink('/services', 'ai-analyzer')}
              className="font-['DM_Sans'] text-[14px] font-medium leading-[20px] tracking-[0.08em] uppercase text-[#4b463e] hover:text-[#775a19] transition-all duration-300"
            >
              AI Skin Analyzer
            </a>
            <a
              href="/results#reviews"
              onClick={handleHashLink('/results', 'reviews')}
              className="font-['DM_Sans'] text-[14px] font-medium leading-[20px] tracking-[0.08em] uppercase text-[#4b463e] hover:text-[#775a19] transition-all duration-300"
            >
              Reviews
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/results"
              onClick={(e) => {
                e.preventDefault()
                navigate('/results')
                setTimeout(() => {
                  const el = document.getElementById('booking')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
              className="hidden sm:block bg-[#665e4b] text-white font-['DM_Sans'] text-[14px] font-medium tracking-[0.08em] uppercase px-8 py-3 hover:bg-[#4d4634] transition-colors duration-300"
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
            <NavLink to="/" end className={linkClass} onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/services" className={linkClass} onClick={() => setMobileOpen(false)}>
              Services
            </NavLink>
            <NavLink to="/results" className={linkClass} onClick={() => setMobileOpen(false)}>
              Gallery
            </NavLink>
            <a
              href="/services#ai-analyzer"
              onClick={(e) => {
                setMobileOpen(false)
                handleHashLink('/services', 'ai-analyzer')(e)
              }}
              className="font-['DM_Sans'] text-[14px] font-medium leading-[20px] tracking-[0.08em] uppercase text-[#4b463e] hover:text-[#775a19] transition-all duration-300"
            >
              AI Skin Analyzer
            </a>
            <Link
              to="/results"
              onClick={(e) => {
                e.preventDefault()
                setMobileOpen(false)
                navigate('/results')
                setTimeout(() => {
                  const el = document.getElementById('booking')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
              className="bg-[#665e4b] text-white text-center font-['DM_Sans'] text-[14px] font-medium tracking-[0.08em] uppercase px-8 py-3 mt-4 hover:bg-[#4d4634] transition-colors duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
