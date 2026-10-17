import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, 
  AlertCircle, ExternalLink, Navigation, Building2, 
  ArrowLeft, ChevronRight, Sparkles, ShieldCheck, Headphones
} from 'lucide-react';
import { WebsiteHeader } from './WebsiteHeader';
import { Footer } from './Footer';
import { submitInquiry, InquiryPayload } from '../services/api';
import { InfoModalType } from './InfoModal';

interface BranchInfo {
  id: 'salem' | 'coimbatore' | 'dharmapuri';
  name: string;
  tag: string;
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  directionsUrl: string;
}

const BRANCHES: BranchInfo[] = [
  {
    id: 'salem',
    name: 'Aakash Aqua Tech Pvt Ltd – Head Office',
    tag: 'Main Headquarters & Experience Center',
    address: '1st Cross, 10, 62C, Brindavan Rd, behind Dr.Sudamani Hospital, Fairlands, Salem, Tamil Nadu 636016',
    phone: '096555 99666',
    email: 'info@aakashaquatech.com',
    mapEmbedUrl: 'https://maps.google.com/maps?q=11.6752941%2C78.1445511&t=m&z=16&output=embed',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Aakash%20Aqua%20Tech%20Pvt%20Ltd%2C%201st%20Cross%2C%2010%2C%2062C%2C%20Brindavan%20Rd%2C%20behind%20Dr.Sudamani%20Hospital%2C%20Fairlands%2C%20Salem%2C%20Tamil%20Nadu%20636016',
  },
  {
    id: 'coimbatore',
    name: 'Aakash Aqua Tech Pvt Ltd – Coimbatore Branch',
    tag: 'Industrial & Domestic Engineering Branch',
    address: '1A2, east, 1st St, Peelamedu West, STV Nagar, peelamedu, Coimbatore, Tamil Nadu 641004',
    phone: '096555 88666',
    email: 'coimbatore@aakashaquatech.com',
    mapEmbedUrl: 'https://maps.google.com/maps?q=11.021365%2C76.9936311&t=m&z=16&output=embed',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Aakash%20Aqua%20Tech%2C%201A2%2C%20east%2C%201st%20St%2C%20Peelamedu%20West%2C%20STV%20Nagar%2C%20Peelamedu%2C%20Coimbatore%2C%20Tamil%20Nadu%20641004',
  },
  {
    id: 'dharmapuri',
    name: 'Aakash Pure Aqua Tech – Dharmapuri Branch',
    tag: 'Regional Service & Installation Hub',
    address: 'TNEB Office, 3/119A Road, opposite Government Arts College, Emakuttiyur, Dharmapuri, Tamil Nadu 636705',
    phone: '096555 99666',
    email: 'dharmapuri@aakashaquatech.com',
    mapEmbedUrl: 'https://maps.google.com/maps?q=TNEB%20Office%203%2F119A%20Government%20Arts%20College%20Dharmapuri%20636705&t=m&z=15&output=embed',
    directionsUrl: 'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x3bac1746321a793f:0x5aff1d1c6987357c',
  },
];

interface ContactUsPageProps {
  onBackToHome: () => void;
  onSelectNav: (item: string) => void;
  onSelectCategory?: (category: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
  onOpenSearch: () => void;
  onOpenOrder: (productName?: string) => void;
  onOpenInfo: (type: InfoModalType) => void;
  onOpenQuote: () => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({
  onBackToHome,
  onSelectNav,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenLogin,
  onOpenSearch,
  onOpenOrder,
  onOpenInfo,
  onOpenQuote,
}) => {
  const [activeBranch, setActiveBranch] = useState<BranchInfo>(BRANCHES[0]);
  const [openAccordion, setOpenAccordion] = useState<string>('salem');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Water Treatment & RO Plant',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatusMessage({ type: 'error', text: 'Please provide both your name and phone number.' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const payload: InquiryPayload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        serviceType: formData.serviceType,
        waterSource: 'Direct Contact Page Form',
        message: formData.message,
      };

      const res = await submitInquiry(payload);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: 'Thank you! Your inquiry has been received. Our water engineering team will contact you shortly.',
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          serviceType: 'Water Treatment & RO Plant',
          message: '',
        });
      } else {
        setStatusMessage({ type: 'error', text: res.message || 'Failed to send message. Please call our direct helpline.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Network connection issue. Please call our direct helpline.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900 font-sans flex flex-col relative">
      
      {/* Top Header */}
      <WebsiteHeader
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        onOpenLogin={onOpenLogin}
        onOpenSearch={onOpenSearch}
        onOpenOrder={onOpenOrder}
        onSelectNav={(item) => {
          if (item === 'Contact') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            onSelectNav(item);
          }
        }}
        onSelectCategory={onSelectCategory}
        onBackToIntro={onBackToHome}
      />

      {/* Floating Back to Home Button (Matches official .aat-back-button) */}
      <button
        onClick={onBackToHome}
        aria-label="Back to Home"
        title="Back to Home"
        className="fixed top-24 left-4 sm:left-6 z-40 w-11 h-11 rounded-full bg-white text-[#2d737d] border border-[#6f9ea6]/40 shadow-lg flex items-center justify-center hover:bg-[#2d737d] hover:text-white transition-all transform hover:scale-105 active:scale-95 group cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Main Page Container */}
      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        
        {/* Page Hero & Breadcrumb Banner */}
        <div className="bg-gradient-to-r from-[#0f2d35] via-[#1a444e] to-[#2d737d] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 shadow-inner relative overflow-hidden">
          {/* Subtle background ripples */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Breadcrumb Trail */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-cyan-200/80 mb-4 font-medium" aria-label="Breadcrumb">
              <button 
                onClick={onBackToHome}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                Home
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-300/60" />
              <span className="text-white font-semibold">Contact Us</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 text-xs font-bold tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Direct Engineering Showrooms & Support
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Contact Us
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                Connect directly with <strong>AAKASH PURE AQUA TECH PRIVATE LIMITED</strong>. Visit our branches in Salem, Coimbatore, and Dharmapuri or request instant technical consultation for turnkey water purification plants.
              </p>
            </div>
          </div>
        </div>

        {/* Core Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Direct Inquiry Form + Branch Office Directory (7 Cols) */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Card 1: Direct Contact Form */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50">
                <div className="border-b border-slate-100 pb-5 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2d737d] block mb-1">
                    Send Us A Direct Message
                  </span>
                  <h2 className="text-2xl font-black text-[#132f36] tracking-tight">
                    Get Instant Technical Advice & Quotation
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill out this form and our senior water engineering consultant will call you back within 30 minutes.
                  </p>
                </div>

                {statusMessage && (
                  <div
                    className={`mb-6 p-4 rounded-2xl flex items-start gap-3 border text-sm ${
                      statusMessage.type === 'success'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-rose-50 border-rose-300 text-rose-800'
                    }`}
                  >
                    {statusMessage.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <span className="font-medium leading-relaxed">{statusMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#2d737d] focus:border-[#2d737d] outline-none transition-all placeholder:text-slate-400 bg-slate-50/50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 096555 99666"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#2d737d] focus:border-[#2d737d] outline-none transition-all placeholder:text-slate-400 bg-slate-50/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. ramesh@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#2d737d] focus:border-[#2d737d] outline-none transition-all placeholder:text-slate-400 bg-slate-50/50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Purification Solution Needed
                      </label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#2d737d] focus:border-[#2d737d] outline-none transition-all bg-slate-50/50 focus:bg-white text-slate-800"
                      >
                        <option value="Industrial RO Plant">Industrial RO Plant (250 - 50,000 LPH)</option>
                        <option value="Commercial RO System">Commercial RO System (50 - 250 LPH)</option>
                        <option value="Water Softener & Filtration">Automatic Water Softener & Filtration</option>
                        <option value="Domestic RO & Alkaline">Domestic Alkaline RO Purifier</option>
                        <option value="SS Water Cooler & Dispenser">Stainless Steel Water Cooler & Dispenser</option>
                        <option value="Annual Maintenance Contract (AMC)">AMC & Servicing / Membrane Replacement</option>
                        <option value="Turnkey Water Plant">Complete Turnkey Bottling / Mineral Plant</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Message or Plant Capacity Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please share your daily water consumption, raw water TDS, or specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#2d737d] focus:border-[#2d737d] outline-none transition-all placeholder:text-slate-400 bg-slate-50/50 focus:bg-white resize-y"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <span className="text-xs text-slate-500 text-center sm:text-left flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      100% confidential. No spam guaranteed.
                    </span>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1b3d4b] to-[#2d737d] hover:from-[#132f36] hover:to-[#235b63] text-white font-extrabold text-sm tracking-wide shadow-lg shadow-cyan-900/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Card 2: Official Branch Offices Directory Accordion */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2d737d] block mb-1">
                    Direct Showroom Addresses
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#132f36] tracking-tight">
                    Visit Our Physical Offices & Service Hubs
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Walk in to experience working models of domestic purifiers, commercial plants, and water softeners.
                  </p>
                </div>

                <div className="space-y-4">
                  {BRANCHES.map((b) => {
                    const isOpen = openAccordion === b.id;
                    return (
                      <div
                        key={b.id}
                        className={`border rounded-2xl transition-all overflow-hidden ${
                          isOpen
                            ? 'border-[#2d737d] shadow-md bg-white'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setOpenAccordion(isOpen ? '' : b.id);
                            setActiveBranch(b);
                          }}
                          className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold transition-colors cursor-pointer ${
                            isOpen ? 'bg-[#2d737d] text-white' : 'text-[#132f36] hover:bg-slate-100/70'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                isOpen ? 'bg-white/20 text-white' : 'bg-[#eef6f7] text-[#2d737d]'
                              }`}
                            >
                              <Building2 className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-sm sm:text-base font-extrabold">{b.name}</div>
                              <div className={`text-xs ${isOpen ? 'text-cyan-100' : 'text-slate-500'}`}>
                                {b.tag}
                              </div>
                            </div>
                          </div>

                          <span className={`text-xl font-bold shrink-0 px-2 ${isOpen ? 'text-white' : 'text-[#2d737d]'}`}>
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="p-5 sm:p-6 space-y-4 bg-white border-t border-slate-100 text-sm animate-in fade-in duration-200">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-[#2d737d] shrink-0 mt-0.5" />
                              <div className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                                <strong className="text-slate-900 block mb-0.5">Address:</strong>
                                {b.address}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                              <div className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-[#2d737d] shrink-0" />
                                <div>
                                  <span className="text-[11px] text-slate-500 block">Phone:</span>
                                  <a href={`tel:${b.phone.replace(/\s+/g, '')}`} className="font-bold text-[#132f36] hover:text-[#2d737d]">
                                    {b.phone}
                                  </a>
                                </div>
                              </div>

                              <div className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-[#2d737d] shrink-0" />
                                <div>
                                  <span className="text-[11px] text-slate-500 block">Email:</span>
                                  <a href={`mailto:${b.email}`} className="font-bold text-[#132f36] hover:text-[#2d737d] truncate block max-w-[220px]">
                                    {b.email}
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="pt-2 flex flex-wrap gap-2.5">
                              <a
                                href={b.directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2d737d] hover:bg-[#1b3d4b] text-white text-xs font-bold transition-colors shadow-sm"
                              >
                                <Navigation className="w-3.5 h-3.5" />
                                <span>Open in Google Maps ↗</span>
                              </a>
                              <button
                                type="button"
                                onClick={() => setActiveBranch(b)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                              >
                                <span>View on Interactive Map Below</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Regional Map & Direct Contact Highlights (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              
              {/* Map Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xl shadow-slate-200/50">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2d737d] block">
                      Regional Network
                    </span>
                    <h3 className="text-lg font-black text-[#132f36]">
                      Tamil Nadu Branch Locations
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#eef6f7] flex items-center justify-center text-[#2d737d]">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

                {/* Branch Switcher Buttons */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl mb-4">
                  {BRANCHES.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setActiveBranch(b);
                        setOpenAccordion(b.id);
                      }}
                      className={`py-2 px-2 rounded-lg text-xs font-bold transition-all truncate cursor-pointer ${
                        activeBranch.id === b.id
                          ? 'bg-[#2d737d] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      {b.id === 'salem' ? 'Salem (HQ)' : b.id === 'coimbatore' ? 'Coimbatore' : 'Dharmapuri'}
                    </button>
                  ))}
                </div>

                {/* Active Branch Header Info */}
                <div className="p-3.5 rounded-xl bg-[#eef6f7] border border-[#2d737d]/20 mb-3 text-xs">
                  <div className="font-extrabold text-[#132f36] flex items-center justify-between">
                    <span>{activeBranch.name}</span>
                    <span className="text-[10px] uppercase font-bold text-[#2d737d] bg-white px-2 py-0.5 rounded-full">
                      Active Pin
                    </span>
                  </div>
                  <div className="text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {activeBranch.address}
                  </div>
                </div>

                {/* Google Maps Embed Frame */}
                <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-100">
                  <iframe
                    title={activeBranch.name}
                    src={activeBranch.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <a
                    href={activeBranch.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d737d] hover:text-[#132f36] underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Get Turn-by-Turn GPS Navigation ↗</span>
                  </a>

                  <span className="text-[11px] text-slate-500 font-medium">
                    Showrooms open 9 AM – 8 PM
                  </span>
                </div>
              </div>

              {/* 24/7 Helpline & Rapid AMC Card */}
              <div className="bg-gradient-to-br from-[#132f36] to-[#1b3d4b] rounded-3xl p-6 text-white shadow-xl shadow-slate-900/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center border border-cyan-400/30">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white">
                      24/7 Direct Engineering Helpline
                    </h4>
                    <span className="text-xs text-cyan-300">
                      Emergency AMC, Breakdown & Plant Setup
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Central Customer Care:</span>
                    <strong className="text-amber-300 font-black">24x7 Immediate Response</strong>
                  </div>
                  <div className="text-2xl font-black text-white tracking-wide">
                    <a href="tel:9655577666" className="hover:text-cyan-300 transition-colors">
                      +91 96555 77666
                    </a>
                  </div>
                  <div className="text-xs text-slate-300">
                    Direct CEO / Escalation: <a href="mailto:ceo@aakashaquatech.in" className="text-cyan-200 hover:underline">ceo@aakashaquatech.in</a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <Clock className="w-4 h-4 text-cyan-300 mb-1" />
                    <div className="font-bold text-white">Working Hours</div>
                    <div className="text-slate-300 text-[11px]">Mon – Sat: 9am – 8pm</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                    <div className="font-bold text-white">Coverage Area</div>
                    <div className="text-slate-300 text-[11px]">All 38 Tamil Nadu Districts</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer onOpenInfo={onOpenInfo} onOpenQuote={onOpenQuote} />

    </div>
  );
};
