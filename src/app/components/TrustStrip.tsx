import React from 'react';
import { Truck, PhoneCall, ShieldCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <section className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          {/* Card 1 */}
          <div className="flex items-center gap-4 justify-center md:justify-start pt-4 md:pt-0 md:px-6">
            <div className="w-14 h-14 rounded-2xl bg-[#eef6f7] flex items-center justify-center text-[#2d737d] shrink-0 shadow-inner">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-[#173238]">Free Shipping</h4>
              <p className="text-xs text-slate-500 font-medium">Free Shipping on all orders across Tamil Nadu</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-4 justify-center md:justify-start pt-4 md:pt-0 md:px-6">
            <div className="w-14 h-14 rounded-2xl bg-[#eef6f7] flex items-center justify-center text-[#2d737d] shrink-0 shadow-inner">
              <PhoneCall className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-[#173238]">Online Support 24/7</h4>
              <a href="tel:9655577666" className="text-xs font-bold text-[#2d737d] hover:underline">
                Call Us: 96555 77666
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center gap-4 justify-center md:justify-start pt-4 md:pt-0 md:px-6">
            <div className="w-14 h-14 rounded-2xl bg-[#eef6f7] flex items-center justify-center text-[#2d737d] shrink-0 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-[#173238]">Secure Payment</h4>
              <p className="text-xs text-slate-500 font-medium">Trusted Banking & Direct UPI Transaction</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
