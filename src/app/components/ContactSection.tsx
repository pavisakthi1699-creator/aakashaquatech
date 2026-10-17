import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, 
  AlertCircle, ExternalLink, Navigation, Building2, ShieldCheck, Sparkles 
} from 'lucide-react';
import { submitInquiry, InquiryPayload } from '../services/api';

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

export const ContactSection: React.FC = () => {
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
        waterSource: 'Direct Contact Form',
        message: formData.message,
      };

      const res = await submitInquiry(payload);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: 'Thank you! Your message has been received. Our water engineering team will reach out to you shortly.',
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          serviceType: 'Water Treatment & RO Plant',
          message: '',
        });
      } else {
        setStatusMessage({ type: 'error', text: res.message || 'Failed to send message. Please call us directly.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Network connection issue. Please call our direct helpline.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 sm:py-24 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] relative scroll-mt-20">
      <span id="contact" className="absolute -top-24" aria-hidden="true" />

      {/* Decorative ambient water glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/80 border border-cyan-200 text-[#005f73] text-xs font-black uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
            <span>Direct Engineering & Showroom Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005f73] via-[#0a9396] to-[#2e8540]">Aakash Aqua Tech</span>
          </h2>
          <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
            Reach out to our certified water engineers. Get direct consultation, doorstep water testing, or visit our showrooms across Tamil Nadu.
          </p>
        </div>

        {/* Main 2-Column Grid: Left (Form + Branches) | Right (Interactive Map + Fast Helpline) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Contact Form & Office Address List */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Quick Inquiry Form Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50 relative overflow-hidden">
              <div className="border-b border-slate-100 pb-5 mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">Send an Inquiry</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your details and message. Our water treatment specialist will get in touch right away.
                </p>
              </div>

              {statusMessage && (
                <div
                  className={`mb-6 p-4 rounded-2xl flex items-start gap-3 text-sm ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      : 'bg-rose-50 border border-rose-200 text-rose-800'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                  )}
                  <span className="font-medium">{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#005f73] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 96555 77666"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#005f73] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. anand@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#005f73] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Interested In
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#005f73] focus:bg-white transition-all"
                    >
                      <option value="Domestic RO Purifier">Domestic RO Purifier</option>
                      <option value="Water Treatment & RO Plant">Water Treatment & RO Plant</option>
                      <option value="Water Softener System">Water Softener System</option>
                      <option value="Commercial RO Dispenser">Commercial RO Dispenser</option>
                      <option value="Industrial DM Plant">Industrial DM Plant</option>
                      <option value="Spares & AMC Service">Spares & AMC Service</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message / Water Issue
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your requirement (e.g. TDS level, borewell/corporation water, daily liter requirement)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#005f73] focus:bg-white transition-all resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free on-site TDS analysis & zero obligation quote</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#005f73] to-[#0a9396] hover:from-[#084c5b] hover:to-[#005f73] text-white text-sm font-black uppercase tracking-wider shadow-lg shadow-[#005f73]/25 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* 2. Office Address Branches List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50">
              <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">Office Addresses</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Our certified branch network across Tamil Nadu</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-[#005f73]">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {BRANCHES.map((b) => {
                  const isOpen = openAccordion === b.id;
                  const isMapActive = activeBranch.id === b.id;

                  return (
                    <div 
                      key={b.id}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isMapActive 
                          ? 'border-[#005f73] bg-[#005f73]/[0.02] shadow-md shadow-[#005f73]/10' 
                          : 'border-slate-200/80 bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      <button
                        onClick={() => {
                          setOpenAccordion(isOpen ? '' : b.id);
                          setActiveBranch(b);
                        }}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isMapActive ? 'bg-[#005f73] text-white' : 'bg-slate-200/70 text-slate-700'
                          }`}>
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                              {b.name}
                            </h4>
                            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block mt-0.5">
                              {b.tag}
                            </span>
                          </div>
                        </div>

                        <span className={`text-xl font-bold transition-transform duration-200 ml-2 ${isOpen ? 'rotate-45 text-[#005f73]' : 'text-slate-400'}`}>
                          +
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 border-t border-slate-100/80 space-y-3.5 text-xs sm:text-sm text-slate-600">
                          <p className="leading-relaxed text-slate-700">
                            <strong>Address:</strong> {b.address}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                            <a
                              href={`tel:${b.phone.replace(/\s+/g, '')}`}
                              className="inline-flex items-center gap-1.5 text-[#005f73] hover:text-[#084c5b] hover:underline"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>{b.phone}</span>
                            </a>

                            <a
                              href={`mailto:${b.email}`}
                              className="inline-flex items-center gap-1.5 text-[#005f73] hover:text-[#084c5b] hover:underline"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>{b.email}</span>
                            </a>
                          </div>

                          <div className="pt-2 flex flex-wrap items-center gap-2.5">
                            <a
                              href={b.directionsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                            >
                              <span>Open in Maps</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>

                            <button
                              onClick={() => setActiveBranch(b)}
                              className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                                isMapActive
                                  ? 'bg-cyan-50 border-cyan-300 text-[#005f73]'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#005f73]'
                              }`}
                            >
                              {isMapActive ? 'Viewing on Map' : 'View on Live Map'}
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

          {/* RIGHT COLUMN: Interactive Location Map (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">Location Map</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Live showroom & factory GPS coordinate</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Navigation className="w-4 h-4" />
                </div>
              </div>

              {/* Branch Selector Switcher Pills */}
              <div className="flex gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 mb-4 overflow-x-auto">
                {BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setActiveBranch(b);
                      setOpenAccordion(b.id);
                    }}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer text-center ${
                      activeBranch.id === b.id
                        ? 'bg-white text-[#005f73] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {b.id === 'salem' ? 'Salem' : b.id === 'coimbatore' ? 'Coimbatore' : 'Dharmapuri'}
                  </button>
                ))}
              </div>

              {/* Active Branch Overview Badge */}
              <div className="p-3 rounded-xl bg-cyan-50/70 border border-cyan-200/60 mb-4 text-xs">
                <div className="font-bold text-[#005f73] line-clamp-1">{activeBranch.name}</div>
                <div className="text-slate-600 mt-0.5 line-clamp-1">{activeBranch.address}</div>
              </div>

              {/* Live Embedded Google Maps Frame */}
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100 shadow-inner">
                <iframe
                  key={activeBranch.id}
                  title={`${activeBranch.name} location map`}
                  src={activeBranch.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Need exact turn-by-turn navigation?</span>
                <a
                  href={activeBranch.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#005f73] hover:underline inline-flex items-center gap-1"
                >
                  <span>Open GPS</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Fast Engineering Helpline Box */}
            <div className="rounded-3xl bg-gradient-to-br from-[#005f73] via-[#0a9396] to-[#084c5b] p-6 text-white shadow-xl shadow-[#005f73]/20 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-200">24/7 Helpline Desk</div>
                  <a href="tel:9655577666" className="text-xl font-black text-white hover:text-cyan-200 transition-colors">
                    96555 77666 / 96555 99666
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/15 text-xs">
                <div>
                  <div className="text-cyan-200 font-semibold">Official Email</div>
                  <a href="mailto:ceo@aakashaquatech.in" className="font-bold hover:underline block truncate">
                    ceo@aakashaquatech.in
                  </a>
                </div>
                <div>
                  <div className="text-cyan-200 font-semibold">Service Hours</div>
                  <div className="font-bold">Mon - Sun: 9AM - 8PM</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
