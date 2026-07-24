import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function QuickActionBar() {
  const [quickBookOpen, setQuickBookOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleCallRequest = (e) => {
    e.preventDefault()
    if (phone.trim()) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setQuickBookOpen(false)
        setPhone('')
      }, 3000)
    }
  }

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 items-end">
        {/* WhatsApp Direct Action */}
        <a
          href="https://wa.me/919876543210?text=Hello%20Shivsai%20360,%20I%20would%20like%20to%20inquire%20about%20a%20clinical%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          title="WhatsApp Concierge"
        >
          <span className="material-symbols-outlined text-[24px]">chat</span>
        </a>

        {/* Quick Consultation Trigger */}
        <button
          onClick={() => setQuickBookOpen(true)}
          className="bg-[#775a19] text-white font-['DM_Sans'] text-[13px] font-medium tracking-[0.08em] uppercase px-5 py-3 rounded-full shadow-xl hover:bg-[#5d4201] transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">event_available</span>
          Quick Callback
        </button>
      </div>

      {/* Quick Callback Modal */}
      {quickBookOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setQuickBookOpen(false)}
        >
          <div
            className="bg-[#faf9f6] border border-[#cdc6ba] p-6 md:p-8 max-w-[420px] w-full custom-shadow relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickBookOpen(false)}
              className="absolute top-4 right-4 text-[#7c766d] hover:text-[#1a1c1a]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <span className="material-symbols-outlined text-[48px] text-[#775a19] mb-2">check_circle</span>
                <h4 className="font-['EB_Garamond'] text-[24px] text-[#1a1c1a]">Callback Scheduled</h4>
                <p className="text-[13px] text-[#4b463e] mt-2">
                  Our clinical coordinator will call <span className="font-medium">{phone}</span> within 15 minutes.
                </p>
              </div>
            ) : (
              <div>
                <p className="font-['DM_Sans'] text-[12px] font-medium tracking-[0.1em] uppercase text-[#775a19] mb-1">
                  Instant Support
                </p>
                <h3 className="font-['EB_Garamond'] text-[26px] font-medium text-[#1a1c1a] mb-3">
                  Request Immediate Callback
                </h3>
                <p className="text-[13px] text-[#4b463e] leading-[20px] mb-6">
                  Leave your phone number below and our patient care team will connect with you immediately.
                </p>

                <form onSubmit={handleCallRequest} className="space-y-4">
                  <div>
                    <label className="block font-['DM_Sans'] text-[11px] uppercase tracking-[0.05em] text-[#7c766d] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white border border-[#cdc6ba] px-4 py-3 text-[14px] text-[#1a1c1a] focus:outline-none focus:border-[#775a19]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#665e4b] text-white font-['DM_Sans'] text-[13px] font-medium tracking-[0.08em] uppercase py-3 hover:bg-[#4d4634] transition-colors"
                  >
                    Call Me Back
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setQuickBookOpen(false)
                        navigate('/results#booking')
                      }}
                      className="text-[12px] text-[#775a19] font-medium uppercase tracking-[0.05em] hover:underline"
                    >
                      Or Book Full Appointment & Slot →
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
