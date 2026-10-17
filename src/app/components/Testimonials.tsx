import React, { useState } from 'react';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Muthu Gopal',
      date: 'Verified Buyer',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJnA5L1sfp2uZfpkF36Tpqx628pBSjytWo-N53alCV2-OGH-g=w40-h40-c-rp-mo-br100',
      comment: 'Delicious water taste after installation. Excellent service team and polite behavior.',
      rating: 5
    },
    {
      name: 'Logu Logu',
      date: 'Verified Buyer',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLmJVtb-3OcThSlWVZNKyLrOu18593qe4IX3aTZvyWD42_tbQ=w40-h40-c-rp-mo-br100',
      comment: 'Nice service by a team. Quick response and clean installation of commercial RO plant.',
      rating: 5
    },
    {
      name: 'Sathish Khumar',
      date: 'Verified Buyer',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUEU-Zc86FU8-tomW71s1P3E8hJuUz_pAVtdajrMn5EthMR1J5s=w40-h40-c-rp-mo-br100',
      comment: 'Very knowledgeable and far better than brands. Best part is very transparent and addressed my requirement by Mr.Kannan. Most brands didn’t do it and tried to convince me for their incentives. Thanks for the customisation.',
      rating: 5
    },
    {
      name: 'Sathish Kumar',
      date: 'Verified Buyer',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVVqWpN0AOFtxp5DPzLAuW8ZzT1pFnmCGXPlHuyPlTUe2c95RI=w40-h40-c-rp-mo-br100',
      comment: 'I bought RO from this company. Excellent quality at reasonable price. customer service is also very good.',
      rating: 5
    },
    {
      name: 'annamalai mani',
      date: 'Verified Buyer',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKBwnGJVwgCEJnpTMB7qpKi079kobuPOijuNXS7X2mWD6fICg=w40-h40-c-rp-mo-br100',
      comment: '🙏🏿🙏🏿👍👍We are very much satisfied for our repaired ro unit, now it is working smoothly with good taste ,keep your best service at all times like us and every one & fullfill their needs, Thanks a lot sir👍👍👏👏🤝🤝',
      rating: 5
    },
    {
      name: 'Reena A',
      date: 'Verified Buyer',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXUV_MlGPvVw_HLTnEwd8MdSYOZlHD3_4xHcdcRr3aLPPwZfbc=w40-h40-c-rp-mo-br100',
      comment: 'I have purchased ro machine from this store. Best installation service worth to buy it . 100% satisfaction with this product.',
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex(prev => (prev + 1) % reviews.length);
  };

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef6f7] text-[#2d737d] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Customer Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173238] tracking-tight">
            Our Client Testimonial
          </h2>
          <div className="w-16 h-1 bg-[#2d737d] mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-xs sm:text-sm text-slate-500 font-medium">
            Rated 4.9/5 stars based on 500+ genuine Google Reviews across Salem, Coimbatore & Dharmapuri
          </p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#f8fafb] border border-slate-200/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group"
            >
              <div>
                {/* Header with Google Icon and User Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(r.name) + '&background=2d737d&color=fff';
                      }}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#173238] group-hover:text-[#2d737d] transition-colors">
                        {r.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {r.date}
                      </span>
                    </div>
                  </div>

                  {/* Google Icon */}
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100" title="Google Verified Review">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] font-bold text-slate-400 ml-1.5">5.0</span>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-[#405a60] leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              {/* Verified Trustindex Badge Footer */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-[#2d737d] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Google Verified
                </span>
                <span>Trustindex Rating</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
