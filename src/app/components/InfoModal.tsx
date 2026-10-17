import React from 'react';
import { X, MapPin, Wrench, ShieldCheck, CheckCircle2, Phone, Mail } from 'lucide-react';

export type InfoModalType = 'zones' | 'service' | 'about' | 'privacy' | 'terms' | 'shipping' | 'disclaimer' | 'testimonials' | null;

interface InfoModalProps {
  type: InfoModalType;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose, onOpenQuote }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-slate-200 text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Contents based on type */}
        {type === 'zones' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#eef6f7] flex items-center justify-center text-[#2d737d]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-[#173238]">Zones We Serve</h3>
                <p className="text-xs text-[#2d737d] font-bold">Fast On-Site Response Across Tamil Nadu & Neighboring Regions</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>AAKASH PURE AQUA TECH PRIVATE LIMITED</strong> operates a dedicated network of mobile service vans and certified service engineers stationed across key district clusters:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                'Salem (Head Office)', 'Coimbatore (Branch)', 'Dharmapuri (Branch)',
                'Erode District', 'Namakkal', 'Tirupur Industrial Belt',
                'Karur', 'Hosur & Krishnagiri', 'Madurai Region',
                'Tiruchirappalli (Trichy)', 'Chennai Metrowater Zone', 'Bangalore Outskirts'
              ].map((zone, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#f8fafb] border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{zone}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#eef6f7] border border-[#6f9ea6]/30 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-[#173238]">Need Rapid Service in your locality?</div>
              <div>We guarantee a 4-hour breakdown response for all commercial and industrial RO plants under AMC.</div>
              <div className="pt-2 font-bold text-[#2d737d]">Direct Helpline: 96555 77666 | WhatsApp: 96555 99666</div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="w-full py-3.5 rounded-xl bg-[#1b3d4b] hover:bg-[#2d737d] text-white font-bold text-sm shadow-md transition-colors"
            >
              Request Service in Your City
            </button>
          </div>
        )}

        {type === 'service' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#eef6f7] flex items-center justify-center text-[#2d737d]">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-[#173238]">Water Engineering & AMC Services</h3>
                <p className="text-xs text-[#2d737d] font-bold">Turnkey Multi-Brand Sales, Repair, AMC & Overhauls</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-4 rounded-xl border border-slate-200 bg-[#f8fafb] space-y-1.5">
                <h4 className="font-bold text-slate-900">1. Annual Maintenance Contracts (AMC)</h4>
                <p>Preventative servicing, free periodic filter replacements, sanitization, membrane descaling, and priority emergency breakdown support.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-[#f8fafb] space-y-1.5">
                <h4 className="font-bold text-slate-900">2. Free Water Quality & TDS Analysis</h4>
                <p>Comprehensive on-site testing for TDS, Hardness, Iron, pH, and Turbidity to recommend precisely matched filtration technology.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-[#f8fafb] space-y-1.5">
                <h4 className="font-bold text-slate-900">3. Industrial RO Plant Overhauls & Relocation</h4>
                <p>High-pressure pump rebuilds, CIP (Clean-in-Place) membrane chemical regeneration, resin rebedding, and PLC automation retrofits.</p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="w-full py-3.5 rounded-xl bg-[#2d737d] hover:bg-[#205860] text-white font-bold text-sm shadow-md transition-colors"
            >
              Book Service or AMC Consultation
            </button>
          </div>
        )}

        {type === 'about' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#eef6f7] flex items-center justify-center text-[#2d737d]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-[#173238]">About Aakash Pure Aqua Tech</h3>
                <p className="text-xs text-[#2d737d] font-bold">Founded in 2004 | Over 35 Years of Engineering Excellence</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
              <p>
                Founded by environmental engineering pioneer <strong>Mr. Kannan G.</strong>, Aakash Pure Aqua Tech Private Limited has grown to become South India's undisputed #1 multi-brand water purifier enterprise.
              </p>
              <p>
                Headquartered in Salem with full-fledged branch facilities in Coimbatore and Dharmapuri, we maintain an inventory of over 375+ advanced systems and genuine spares. Our installations power prestigious institutions including ISRO space centers, 16 international airports, manufacturing titans like Foxconn, Hyundai, MRF, TVS, and thousands of households.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-semibold">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-400 font-bold text-[10px] uppercase">Corporate Office</div>
                  <div className="text-slate-800 mt-1">10/62C, BrindavanRoad, 1st Cross, Fairlands, Salem - 636016</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-400 font-bold text-[10px] uppercase">Direct Phone</div>
                  <div className="text-slate-800 mt-1">96555 77666 / 96555 99666</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="w-full py-3.5 rounded-xl bg-[#1b3d4b] hover:bg-[#2d737d] text-white font-bold text-sm shadow-md transition-colors"
            >
              Contact Our Engineers
            </button>
          </div>
        )}

        {/* Legal Policies */}
        {type === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-[#173238]">Privacy Policy</h3>
            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>At Aakash Pure Aqua Tech Private Limited, we are committed to safeguarding your personal data and privacy.</p>
              <p>We collect customer information such as name, phone number, and address strictly for scheduling water testing, delivery of purifiers, and warranty service registration. We do not sell or lease your personal information to any third parties.</p>
              <p>For inquiries regarding data records, reach us at ceo@aakashaquatech.in.</p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-[#173238]">Terms and Conditions</h3>
            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>1. Product warranties are backed by respective original equipment manufacturers as well as Aakash Pure Aqua Tech service guarantees.</p>
              <p>2. Free installation applies within designated municipal delivery zones across Salem, Coimbatore, Dharmapuri, and Tamil Nadu.</p>
              <p>3. Raw water chemistry tests are conducted as an informational service to match appropriate filtration technology.</p>
            </div>
          </div>
        )}

        {type === 'shipping' && (
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-[#173238]">Shipping & Cancellation Policy</h3>
            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>Orders are dispatched through our direct delivery fleet or certified logistics partners. Most items are delivered within 24 to 48 hours within Tamil Nadu.</p>
              <p>Orders may be modified or cancelled prior to dispatch by calling our customer helpline at 96555 77666.</p>
            </div>
          </div>
        )}

        {type === 'disclaimer' && (
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-[#173238]">Disclaimer</h3>
            <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>All brand logos (Kent, AO Smith, Purella, Wave, Conway, ZeroB, Aquaguard) are registered trademarks of their respective owners. Aakash Pure Aqua Tech Private Limited is an authorized sales, distribution, and service multi-brand specialist.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
