import React, { useState } from 'react';
import { X, CheckCircle, Droplet, ArrowRight } from 'lucide-react';
import { submitInquiry } from '../services/api';

interface FloatingToolsProps {
  onOpenTerms: () => void;
}

export const FloatingTools: React.FC<FloatingToolsProps> = ({ onOpenTerms }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    city: '',
    pincode: '',
    interest: 'Water Purifier',
    address: '',
    agree: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mobile || !formData.first_name) return;

    setIsSubmitting(true);
    await submitInquiry({
      name: `${formData.first_name} ${formData.last_name}`.trim(),
      phone: formData.mobile,
      email: '',
      serviceType: `Demo Request: ${formData.interest}`,
      waterSource: `City: ${formData.city} | Pin: ${formData.pincode}`,
      message: `Address: ${formData.address}`
    });

    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({
        first_name: '',
        last_name: '',
        mobile: '',
        city: '',
        pincode: '',
        interest: 'Water Purifier',
        address: '',
        agree: true
      });
    }, 2500);
  };

  return (
    <>
      {/* Right Side Stacked Tools */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-4 sm:top-1/2 sm:right-0 sm:-translate-y-1/2 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
        
        {/* Book a Demo Tab (Desktop & Tablet only) */}
        <button
          onClick={() => setModalOpen(true)}
          className="hidden sm:flex bg-[#12306b] hover:bg-[#0d2450] text-white font-bold text-xs tracking-wider py-4 px-2 rounded-l-lg shadow-[-2px_2px_8px_rgba(0,0,0,0.3)] transition-all items-center justify-center select-none"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}
          title="Book a Free Water Purifier Demo"
        >
          Book a Demo
        </button>

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/919655599666?text=Hello%20Aakash%20Aqua%20Tech%2C%20I%20would%20like%20to%20inquire%20about%20your%20Water%20Purifier%20and%20RO%20Systems."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-11 sm:h-11 rounded-full bg-[#25D366] hover:bg-[#1ebe5a] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95"
          aria-label="Chat with Aakash Aqua Tech on WhatsApp"
          title="Chat on WhatsApp (96555 99666)"
        >
          <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current" aria-hidden="true">
            <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.31.65 4.47 1.78 6.31L4 29l7.86-1.75A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.9c-1.98 0-3.83-.55-5.4-1.5l-.39-.23-4.66 1.04 1.06-4.55-.25-.4A9.86 9.86 0 0 1 5.1 15c0-6.01 4.9-10.9 10.9-10.9S26.9 8.99 26.9 15 22 24.9 16.004 24.9zm5.98-8.17c-.33-.16-1.93-.95-2.23-1.06-.3-.11-.52-.16-.74.16-.22.33-.85 1.06-1.04 1.28-.19.22-.38.24-.71.08-.33-.16-1.38-.51-2.63-1.63-.97-.87-1.63-1.94-1.82-2.27-.19-.33-.02-.5.14-.67.14-.14.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56-.19-.01-.41-.01-.63-.01-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71 0 1.6 1.17 3.14 1.33 3.36.16.22 2.3 3.51 5.58 4.92.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.09 1.93-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.38z"/>
          </svg>
        </a>
      </aside>

      {/* Book a Demo Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto border border-slate-200 text-slate-800">
            
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#12306b]">Demo Request Confirmed!</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you! Our technical specialist will contact you shortly to schedule your free water demo and testing session.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-extrabold text-[#12306b]">Book Your Free Demo</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Free doorstep water quality & TDS testing with product demonstration
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12306b] mb-1">First Name*</label>
                      <input
                        type="text"
                        required
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#2d737d]"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12306b] mb-1">Last Name*</label>
                      <input
                        type="text"
                        required
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#2d737d]"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  {/* Mobile & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12306b] mb-1">Mobile Number*</label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#2d737d]"
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12306b] mb-1">City*</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#2d737d]"
                        placeholder="Salem, Coimbatore, etc."
                      />
                    </div>
                  </div>

                  {/* Pin Code & Interest */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#12306b] mb-1">Pin Code*</label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#2d737d]"
                        placeholder="6-digit pincode"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12306b] mb-1">I'm interested in</label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#2d737d] bg-white"
                      >
                        <option value="Water Purifier">Water Purifier (Domestic / UV / RO)</option>
                        <option value="Water Softener">Water Softener / Conditioning</option>
                        <option value="Commercial RO Plant">Commercial & Industrial RO Plant</option>
                        <option value="SS Water Dispenser">SS Water Dispenser</option>
                        <option value="AMC / Service">AMC / Repair Service</option>
                        <option value="Other">Other Requirement</option>
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-[#12306b] mb-1">Address*</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#2d737d]"
                      placeholder="Door no, street, locality for technician visit"
                    />
                  </div>

                  {/* Agree Checkbox */}
                  <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      id="terms-agree"
                      required
                      checked={formData.agree}
                      onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                      className="rounded text-[#2d737d] focus:ring-[#2d737d]"
                    />
                    <label htmlFor="terms-agree">
                      I have read and agree to the{' '}
                      <button
                        type="button"
                        onClick={onOpenTerms}
                        className="text-[#2d737d] font-bold underline"
                      >
                        terms & conditions
                      </button>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#12306b] hover:bg-[#0d2450] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Scheduling Demo...</span>
                    ) : (
                      <>
                        <span>Submit Demo Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
