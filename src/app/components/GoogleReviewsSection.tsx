import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ThumbsUp
} from 'lucide-react';

interface GoogleReview {
  id: string;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
  branch: string;
  productTag: string;
  likes: number;
}

export const GoogleReviewsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initialReviews: GoogleReview[] = [
    {
      id: 'r1',
      name: 'Logu Logu',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLmJVtb-3OcThSlWVZNKyLrOu18593qe4IX3aTZvyWD42_tbQ=w120-h120-c-rp-mo-br100',
      date: '10 months ago',
      rating: 5,
      comment: 'Nice service by a team. Quick response and clean installation of commercial RO plant.',
      branch: 'Salem Branch',
      productTag: 'Commercial RO Plant',
      likes: 14
    },
    {
      id: 'r2',
      name: 'Sathish Khumar',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjUEU-Zc86FU8-tomW71s1P3E8hJuUz_pAVtdajrMn5EthMR1J5s=w120-h120-c-rp-mo-br100',
      date: '10 months ago',
      rating: 5,
      comment: 'Very knowledgeable and far better than brands. Best part is very transparent and addressed my requirement by Mr.Kannan. Most brands didn’t do it and tried to convince me for their incentives. Thanks for the customisation.',
      branch: 'Coimbatore Branch',
      productTag: 'Custom RO Purifier',
      likes: 23
    },
    {
      id: 'r3',
      name: 'Sathish Kumar',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVVqWpN0AOFtxp5DPzLAuW8ZzT1pFnmCGXPlHuyPlTUe2c95RI=w120-h120-c-rp-mo-br100',
      date: '10 months ago',
      rating: 5,
      comment: 'I bought RO from this company. Excellent quality at reasonable price. customer service is also very good.',
      branch: 'Dharmapuri Branch',
      productTag: 'Domestic RO Purifier',
      likes: 9
    },
    {
      id: 'r4',
      name: 'Muthu Gopal',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJnA5L1sfp2uZfpkF36Tpqx628pBSjytWo-N53alCV2-OGH-g=w120-h120-c-rp-mo-br100',
      date: '11 months ago',
      rating: 5,
      comment: 'Delicious water taste after installation. Excellent service team and polite behavior.',
      branch: 'Salem HQ',
      productTag: 'Mineral RO + Copper',
      likes: 18
    },
    {
      id: 'r5',
      name: 'annamalai mani',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKBwnGJVwgCEJnpTMB7qpKi079kobuPOijuNXS7X2mWD6fICg=w120-h120-c-rp-mo-br100',
      date: '1 year ago',
      rating: 5,
      comment: '🙏🏿🙏🏿👍👍We are very much satisfied for our repaired ro unit, now it is working smoothly with good taste ,keep your best service at all times like us and every one & fullfill their needs, Thanks a lot sir👍👍👏👏🤝🤝',
      branch: 'Salem Branch',
      productTag: 'RO Service & AMC',
      likes: 29
    },
    {
      id: 'r6',
      name: 'Reena A',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXUV_MlGPvVw_HLTnEwd8MdSYOZlHD3_4xHcdcRr3aLPPwZfbc=w120-h120-c-rp-mo-br100',
      date: '1 year ago',
      rating: 5,
      comment: 'I have purchased ro machine from this store. Best installation service worth to buy it . 100% satisfaction with this product.',
      branch: 'Coimbatore Branch',
      productTag: 'Multi-Brand RO',
      likes: 16
    },
    {
      id: 'r7',
      name: 'Karthik Raja',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      date: '8 months ago',
      rating: 5,
      comment: 'Prompt water testing and genuine guidance. Installed Enviro water structuring device for our hard water issue. Scale formation completely stopped in our solar water heater!',
      branch: 'Salem Branch',
      productTag: 'Enviro Structuring Device',
      likes: 21
    },
    {
      id: 'r8',
      name: 'Praveen Sundaram',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      date: '9 months ago',
      rating: 5,
      comment: 'Best dealer in South India for water purifiers. We purchased 3 commercial SS dispensers for our college campus. Robust build and fast chilling.',
      branch: 'Coimbatore Branch',
      productTag: 'SS Water Dispenser',
      likes: 25
    }
  ];

  const [reviewsList, setReviewsList] = useState<GoogleReview[]>(initialReviews);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const cardsPerPage = 3;
  const totalPages = Math.ceil(reviewsList.length / cardsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handleToggleLike = (id: string) => {
    setLikedMap((prev) => {
      const alreadyLiked = !!prev[id];
      setReviewsList((curr) =>
        curr.map((r) => (r.id === id ? { ...r, likes: r.likes + (alreadyLiked ? -1 : 1) } : r))
      );
      return { ...prev, [id]: !alreadyLiked };
    });
  };

  const visibleReviews = reviewsList.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  return (
    <section 
      ref={sectionRef}
      id="google-reviews" 
      className="snap-screen relative w-full min-h-[100dvh] flex flex-col justify-center items-center pt-[115px] sm:pt-[130px] pb-14 sm:pb-18 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#edf6f9] via-white to-[#edf6f9] border-t border-[#cfe5eb] overflow-hidden select-none font-trendy"
    >
      {/* Background Ambient Lighting & Aqua Grids */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/10 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-gradient-to-br from-cyan-100/60 via-teal-50/30 to-transparent blur-3xl opacity-80" />
        <div className="absolute -bottom-20 right-1/10 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-tr from-cyan-50/70 via-blue-50/30 to-transparent blur-3xl opacity-75" />
        <div className="absolute inset-0 bg-[radial-gradient(#005f73_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.035]" />
      </div>

      <div className="max-w-[1360px] w-full mx-auto relative z-10 flex flex-col justify-center">
        
        {/* Section Heading: Exact "Our Client Testimonial" */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 
            className={`text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-tight transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Our Client{' '}
            <span className="bg-gradient-to-r from-[#002f43] via-[#005f73] to-[#0a9396] bg-clip-text text-transparent">
              Testimonial
            </span>
          </h2>
          <div 
            className={`w-20 h-1 bg-gradient-to-r from-[#002f43] via-[#005f73] to-[#0a9396] mx-auto mt-3 rounded-full transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          />
          
          <p 
            className={`mt-3.5 text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '280ms' }}
          >
            Real experiences from thousands of satisfied families and top industries across Salem, Coimbatore & Dharmapuri.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CARDS DISPLAY WITH CAROUSEL CONTROLS & SMOOTH ANIMATION                   */}
        {/* ========================================================================= */}
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 min-h-[300px]">
            {visibleReviews.map((review, idx) => {
              const baseDelay = 350 + idx * 160;

              return (
                <div
                  key={review.id}
                  className={`rounded-[26px] bg-white border border-[#cfe5eb] p-6 sm:p-7 flex flex-col justify-between shadow-lg shadow-[#005f73]/5 hover:shadow-2xl hover:shadow-[#005f73]/15 transition-all duration-700 hover:-translate-y-1.5 relative group ${
                    isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: `${baseDelay}ms` }}
                >
                  <div>
                    {/* Header: User Avatar + Name + Google Logo */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        {/* User Avatar with Initials Fallback */}
                        <div 
                          className={`relative transition-all duration-600 ease-out ${
                            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                          }`}
                          style={{ transitionDelay: `${baseDelay + 50}ms` }}
                        >
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-[#005f73]/20"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=005f73&color=fff&bold=true`;
                            }}
                          />
                          {/* Green Verified Dot */}
                          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Verified Customer" />
                        </div>

                        <div>
                          <h4 
                            className={`text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#005f73] transition-all duration-600 ease-out leading-tight ${
                              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                            }`}
                            style={{ transitionDelay: `${baseDelay + 100}ms` }}
                          >
                            {review.name}
                          </h4>
                          <div 
                            className={`flex items-center gap-1.5 mt-0.5 transition-all duration-600 ease-out ${
                              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                            }`}
                            style={{ transitionDelay: `${baseDelay + 140}ms` }}
                          >
                            <span className="text-[11px] font-semibold text-slate-400">
                              {review.date}
                            </span>
                            <span className="text-[9.5px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                              {review.branch}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Official Google Round Badge */}
                      <div 
                        className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs border border-slate-200 shrink-0 group-hover:scale-105 transition-all duration-600 ${
                          isInView ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-12'
                        }`}
                        style={{ transitionDelay: `${baseDelay + 120}ms` }}
                        title="Google Verified Review"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                      </div>
                    </div>

                    {/* Stars Row */}
                    <div 
                      className={`flex items-center gap-1.5 mb-3 transition-all duration-600 ease-out ${
                        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}
                      style={{ transitionDelay: `${baseDelay + 180}ms` }}
                    >
                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10.5px] font-extrabold text-[#005f73] bg-[#edf6f9] px-2 py-0.5 rounded-full">
                        5.0 Star Verified
                      </span>
                    </div>

                    {/* Review Text */}
                    <p 
                      className={`text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-normal text-justify line-clamp-4 transition-all duration-700 ease-out ${
                        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: `${baseDelay + 240}ms` }}
                    >
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Card Footer: Verified Trust Chip, Product Category & Interactive Like */}
                  <div 
                    className={`mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs transition-all duration-700 ease-out ${
                      isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    }`}
                    style={{ transitionDelay: `${baseDelay + 300}ms` }}
                  >
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#005f73]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified
                    </span>

                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md truncate max-w-[130px]">
                      {review.productTag}
                    </span>

                    {/* Interactive Thumbs Up */}
                    <button
                      onClick={() => handleToggleLike(review.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer ${
                        likedMap[review.id]
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-slate-200'
                      }`}
                      title="Helpful review"
                    >
                      <ThumbsUp className={`w-3 h-3 ${likedMap[review.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{review.likes}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Control Bar: Indicators & Navigation Arrows at Below Right Corner */}
          {totalPages > 1 && (
            <div 
              className={`flex items-center justify-between mt-6 sm:mt-8 transition-all duration-700 ease-out ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '850ms' }}
            >
              {/* Pagination Indicators */}
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentPage === i
                        ? 'w-8 bg-[#005f73]'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows on Below Right Corner */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevPage}
                  aria-label="Previous reviews"
                  className="w-11 h-11 rounded-full bg-white border border-[#cfe5eb] text-slate-700 hover:text-[#005f73] hover:border-[#005f73] hover:bg-slate-50 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPage}
                  aria-label="Next reviews"
                  className="w-11 h-11 rounded-full bg-[#005f73] text-white hover:bg-[#004e5a] shadow-md shadow-[#005f73]/25 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
