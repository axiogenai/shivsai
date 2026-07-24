import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const services = {
  skin: [
    { id: "s1", name: "Deep Peeling", desc: "Medical-grade chemical exfoliation for skin renewal", duration: "60 min", price: 2500, priceFormatted: "₹2,500", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600" },
    { id: "s2", name: "Anti-Aging Solutions", desc: "Targeted treatments to reduce fine lines & restore youth", duration: "75 min", price: 3800, priceFormatted: "₹3,800", img: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600" },
    { id: "s3", name: "Pigmentation Solutions", desc: "Advanced lightening therapy for uneven skin tone", duration: "60 min", price: 2800, priceFormatted: "₹2,800", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600" },
    { id: "s4", name: "Dermal Fillers", desc: "Restore lost volume and sculpt facial contours", duration: "45 min", price: 8000, priceFormatted: "₹8,000", img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600" },
    { id: "s5", name: "Skin Tightening", desc: "RF & ultrasound-based lifting for sagging skin", duration: "90 min", price: 5500, priceFormatted: "₹5,500", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600" },
    { id: "s6", name: "Microdermabrasion", desc: "Crystal exfoliation for brighter, smoother texture", duration: "45 min", price: 1800, priceFormatted: "₹1,800", img: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600" },
    { id: "s7", name: "Mesotherapy", desc: "Microinjections delivering vitamins deep into skin", duration: "60 min", price: 4200, priceFormatted: "₹4,200", img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600" },
    { id: "s8", name: "Laser Hair Removal", desc: "Permanent hair reduction with advanced diode laser", duration: "60 min", price: 1500, priceFormatted: "₹1,500+", img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600" },
    { id: "s9", name: "Photofacials", desc: "IPL therapy for sun damage, redness & rejuvenation", duration: "45 min", price: 3200, priceFormatted: "₹3,200", img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=600" },
    { id: "s10", name: "Hydrafacial", desc: "Deep cleanse + hydration in one luxurious session", duration: "60 min", price: 2200, priceFormatted: "₹2,200", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600" },
    { id: "s11", name: "Melasma Treatment", desc: "Targeted protocol for stubborn melasma patches", duration: "75 min", price: 3500, priceFormatted: "₹3,500", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600" },
    { id: "s12", name: "Scar Treatment", desc: "Laser resurfacing & microneedling for scar reduction", duration: "60 min", price: 4000, priceFormatted: "₹4,000", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600" },
    { id: "s13", name: "Acne Treatment", desc: "Comprehensive acne management & prevention plan", duration: "45 min", price: 1800, priceFormatted: "₹1,800", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600" },
    { id: "s14", name: "Glow Facials", desc: "Brightening facial for an instant radiant complexion", duration: "60 min", price: 1500, priceFormatted: "₹1,500", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600" },
    { id: "s15", name: "Wrinkle Treatment", desc: "Botox & filler combination for wrinkle-free skin", duration: "30 min", price: 6000, priceFormatted: "₹6,000", img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600" }
  ],
  hair: [
    { id: "h1", name: "Direct Hair Implantation", desc: "DHI technique for natural-looking hairline design", duration: "360 min", price: 35000, priceFormatted: "₹35,000+", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600" },
    { id: "h2", name: "FUE Hair Transplants", desc: "Follicular unit extraction for permanent hair growth", duration: "420 min", price: 40000, priceFormatted: "₹40,000+", img: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&q=80&w=600" },
    { id: "h3", name: "PRP Therapy", desc: "Platelet-rich plasma injections to stimulate growth", duration: "45 min", price: 5000, priceFormatted: "₹5,000", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600" },
    { id: "h4", name: "Hair-Loss Treatment", desc: "Customized protocol addressing root causes of loss", duration: "60 min", price: 3500, priceFormatted: "₹3,500", img: "https://images.unsplash.com/photo-1605497746444-ac9dbd538f7a?auto=format&fit=crop&q=80&w=600" },
    { id: "h5", name: "Laser Therapy (Hair)", desc: "Low-level laser to energize follicles & reduce loss", duration: "30 min", price: 2500, priceFormatted: "₹2,500", img: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&q=80&w=600" },
    { id: "h6", name: "Micropigmentation", desc: "Scalp tattooing for density illusion & receding lines", duration: "210 min", price: 15000, priceFormatted: "₹15,000", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=600" },
    { id: "h7", name: "BB Glow Treatment", desc: "Semi-permanent foundation treatment for scalp health", duration: "60 min", price: 3800, priceFormatted: "₹3,800", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600" },
    { id: "h8", name: "Hair Mesotherapy", desc: "Nutrient cocktail injected to nourish hair roots", duration: "45 min", price: 4000, priceFormatted: "₹4,000", img: "https://images.unsplash.com/photo-1626015713026-d837d172406f?auto=format&fit=crop&q=80&w=600" }
  ],
  makeup: [
    { id: "m1", name: "Dermaplaning", desc: "Razor exfoliation for ultra-smooth skin canvas", duration: "45 min", price: 1800, priceFormatted: "₹1,800", img: "https://images.unsplash.com/photo-1595475207225-428b6883884a?auto=format&fit=crop&q=80&w=600" },
    { id: "m2", name: "Permanent Lip Makeup", desc: "Semi-permanent lip blush for defined, rosy lips", duration: "150 min", price: 12000, priceFormatted: "₹12,000", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600" },
    { id: "m3", name: "Botox Treatments", desc: "Wrinkle-relaxing injections by certified doctors", duration: "30 min", price: 8000, priceFormatted: "₹8,000", img: "https://images.unsplash.com/photo-1629732047847-50b7ecf0cbf1?auto=format&fit=crop&q=80&w=600" },
    { id: "m4", name: "Microblading", desc: "Hair-stroke brow technique for perfectly shaped brows", duration: "120 min", price: 10000, priceFormatted: "₹10,000", img: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a3ef?auto=format&fit=crop&q=80&w=600" },
    { id: "m5", name: "Medical Micropigmentation", desc: "Corrective pigmentation for scars & areola", duration: "180 min", price: 18000, priceFormatted: "₹18,000", img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600" },
    { id: "m6", name: "Lip Blushing", desc: "Natural lip color enhancement lasting 1–2 years", duration: "120 min", price: 9000, priceFormatted: "₹9,000", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600" }
  ]
}

// Demo Sample Patient Photos for AI analysis
const SAMPLE_PHOTOS = [
  {
    id: 'p1',
    label: 'Preset 1: Hydration & Texture',
    img: '/images/ai_skin_scan_patient_1784892437165.jpg',
    metrics: { hydration: 88, acne: 14, texture: 82, uvDamage: 18, collagen: 79 },
    rec: 'Signature Hydrafacial & Glow Infusion',
    recPrice: '₹2,200'
  },
  {
    id: 'p2',
    label: 'Preset 2: Pigmentation & Sun Exposure',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    metrics: { hydration: 64, acne: 22, texture: 68, uvDamage: 45, collagen: 71 },
    rec: 'IPL Photofacial & Melasma Protocol',
    recPrice: '₹3,200'
  },
  {
    id: 'p3',
    label: 'Preset 3: Fine Lines & Firmness',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    metrics: { hydration: 72, acne: 10, texture: 74, uvDamage: 30, collagen: 58 },
    rec: 'RF Skin Tightening & Mesotherapy',
    recPrice: '₹5,500'
  }
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('skin')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPackage, setSelectedPackage] = useState([])
  
  // AI Diagnostics State
  const [uploadedImage, setUploadedImage] = useState(SAMPLE_PHOTOS[0].img)
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [activeDiagnosticMetrics, setActiveDiagnosticMetrics] = useState(SAMPLE_PHOTOS[0].metrics)
  const [activeRecommendation, setActiveRecommendation] = useState(SAMPLE_PHOTOS[0].rec)
  
  const fileInputRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.hash === '#ai-analyzer') {
      setTimeout(() => {
        const el = document.getElementById('ai-analyzer')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 200)
    } else if (location.hash === '#estimator') {
      setTimeout(() => {
        const el = document.getElementById('estimator')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 200)
    }
  }, [location])

  // Custom photo upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)
      setShowResults(false)
      setActiveDiagnosticMetrics({
        hydration: Math.floor(65 + Math.random() * 25),
        acne: Math.floor(10 + Math.random() * 25),
        texture: Math.floor(70 + Math.random() * 20),
        uvDamage: Math.floor(15 + Math.random() * 30),
        collagen: Math.floor(60 + Math.random() * 30)
      })
      setActiveRecommendation('Bespoke Clinical Resurfacing & Hydrafacial')
    }
  }

  const handleSelectPreset = (preset) => {
    setUploadedImage(preset.img)
    setActiveDiagnosticMetrics(preset.metrics)
    setActiveRecommendation(preset.rec)
    setShowResults(false)
  }

  const runDiagnostics = () => {
    setAnalyzing(true)
    setProgress(0)
    setShowResults(false)

    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18 + 7
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          setAnalyzing(false)
          setShowResults(true)
        }, 400)
      }
      setProgress(Math.min(p, 100))
    }, 200)
  }

  const togglePackageItem = (serviceItem) => {
    if (selectedPackage.some((item) => item.name === serviceItem.name)) {
      setSelectedPackage(selectedPackage.filter((item) => item.name !== serviceItem.name))
    } else {
      setSelectedPackage([...selectedPackage, serviceItem])
    }
  }

  // Package calculation
  const totalBasePrice = selectedPackage.reduce((acc, curr) => acc + curr.price, 0)
  const discountPercent = selectedPackage.length >= 3 ? 15 : selectedPackage.length >= 2 ? 10 : 0
  const savingsAmount = Math.round((totalBasePrice * discountPercent) / 100)
  const finalPrice = totalBasePrice - savingsAmount

  const bookCustomPackage = () => {
    const packageSummary = selectedPackage.map(s => s.name).join(', ')
    navigate(`/results#booking?treatment=${encodeURIComponent(packageSummary || 'Custom Package')}`)
  }

  const filteredServices = services[activeTab].filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const tabs = [
    { key: 'skin', label: 'Skin Protocols', icon: 'dermatology', count: services.skin.length },
    { key: 'hair', label: 'Hair Treatments', icon: 'spa', count: services.hair.length },
    { key: 'makeup', label: 'Aesthetic Makeup', icon: 'brush', count: services.makeup.length },
  ]

  return (
    <div>
      {/* Hero Header */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 py-16 md:py-20 text-center">
        <p className="font-['DM_Sans'] text-[14px] font-medium tracking-[0.15em] uppercase text-[#775a19] mb-4">
          Medical Aesthetic Portfolio
        </p>
        <h1 className="font-['EB_Garamond'] text-[40px] md:text-[64px] font-medium text-[#1a1c1a] leading-[1.1] mb-6">
          Aesthetics Elevated.<br />Science Perfected.
        </h1>
        <p className="text-[16px] md:text-[18px] text-[#4b463e] leading-[28px] max-w-[640px] mx-auto mb-10">
          Discover 29 clinical-grade skin, hair, and cosmetic procedures designed by board-certified dermatologists.
        </p>

        {/* Search Input */}
        <div className="max-w-[560px] mx-auto relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-[#7c766d] text-[22px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search treatments (e.g., Hydrafacial, PRP, Botox)..."
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-[#cdc6ba] font-['DM_Sans'] text-[14px] text-[#1a1c1a] focus:outline-none focus:border-[#775a19] transition-colors shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-[#7c766d] hover:text-[#1a1c1a]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-16 pb-20">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key)
                setSearchQuery('')
              }}
              className={`flex items-center gap-2.5 px-6 py-3 font-['DM_Sans'] text-[14px] font-medium tracking-[0.05em] uppercase transition-all duration-300 border ${
                activeTab === tab.key
                  ? 'bg-[#665e4b] text-white border-[#665e4b] shadow-sm'
                  : 'bg-white text-[#4b463e] border-[#cdc6ba]/50 hover:border-[#665e4b]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
              {tab.label}
              <span className="ml-1 bg-black/10 px-2 py-0.5 text-[11px] rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Service Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#cdc6ba]/30">
            <span className="material-symbols-outlined text-[48px] text-[#cdc6ba] mb-3">search_off</span>
            <p className="font-['EB_Garamond'] text-[24px] text-[#1a1c1a] mb-2">No matching procedures found</p>
            <p className="text-[14px] text-[#7c766d] mb-4">Try searching with a different treatment term.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#775a19] font-['DM_Sans'] text-[13px] font-semibold uppercase tracking-[0.08em] hover:underline"
            >
              Clear Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const isSelected = selectedPackage.some((item) => item.name === service.name)

              return (
                <div
                  key={service.name}
                  className={`bento-card bg-white border overflow-hidden group transition-all duration-300 flex flex-col justify-between ${
                    isSelected ? 'border-[#775a19] ring-2 ring-[#775a19]/20' : 'border-[#cdc6ba]/30'
                  }`}
                >
                  <div>
                    <div className="relative h-[220px] overflow-hidden">
                      <img
                        src={service.img}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                        <span className="font-['DM_Sans'] text-[14px] font-semibold text-[#775a19]">
                          {service.priceFormatted}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-4 left-4 bg-[#775a19] text-white px-3 py-1 text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.08em] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check</span> Added to Package
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-['EB_Garamond'] text-[22px] font-medium text-[#1a1c1a] mb-2">
                        {service.name}
                      </h3>
                      <p className="text-[14px] text-[#4b463e] leading-[22px] mb-4">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 flex items-center justify-between border-t border-[#cdc6ba]/20 mt-2 pt-4">
                    <div className="flex items-center gap-1.5 text-[13px] text-[#7c766d]">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      {service.duration}
                    </div>

                    <button
                      onClick={() => togglePackageItem(service)}
                      className={`text-[12px] font-['DM_Sans'] font-medium uppercase tracking-[0.05em] px-4 py-2 transition-all ${
                        isSelected
                          ? 'bg-[#775a19] text-white'
                          : 'bg-[#f4f3f1] text-[#665e4b] hover:bg-[#665e4b] hover:text-white'
                      }`}
                    >
                      {isSelected ? 'Remove' : '+ Add to Package'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Treatment Package Estimator Section */}
      <section id="estimator" className="bg-[#665e4b] text-white py-16 md:py-20 relative">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <p className="font-['DM_Sans'] text-[14px] font-medium tracking-[0.15em] uppercase text-[#e9c176] mb-3">
                Bespoke Planning Tool
              </p>
              <h2 className="font-['EB_Garamond'] text-[36px] md:text-[48px] font-medium leading-[1.1] mb-4">
                Treatment Package Estimator
              </h2>
              <p className="text-[15px] text-[#d1c5ae] leading-[24px] mb-6">
                Select your preferred procedures from our list above to customize a combined treatment roadmap. Bundle 2+ procedures for multi-treatment savings!
              </p>
              <div className="flex flex-wrap gap-4 text-[13px] text-[#e8dcc4]">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <span className="material-symbols-outlined text-[16px] text-[#e9c176]">percent</span>
                  10% off for 2 procedures
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <span className="material-symbols-outlined text-[16px] text-[#e9c176]">workspace_premium</span>
                  15% off for 3+ procedures
                </div>
              </div>
            </div>

            {/* Estimator Calculator Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#faf9f6] text-[#1a1c1a] border border-[#cdc6ba]/30 p-6 md:p-8 custom-shadow">
                <div className="flex justify-between items-center pb-4 border-b border-[#cdc6ba]/30 mb-4">
                  <h3 className="font-['EB_Garamond'] text-[22px] font-medium">Your Custom Package</h3>
                  <span className="font-['DM_Sans'] text-[13px] text-[#775a19] font-medium">
                    {selectedPackage.length} Selected
                  </span>
                </div>

                {selectedPackage.length === 0 ? (
                  <div className="py-8 text-center text-[#7c766d]">
                    <span className="material-symbols-outlined text-[36px] text-[#cdc6ba] mb-2">add_shopping_cart</span>
                    <p className="text-[14px]">Click "+ Add to Package" on any treatment card above to build your estimate.</p>
                  </div>
                ) : (
                  <div>
                    <div className="max-h-[180px] overflow-y-auto space-y-2 pr-2 mb-6 hide-scrollbar">
                      {selectedPackage.map((item) => (
                        <div key={item.name} className="flex justify-between items-center bg-[#f4f3f1] p-3 text-[13px]">
                          <div>
                            <p className="font-semibold text-[#1a1c1a]">{item.name}</p>
                            <p className="text-[11px] text-[#7c766d]">{item.duration}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-[#775a19]">{item.priceFormatted}</span>
                            <button
                              onClick={() => togglePackageItem(item)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[#cdc6ba]/30 pt-4 space-y-2 text-[14px]">
                      <div className="flex justify-between text-[#4b463e]">
                        <span>Subtotal</span>
                        <span>₹{totalBasePrice.toLocaleString('en-IN')}</span>
                      </div>
                      {discountPercent > 0 && (
                        <div className="flex justify-between text-[#775a19] font-medium">
                          <span>Multi-Procedure Savings ({discountPercent}%)</span>
                          <span>- ₹{savingsAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-['EB_Garamond'] text-[24px] font-bold text-[#1a1c1a] pt-2 border-t border-[#cdc6ba]/30">
                        <span>Total Estimate</span>
                        <span className="text-[#775a19]">₹{finalPrice.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <button
                      onClick={bookCustomPackage}
                      className="mt-6 w-full bg-[#775a19] text-white font-['DM_Sans'] text-[14px] font-medium tracking-[0.08em] uppercase py-3.5 hover:bg-[#5d4201] transition-colors"
                    >
                      Book Custom Package Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Skin Analyzer Section */}
      <section id="ai-analyzer" className="bg-[#f4f3f1] border-y border-[#cdc6ba]/30">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="font-['DM_Sans'] text-[14px] font-medium tracking-[0.15em] uppercase text-[#775a19] mb-3">
              AI Clinical Diagnostics
            </p>
            <h2 className="font-['EB_Garamond'] text-[36px] md:text-[48px] font-medium text-[#1a1c1a]">
              Skin Analysis Engine
            </h2>
            <p className="text-[15px] text-[#4b463e] mt-3 max-w-[540px] mx-auto">
              Upload your own facial photo or choose a preset clinical scan to evaluate 5 diagnostic parameters.
            </p>
          </div>

          {/* Sample Preset Selector Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {SAMPLE_PHOTOS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`text-[12px] font-['DM_Sans'] font-medium px-4 py-2 transition-all border ${
                  uploadedImage === preset.img
                    ? 'bg-[#665e4b] text-white border-[#665e4b]'
                    : 'bg-white text-[#4b463e] border-[#cdc6ba]/50 hover:border-[#665e4b]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Zone & Scanning Canvas */}
            <div className="relative">
              <div className="relative border-2 border-dashed border-[#cdc6ba] rounded-xl overflow-hidden bg-white custom-shadow">
                <div className="relative h-[420px] bg-black">
                  <img
                    src={uploadedImage}
                    alt="Skin diagnostic subject"
                    className="w-full h-full object-cover opacity-80"
                  />

                  {/* Scanning Animation Overlay */}
                  {analyzing && (
                    <div className="absolute inset-0 z-20 pointer-events-none">
                      {/* Laser Line */}
                      <div
                        className="w-full h-1 bg-[#e9c176] shadow-[0_0_15px_#e9c176] absolute top-0 transition-all ease-linear"
                        style={{ top: `${progress}%` }}
                      />
                      {/* Grid Nodes */}
                      <div className="absolute inset-0 border border-[#e9c176]/30 grid grid-cols-4 grid-rows-4">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className="border border-[#e9c176]/10 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e9c176] animate-ping" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    {analyzing ? (
                      <div className="text-center text-white p-6 bg-black/60 rounded-xl backdrop-blur-md">
                        <div className="w-12 h-12 border-4 border-white/30 border-t-[#e9c176] rounded-full animate-spin mx-auto mb-4" />
                        <p className="font-['DM_Sans'] text-[16px] font-medium mb-2">
                          Scanning Facial Landmark Nodes...
                        </p>
                        <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden mx-auto mb-2">
                          <div
                            className="h-full bg-[#e9c176] rounded-full transition-all duration-200"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-[12px] text-[#e8dcc4] font-mono">{Math.round(progress)}% Complete</p>
                      </div>
                    ) : !showResults ? (
                      <div className="text-center p-6 bg-black/50 backdrop-blur-md rounded-xl max-w-[320px]">
                        <span className="material-symbols-outlined text-[42px] text-[#e9c176] mb-2">
                          center_focus_strong
                        </span>
                        <p className="font-['DM_Sans'] text-[15px] font-medium text-white mb-3">
                          Ready for Analysis
                        </p>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={runDiagnostics}
                            className="bg-[#775a19] text-white font-['DM_Sans'] text-[13px] font-medium tracking-[0.08em] uppercase py-3 px-6 hover:bg-[#5d4201] transition-colors"
                          >
                            Run Diagnostics
                          </button>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white/20 text-white font-['DM_Sans'] text-[12px] font-medium tracking-[0.05em] uppercase py-2 px-4 hover:bg-white/30 transition-colors"
                          >
                            Upload Custom Photo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-[12px] px-3 py-1.5 rounded flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Analysis Complete
                      </div>
                    )}
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="mt-3 flex justify-between items-center text-[12px] text-[#7c766d]">
                <span>Format: JPG, PNG • Max 10MB</span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#775a19] font-medium hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">upload</span> Upload Different Image
                </button>
              </div>
            </div>

            {/* Results Panel */}
            <div
              className={`transition-all duration-700 ${
                showResults ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="bg-white border border-[#cdc6ba]/30 p-6 md:p-8 custom-shadow">
                {/* Report Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#cdc6ba]/30">
                  <div>
                    <p className="text-[12px] tracking-[0.1em] uppercase text-[#7c766d]">
                      Clinical Diagnostic Report
                    </p>
                    <p className="font-['EB_Garamond'] text-[20px] font-medium text-[#1a1c1a]">
                      #SS360-SCAN-{Math.floor(1000 + Math.random() * 9000)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] text-[#7c766d]">Scan Date</p>
                    <p className="text-[13px] font-medium text-[#665e4b]">
                      {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* 5-Metric Visual Gauges */}
                <div className="space-y-4 mb-6">
                  {[
                    { label: 'Hydration Level', val: activeDiagnosticMetrics.hydration, status: activeDiagnosticMetrics.hydration > 75 ? 'Optimal' : 'Needs Moisture' },
                    { label: 'Pore & Texture', val: activeDiagnosticMetrics.texture, status: 'Refined' },
                    { label: 'Collagen & Elasticity', val: activeDiagnosticMetrics.collagen, status: 'Good Firmness' },
                    { label: 'UV Exposure Index', val: activeDiagnosticMetrics.uvDamage, status: activeDiagnosticMetrics.uvDamage < 25 ? 'Low Concern' : 'Moderate Sun Damage' },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-[13px] mb-1">
                        <span className="font-medium text-[#1a1c1a]">{m.label}</span>
                        <span className="text-[#775a19] font-semibold">{m.val}% ({m.status})</span>
                      </div>
                      <div className="w-full h-2 bg-[#e3e2e0] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#775a19] rounded-full transition-all duration-1000"
                          style={{ width: `${m.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insight Box */}
                <div className="bg-[#ffdea5]/20 border border-[#ffdea5]/40 p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#775a19] text-[20px] mt-0.5">verified_user</span>
                    <div>
                      <p className="text-[13px] font-semibold text-[#665e4b]">Diagnostic Summary</p>
                      <p className="text-[13px] text-[#4b463e] leading-[20px] mt-1">
                        Analysis reveals a <span className="font-semibold">{activeRecommendation}</span> will optimize cellular turnover and restore dermal luminescence.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="flex gap-4 items-center bg-[#f4f3f1] border border-[#cdc6ba]/20 p-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.08em] text-[#7c766d]">Matched Protocol</p>
                    <h4 className="font-['EB_Garamond'] text-[18px] font-medium text-[#1a1c1a]">{activeRecommendation}</h4>
                  </div>
                  <button
                    onClick={() => navigate(`/results#booking?treatment=${encodeURIComponent(activeRecommendation)}`)}
                    className="bg-[#665e4b] text-white text-[12px] font-medium tracking-[0.05em] uppercase px-4 py-2.5 hover:bg-[#4d4634] transition-colors flex-shrink-0"
                  >
                    Book Protocol
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
