import React, { useState } from 'react';
import { submitInquiry, InquiryPayload } from '../services/api';
import { Send, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService = '', onSuccess }) => {
  const [formData, setFormData] = useState<InquiryPayload>({
    name: '',
    phone: '',
    email: '',
    serviceType: initialService || 'Industrial RO Plant',
    waterSource: 'Borewell / High TDS',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setStatusMessage({ type: 'error', text: 'Please enter your name and phone number.' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await submitInquiry(formData);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: res.message || 'Inquiry submitted successfully! Our water engineer will contact you shortly.'
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          serviceType: 'Industrial RO Plant',
          waterSource: 'Borewell / High TDS',
          message: ''
        });
        if (onSuccess) {
          setTimeout(onSuccess, 2000);
        }
      } else {
        setStatusMessage({ type: 'error', text: res.message || 'Failed to submit inquiry. Please try again.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Connection issue. Please call us directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Direct Engineering Support
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
                Request a Custom Quote or Site Visit
              </h2>
              <p className="text-slate-400 mt-3 text-base leading-relaxed">
                Connect with our senior water treatment engineers. Share your raw water test report or project specifications for an immediate, obligation-free technical recommendation.
              </p>
            </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Direct Helpline</div>
                    <a href="tel:9655577666" className="text-lg font-bold text-white hover:text-cyan-400 transition-colors">
                      96555 77666 / 96555 99666
                    </a>
                    <div className="text-xs text-emerald-400 mt-0.5">24/7 Technical Service Desk</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Official Email</div>
                    <a href="mailto:ceo@aakashaquatech.in" className="text-base font-bold text-white hover:text-cyan-400 transition-colors">
                      ceo@aakashaquatech.in
                    </a>
                    <div className="text-xs text-slate-400 mt-0.5">Direct Response from Technical Desk</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Head Office & Showroom</div>
                    <div className="text-sm text-slate-300 mt-0.5 leading-snug">
                      10/62C, BrindavanRoad, 1st Cross (Behind Dr.Sudamani Hospital), Fairlands, Salem - 636016, Tamil Nadu
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      <strong>Branches:</strong> Coimbatore • Dharmapuri
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Showroom & Service Hours</div>
                    <div className="text-sm text-slate-300 mt-0.5">
                      Monday - Sunday: 9:00 AM - 8:00 PM (Emergency 24/7)
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-800/90 border border-slate-700 p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-2">Book Free Consultation & Water Audit</h3>
              <p className="text-sm text-slate-400 mb-6">
                Fill out the parameters below and our application engineer will prepare a tailored system proposal.
              </p>

              {statusMessage && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-500/20 border border-rose-500/40 text-rose-200'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      System / Plant Required
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                    >
                      <option value="Industrial RO Plant">Industrial RO Plant (5,000+ LPH)</option>
                      <option value="Commercial RO Plant">Commercial RO Plant (500 - 3,000 LPH)</option>
                      <option value="Water Softener System">Water Softener (Hard Water)</option>
                      <option value="DM / Demineralization Plant">Demineralization (DM) Plant</option>
                      <option value="STP / ETP Wastewater System">STP / ETP Wastewater Treatment</option>
                      <option value="Membrane Replacement / AMC">Membrane Replacement & AMC</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Raw Water Source & Existing Issues
                  </label>
                  <select
                    value={formData.waterSource}
                    onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                  >
                    <option value="Borewell / High TDS (> 1500 PPM)">Borewell Water (High TDS / Salty)</option>
                    <option value="Hard Water / Scaling (Boiler/Pipes)">Hard Water (Severe Scaling)</option>
                    <option value="Municipal / River Water">Municipal / Canal / River Supply</option>
                    <option value="Industrial Process Wastewater">Industrial Process / Effluent Water</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Message / Capacity Required (e.g. 5,000 Litres/Day)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about your daily requirement, existing plant capacity, or location..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-base shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Technical Request...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Request For Fast Proposal</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
