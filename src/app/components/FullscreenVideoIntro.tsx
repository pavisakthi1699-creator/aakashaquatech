import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { assetUrl } from '../utils/asset';

interface FullscreenVideoIntroProps {
  stage: 1 | 2 | 3;
  setStage: (stage: 1 | 2 | 3) => void;
  onEnterSite: () => void;
}

export const FullscreenVideoIntro: React.FC<FullscreenVideoIntroProps> = ({ 
  stage,
  setStage,
  onEnterSite 
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [counter, setCounter] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Check if mobile device on mount (no video intro on mobile)
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setStage(3);
        onEnterSite();
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setStage, onEnterSite]);

  // 8-Second Timing Sequence & Left-Side 1-to-100 Counter
  useEffect(() => {
    // If mobile or already entered main site, skip
    if (window.innerWidth < 768 || stage === 3) return;

    const startTime = performance.now();
    const TOTAL_DURATION = 8000; // 8 seconds total
    const SWITCH_TIME = 2000;    // 2 seconds for first video

    let animationFrameId: number;

    const updateTimer = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / TOTAL_DURATION, 1);
      const currentNumber = Math.max(1, Math.min(100, Math.floor(progress * 100)));
      setCounter(currentNumber);

      // At 2 seconds: automatically switch from Video 1 to Video 2
      if (elapsed >= SWITCH_TIME && stage === 1) {
        setStage(2);
        video1Ref.current?.pause();
        video2Ref.current?.play().catch(() => {});
      }

      // At 8 seconds: automatically complete and go to main website
      if (elapsed >= TOTAL_DURATION) {
        setCounter(100);
        setStage(3);
        video1Ref.current?.pause();
        video2Ref.current?.pause();
        onEnterSite();
        return;
      }

      animationFrameId = requestAnimationFrame(updateTimer);
    };

    animationFrameId = requestAnimationFrame(updateTimer);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stage, setStage, onEnterSite]);

  // Play Video 1 on initial desktop mount
  useEffect(() => {
    if (stage === 1 && video1Ref.current && window.innerWidth >= 768) {
      video1Ref.current.play().catch(() => {});
    }
  }, [stage]);

  // Lock body scroll while intro is playing (desktop only)
  useEffect(() => {
    if (stage < 3 && !isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [stage, isMobile]);

  // Toggle audio
  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isMuted;
    setIsMuted(next);
    if (video1Ref.current) video1Ref.current.muted = next;
    if (video2Ref.current) video2Ref.current.muted = next;
  };

  // Skip directly to website
  const skipToWebsite = () => {
    setStage(3);
    video1Ref.current?.pause();
    video2Ref.current?.pause();
    onEnterSite();
  };

  // If mobile or intro complete, do not render
  if (isMobile || stage === 3) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black z-50 overflow-hidden select-none">
      
      {/* ========================================================================= */}
      {/* 1. LEFT SIDE TIMING: 1 TO 100 COMPLETED WITHIN 8 SECONDS                  */}
      {/* ========================================================================= */}
      <div className="fixed left-8 sm:left-14 bottom-10 sm:bottom-14 z-50 flex flex-col gap-2 pointer-events-none select-none">
        
        {/* Large Clean Number 1 to 100 */}
        <div className="flex items-baseline gap-1 text-white">
          <span className="text-6xl sm:text-8xl font-black tracking-tighter drop-shadow-2xl tabular-nums leading-none">
            {counter}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-cyan-400">
            %
          </span>
        </div>

        {/* Smooth Left Progress Indicator Bar */}
        <div className="w-36 sm:w-48 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-md">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-[#2d737d] rounded-full transition-all duration-75"
            style={{ width: `${counter}%` }}
          />
        </div>

        {/* Minimal Timing Label */}
        <div className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase flex items-center gap-1.5 pt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>{stage === 1 ? 'Pure Technology' : 'Family Living Water'}</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TOP RIGHT: MINIMAL UNMUTE & SKIP BUTTONS (NO HEADER)                      */}
      {/* ========================================================================= */}
      <div className="fixed top-6 right-6 sm:top-8 sm:right-8 z-50 flex items-center gap-3">
        <button
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-300" />
              <span>Unmute</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="text-cyan-300 font-bold">Sound On</span>
            </>
          )}
        </button>

        <button
          onClick={skipToWebsite}
          className="px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md border border-white/30 shadow-xl flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Skip</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SCREEN 1: VIDEO 1 (OPENING PURIFIER ANIMATIVE VIDEO - 2 SECONDS)          */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full bg-black will-change-transform transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: stage === 1 ? 'translateY(0%)' : 'translateY(-100%)',
          opacity: stage === 1 ? 1 : 0,
          pointerEvents: stage === 1 ? 'auto' : 'none'
        }}
      >
        <video
          ref={video1Ref}
          autoPlay
          muted={isMuted}
          playsInline
          loop
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src={assetUrl('/videos/opening-purifier.mp4')} type="video/mp4" />
        </video>
      </div>

      {/* ========================================================================= */}
      {/* SCREEN 2: VIDEO 2 (FATHER & SON VIDEO - 6 SECONDS, COMPLETES AT 8S)       */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 w-full h-full bg-black will-change-transform transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: stage === 2 ? 'translateY(0%)' : stage === 1 ? 'translateY(100%)' : 'translateY(-100%)',
          opacity: stage === 2 ? 1 : 0,
          pointerEvents: stage === 2 ? 'auto' : 'none'
        }}
      >
        <video
          ref={video2Ref}
          muted={isMuted}
          playsInline
          loop
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src={assetUrl('/videos/father-and-son.mp4')} type="video/mp4" />
        </video>
      </div>

    </div>
  );
};
