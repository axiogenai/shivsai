import { Link } from 'react-router-dom'
import { ADMIN_URL } from '../config'

export default function Footer() {
  return (
    <footer className="bg-white/40 backdrop-blur-2xl border-t border-white/60 shadow-lg">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-['EB_Garamond'] text-[24px] font-medium text-[#665e4b] italic">
              Shivsai 360
            </Link>
            <p className="mt-4 text-[14px] text-[#4b463e] leading-[22px]">
              Redefining medical aesthetics through clinical precision and personalized care in Kolhapur, Maharashtra.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-[#e8dcc4] flex items-center justify-center hover:bg-[#d1c5ae] transition-colors">
                <span className="material-symbols-outlined text-[#665e4b] text-[18px]">share</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#e8dcc4] flex items-center justify-center hover:bg-[#d1c5ae] transition-colors">
                <span className="material-symbols-outlined text-[#665e4b] text-[18px]">favorite</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#e8dcc4] flex items-center justify-center hover:bg-[#d1c5ae] transition-colors">
                <span className="material-symbols-outlined text-[#665e4b] text-[18px]">mail</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['DM_Sans'] text-[13px] font-medium tracking-[0.08em] uppercase text-[#775a19] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 font-['DM_Sans'] text-[14px] text-[#4b463e]">
              <li>
                <a href="#" className="hover:text-[#775a19] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#775a19] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#775a19] transition-colors">
                  Medical Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#775a19] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-['DM_Sans'] text-[13px] font-medium tracking-[0.08em] uppercase text-[#775a19] mb-4">
              Treatments
            </h4>
            <ul className="space-y-3 font-['DM_Sans'] text-[14px] text-[#4b463e]">
              <li>
                <Link to="/services" className="hover:text-[#775a19] transition-colors">
                  Skin Resurfacing
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#775a19] transition-colors">
                  Hair Transplant
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#775a19] transition-colors">
                  Anti-Aging Protocols
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#775a19] transition-colors">
                  Bridal Luminescence
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-['DM_Sans'] text-[13px] font-medium tracking-[0.08em] uppercase text-[#775a19] mb-4">
              Connect
            </h4>
            <ul className="space-y-3 font-['DM_Sans'] text-[14px] text-[#4b463e]">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#775a19] text-[18px] mt-0.5">location_on</span>
                <span>Tarabai Park, Kolhapur, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#775a19] text-[18px]">schedule</span>
                <span>Mon - Sat: 10AM - 8PM</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#775a19] text-[18px]">call</span>
                <span>+91 (0) 123 456 7890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Credits */}
        <div className="border-t border-[#cdc6ba]/30 mt-8 pt-6">
          <div className="max-w-[1280px] mx-auto px-5 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 md:pr-48">
            <p className="text-[12px] text-[#7c766d]">
              © 2026 Shivsai 360 Medical Aesthetics, Kolhapur. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[12px] text-[#7c766d]">
              <a
                href={ADMIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#775a19] hover:underline flex items-center gap-1 font-medium"
              >
                <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                Staff CMS Login
              </a>
              <span>•</span>
              <p>
                Made with clinical precision by{' '}
                <a
                  href="https://team.axiogen.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#775a19] hover:underline"
                >
                  team.axiogen.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
