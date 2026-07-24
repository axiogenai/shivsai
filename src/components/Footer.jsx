import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#f4f3f1] border-t border-[#cdc6ba]/30">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-16">
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
            <h4 className="font-['DM_Sans'] text-[14px] font-semibold tracking-[0.08em] uppercase text-[#665e4b] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Medical Disclaimer', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[14px] text-[#4b463e] hover:text-[#775a19] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-['DM_Sans'] text-[14px] font-semibold tracking-[0.08em] uppercase text-[#665e4b] mb-6">
              Treatments
            </h4>
            <ul className="space-y-3">
              {['Skin Resurfacing', 'Hair Transplant', 'Anti-Aging', 'Bridal Makeup'].map((item) => (
                <li key={item}>
                  <Link
                    to="/services"
                    className="text-[14px] text-[#4b463e] hover:text-[#775a19] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-['DM_Sans'] text-[14px] font-semibold tracking-[0.08em] uppercase text-[#665e4b] mb-6">
              Connect
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#775a19] text-[20px] mt-0.5">location_on</span>
                <span className="text-[14px] text-[#4b463e] leading-[22px]">Tarabai Park, Kolhapur, Maharashtra, India</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#775a19] text-[20px] mt-0.5">schedule</span>
                <span className="text-[14px] text-[#4b463e] leading-[22px]">Mon – Sat: 10AM – 8PM</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#775a19] text-[20px] mt-0.5">call</span>
                <span className="text-[14px] text-[#4b463e] leading-[22px]">+91 (0) 231 265 4321</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright & Credits */}
      <div className="border-t border-[#cdc6ba]/30">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#7c766d]">
            © 2026 Shivsai 360 Medical Aesthetics, Kolhapur. All rights reserved.
          </p>
          <p className="text-[12px] text-[#7c766d]">
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
    </footer>
  )
}
