import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config'

function CounterNumber({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    let animFrameId = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime = null
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const easeProgress = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeProgress * target))

            if (progress < 1) {
              animFrameId = window.requestAnimationFrame(step)
            } else {
              setCount(target)
            }
          }
          animFrameId = window.requestAnimationFrame(step)
        } else {
          if (animFrameId) window.cancelAnimationFrame(animFrameId)
          setCount(0)
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      if (animFrameId) window.cancelAnimationFrame(animFrameId)
      observer.disconnect()
    }
  }, [target, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const FAQS = [
  {
    q: "How does the AI Skin Analyzer evaluate my skin condition?",
    a: "Our proprietary AI engine scans facial landmark nodes to evaluate hydration, pore distribution, UV damage, and structural collagen density against 10,000+ clinical dermatological scans."
  },
  {
    q: "Are consultations conducted by certified medical doctors?",
    a: "Yes, every procedure and consultation at Shivsai 360 is directly supervised or performed by our board-certified cosmetic dermatologists and M.Ch plastic surgeons."
  },
  {
    q: "How many sessions of Laser Hair Removal or Acne Resurfacing will I need?",
    a: "Protocol duration depends on baseline medical diagnostics. Typically, hair reduction requires 6–8 sessions, while scar revision requires 3–5 sessions scheduled 4 weeks apart."
  },
  {
    q: "What safety protocols are in place at the clinic?",
    a: "We adhere strictly to US FDA-cleared laser technology, hospital-grade sterilization protocols, disposable micro-needles, and single-patient dermal ampoules."
  }
]

export default function HomePage() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)
  const [protocolCount, setProtocolCount] = useState(29)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/treatments`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          const total = (data.skin?.length || 0) + (data.hair?.length || 0) + (data.makeup?.length || 0)
          if (total > 0) setProtocolCount(total)
        }
      })
      .catch(err => console.log('HomePage protocols count fallback:', err))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/clinic_hero_luxury_1784892414492.jpg"
            alt="Luxury clinic interior"
            className="w-full h-full object-cover"
          />
          <div className="hero-gradient absolute inset-0" />
        </div>

        <div className="relative z-10 text-center px-5 max-w-[900px] mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/90 shadow-sm mb-6">
            <span className="text-[12px] text-[#775a19]">✦</span>
            <span className="font-['DM_Sans'] text-[13px] md:text-[14px] font-bold tracking-[0.18em] uppercase text-[#5d4201]">
              Medical Aesthetics Sanctuary
            </span>
          </div>
          <h1 className="font-['EB_Garamond'] text-[56px] md:text-[92px] font-semibold leading-[1.04] text-[#111111] drop-shadow-sm mb-6">
            Restore. Renew.<br />Radiate.
          </h1>
          <p className="text-[18px] md:text-[22px] font-medium text-[#222222] leading-[32px] max-w-[720px] mx-auto mb-10">
            Kolhapur's Premier Medical Aesthetic Clinic. 29 science-backed skin, hair, and cosmetic protocols for lasting elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-gradient-to-r from-[#775a19] via-[#8c6b1f] to-[#5d4201] text-white font-['DM_Sans'] text-[14px] font-semibold tracking-[0.1em] uppercase px-10 py-4 rounded-full shadow-[0_10px_25px_-5px_rgba(119,90,25,0.4)] border border-[#ffdea5]/30 hover:scale-105 hover:shadow-[0_15px_35px_-5px_rgba(119,90,25,0.5)] transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Explore {protocolCount} Treatments</span>
              <span className="text-[16px] group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <button
              onClick={() => navigate('/results#booking')}
              className="bg-white/60 backdrop-blur-md text-[#1a1c1a] border border-white/90 font-['DM_Sans'] text-[14px] font-semibold tracking-[0.1em] uppercase px-10 py-4 rounded-full shadow-md hover:bg-white/90 hover:border-[#775a19]/50 hover:text-[#775a19] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Meet Our Doctors</span>
              <span className="material-symbols-outlined text-[18px]">stethoscope</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="material-symbols-outlined text-[#665e4b] text-[32px]">expand_more</span>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-4 my-4">
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg shadow-black/5 rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-['EB_Garamond'] text-[36px] md:text-[42px] font-medium text-[#775a19]">
                <CounterNumber target={10000} suffix="+" />
              </p>
              <p className="font-['DM_Sans'] text-[13px] tracking-[0.08em] uppercase text-[#4b463e] mt-1">Trusted Patients</p>
            </div>
            <div className="md:border-x md:border-[#cdc6ba]/30">
              <p className="font-['EB_Garamond'] text-[36px] md:text-[42px] font-medium text-[#775a19]">
                <CounterNumber target={protocolCount} />
              </p>
              <p className="font-['DM_Sans'] text-[13px] tracking-[0.08em] uppercase text-[#4b463e] mt-1">Clinical Protocols</p>
            </div>
            <div className="md:border-r md:border-[#cdc6ba]/30">
              <p className="font-['EB_Garamond'] text-[36px] md:text-[42px] font-medium text-[#775a19]">
                <CounterNumber target={15} suffix="+" />
              </p>
              <p className="font-['DM_Sans'] text-[13px] tracking-[0.08em] uppercase text-[#4b463e] mt-1">Years Excellence</p>
            </div>
            <div>
              <p className="font-['EB_Garamond'] text-[36px] md:text-[42px] font-medium text-[#775a19]">
                <CounterNumber target={12} suffix="+" />
              </p>
              <p className="font-['DM_Sans'] text-[13px] tracking-[0.08em] uppercase text-[#4b463e] mt-1">Certified Specialists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Specialties */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-10 md:py-14">
        <div className="text-center mb-8">
          <p className="font-['DM_Sans'] text-[14px] font-medium tracking-[0.15em] uppercase text-[#775a19] mb-3">
            Our Specialties
          </p>
          <h2 className="font-['EB_Garamond'] text-[36px] md:text-[48px] font-medium text-[#1a1c1a]">
            Curated Aesthetic Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              icon: 'auto_awesome',
              title: 'Advanced Skin Care',
              desc: '15 chemical peels, lasers, and hydrafacials customized for your unique skin profile.',
            },
            {
              num: '02',
              icon: 'spa',
              title: 'Hair Restoration',
              desc: '8 specialized therapies including DHI transplants, PRP growth, and scalp micropigmentation.',
            },
            {
              num: '03',
              icon: 'brush',
              title: 'Aesthetic Makeup',
              desc: '6 semi-permanent enhancements, lip blushing, microblading, and medical micropigmentation.',
            },
          ].map((item) => (
            <div
              key={item.num}
              className="bento-card bg-white/70 backdrop-blur-md border border-white/80 shadow-lg shadow-black/5 p-8 md:p-10 rounded-3xl group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 rounded-full bg-[#775a19]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#775a19] text-[24px]">{item.icon}</span>
                  </div>
                  <span className="font-['EB_Garamond'] text-[48px] font-medium text-[#cdc6ba]/50 leading-none">
                    {item.num}
                  </span>
                </div>
                <h3 className="font-['EB_Garamond'] text-[24px] font-medium text-[#1a1c1a] mb-4">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#4b463e] leading-[22px] mb-6">
                  {item.desc}
                </p>
              </div>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-[#775a19] hover:gap-3 transition-all duration-300"
              >
                Explore Category <span className="text-[12px]">✦</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* AI Analyzer CTA Banner */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-12">
        <div className="glass-panel bg-white/40 backdrop-blur-2xl border border-white/80 shadow-2xl rounded-3xl overflow-hidden p-8 md:p-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-['DM_Sans'] text-[14px] font-medium tracking-[0.15em] uppercase text-[#775a19] mb-4">
                AI Clinical Engine
              </p>
              <h2 className="font-['EB_Garamond'] text-[36px] md:text-[48px] font-medium text-[#1a1c1a] leading-[1.1] mb-6">
                Precision Skin Analysis<br />by AI
              </h2>
              <p className="text-[16px] text-[#4b463e] leading-[26px] mb-8 max-w-[480px]">
                Upload your facial photo to analyze hydration, UV exposure, elasticity, and pore health in under 60 seconds. Receive an instant doctor-matched treatment roadmap.
              </p>
              <button
                onClick={() => {
                  navigate('/services#ai-analyzer')
                  setTimeout(() => {
                    const el = document.getElementById('ai-analyzer')
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 70
                      window.scrollTo({ top: y, behavior: 'smooth' })
                    }
                  }, 120)
                }}
                className="bg-gradient-to-r from-[#775a19] via-[#8c6b1f] to-[#5d4201] text-white font-['DM_Sans'] text-[14px] font-semibold tracking-[0.08em] uppercase px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                <span>Try AI Skin Diagnostics</span>
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/80">
                <img
                  src="/images/ai_facial_tech_1784892457264.jpg"
                  alt="AI skin analysis scanner"
                  className="w-full max-w-[500px] rounded-3xl object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-6 rounded-full bg-[#775a19]/30 animate-ping" />
                    <div className="w-16 h-16 rounded-full bg-[#775a19]/50 flex items-center justify-center backdrop-blur-md">
                      <span className="material-symbols-outlined text-white text-[32px]">fingerprint</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical FAQ Accordion Section */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-6 md:py-8">
        <div className="text-center mb-4">
          <p className="font-['DM_Sans'] text-[14px] font-medium tracking-[0.15em] uppercase text-[#775a19] mb-3">
            Patient Enquiries
          </p>
          <h2 className="font-['EB_Garamond'] text-[36px] md:text-[48px] font-medium text-[#1a1c1a]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-[800px] mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/80 shadow-md shadow-black/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-['EB_Garamond'] text-[20px] font-medium text-[#1a1c1a]">
                    {faq.q}
                  </span>
                  <span className="material-symbols-outlined text-[#775a19] text-[24px]">
                    {isOpen ? 'remove' : 'add'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-[14px] text-[#4b463e] leading-[24px] border-t border-[#cdc6ba]/20 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
