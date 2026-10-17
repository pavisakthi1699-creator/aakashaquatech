import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Heart, Sparkles, Droplets, Volume2, VolumeX, Play, Pause, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { notifyVideoPlaying, subscribeToVideoChange } from '../services/videoCoordinator';
import { assetUrl } from '../utils/asset';

interface FamilyWaterVideoSectionProps {
  onOpenQuote: () => void;
  onExploreProducts: () => void;
}

export const FamilyWaterVideoSection: React.FC<FamilyWaterVideoSectionProps> = ({
  onOpenQuote,
  onExploreProducts
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStartedOnce(true);
        notifyVideoPlaying('family');
      }).catch(() => {
        // browser autoplay policy or user interaction needed
      });
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      handlePlay();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  // Subscribe to coordinator: pause if hero video plays
  useEffect(() => {
    const unsubscribe = subscribeToVideoChange('family', () => {
      handlePause();
    });
    return unsubscribe;
  }, []);

  // IntersectionObserver: when scrolled into view, play family video (and notify hero to pause)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.35) {
            // Section is in view: play this video and pause the opening hero video
            handlePlay();
          } else if (entry.intersectionRatio < 0.15) {
            // Scrolled out of view: pause
            handlePause();
          }
        });
      },
      { threshold: [0.15, 0.35, 0.6] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="family-pure-living"
      className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-[#0a1e24] to-slate-950 text-white overflow-hidden"
    >
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[400px] h-[300px] bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold mb-4 shadow-lg backdrop-blur-md">
            <Droplets className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span>Family Health & Pure Living Hydration</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-emerald-300 text-xs font-bold">Watch Story</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Pure Water For The Ones <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
              You Love Most
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Every sip matters. Aakash Aqua Tech’s certified multi-stage mineral purification protects your child’s growth, nurtures family health, and delivers refreshing, alkaline pure water straight from the tap.
          </p>
        </div>

        {/* Two-Column Grid: Left Story Details & Right Cinematic Video Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Key Health & Purity Advantages (5 cols) */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl backdrop-blur-sm group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      100% Contaminant-Free Pure Water
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      Removes 99.9% dissolved impurities, micro-plastics, pesticide residues, and harmful pathogens for safe child drinking.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl backdrop-blur-sm group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-500/40 text-teal-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                      Essential Natural Mineral Fortification
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      Replenishes active Calcium, Magnesium, and Potassium to promote bone density, healthy hydration, and great taste.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-xl backdrop-blur-sm group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Optimal Alkaline pH Balance (7.5 - 8.5)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      Neutralizes body acidity, improves metabolism, and boosts the immune system of both young children and elders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-[#2d737d] hover:from-cyan-500 hover:to-[#225c64] text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-950/60 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <span>Book Free Water Quality Test</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreProducts}
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 hover:border-cyan-500/50 transition-all hover:scale-105 active:scale-95"
              >
                <span>View Home Purifiers</span>
              </button>
            </div>
          </div>

          {/* Right Column: Theater Video Frame (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-950/80 bg-black group">
              
              {/* Aspect Ratio 16:9 Video Player */}
              <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  muted={isMuted}
                  playsInline
                  loop
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => {
                    setIsPlaying(true);
                    notifyVideoPlaying('family');
                  }}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover object-center"
                >
                  <source src={assetUrl('/videos/father-and-son.mp4')} type="video/mp4" />
                </video>

                {/* Top Overlay Badge & Sound Controls */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 text-white text-xs font-semibold shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>Father & Son Hydration Moment</span>
                  </div>

                  <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                      onClick={toggleMute}
                      title={isMuted ? 'Click to enable audio' : 'Mute audio'}
                      className="px-3 py-1.5 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md border border-cyan-400/40 shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-slate-300" />
                          <span className="text-[11px]">Unmute</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                          <span className="text-[11px] text-cyan-300 font-bold">Sound On</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleReplay}
                      title="Replay video"
                      className="w-8 h-8 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg transition-transform hover:scale-105"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  </div>
                </div>

                {/* Big Center Play/Pause Overlay Button */}
                <div 
                  onClick={togglePlay}
                  className={`absolute inset-0 z-10 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
                    isPlaying ? 'opacity-0 group-hover:opacity-100 bg-black/20' : 'opacity-100 bg-black/40'
                  }`}
                >
                  <button
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-600 to-teal-400 text-white flex items-center justify-center shadow-2xl shadow-cyan-500/50 border-2 border-white/30 transition-transform hover:scale-110 active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />
                    ) : (
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Bottom Timeline Scrubber */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/60 z-20 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Video Footer Caption */}
              <div className="p-4 sm:p-5 bg-slate-900/95 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certified 100% Food-Grade Water Contact Materials</span>
                </div>
                <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Playback Active • Smooth Scroll Sync</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
