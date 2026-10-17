import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, ArrowDown, SkipForward } from 'lucide-react';
import { assetUrl } from '../utils/asset';

interface ThreeDVideoScreenProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip?: () => void;
  onPrevScreen?: () => void;
}

export const ThreeDVideoScreen: React.FC<ThreeDVideoScreenProps> = ({
  isActive,
  onComplete,
  onSkip,
  onPrevScreen,
}) => {
  const [count, setCount] = useState(10);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  // Wheel and touch listeners to navigate between screens
  useEffect(() => {
    if (!isActive) return;
    let isLocked = false;
    const handleWheel = (e: WheelEvent) => {
      if (isLocked) return;
      if (e.deltaY > 30) {
        isLocked = true;
        onComplete();
        setTimeout(() => { isLocked = false; }, 800);
      } else if (e.deltaY < -30 && onPrevScreen) {
        isLocked = true;
        onPrevScreen();
        setTimeout(() => { isLocked = false; }, 800);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      if (deltaY > 50 && !isLocked) {
        isLocked = true;
        onComplete();
        setTimeout(() => { isLocked = false; }, 800);
      } else if (deltaY < -50 && !isLocked && onPrevScreen) {
        isLocked = true;
        onPrevScreen();
        setTimeout(() => { isLocked = false; }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isActive, onComplete, onPrevScreen]);

  useEffect(() => {
    if (!isActive) {
      setCount(10);
      completedRef.current = false;
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
      }
      return;
    }

    // When screen becomes active, play video
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }

    setCount(10);
    completedRef.current = false;

    // Run right side countdown: 10, 20, 30 ... 100 in 6 seconds
    const startTime = performance.now();
    const TOTAL_DURATION = 6000; // 6 seconds duration
    const steps = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / TOTAL_DURATION, 1);
      
      const stepIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setCount(steps[stepIndex]);

      if (progress >= 1) {
        setCount(100);
        if (!completedRef.current) {
          completedRef.current = true;
          // After 6 seconds countdown reaches 100, smoothly auto-scroll to the next screen
          setTimeout(() => {
            onComplete();
          }, 350);
        }
        return;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, onComplete, isMuted]);

  const handleVideoEnded = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      setCount(100);
      setTimeout(() => {
        onComplete();
      }, 300);
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      {/* Video covering the screen with seamless white background blend */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          src={assetUrl('/videos/father-and-son.mp4')}
          autoPlay
          muted={isMuted}
          playsInline
          loop
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center"
        >
          <source src={assetUrl('/videos/father-and-son.mp4')} type="video/mp4" />
          <source src={assetUrl('/images/father-and-son.mp4')} type="video/mp4" />
        </video>
      </div>

      {/* Top Bar with Skip & Sound Buttons */}
      <div className="absolute top-6 right-6 sm:right-12 z-30 flex items-center gap-3">
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="p-2.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 backdrop-blur-md border border-slate-200 transition-all cursor-pointer shadow-md active:scale-95"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-slate-700" /> : <Volume2 className="w-5 h-5 text-[#005f73]" />}
        </button>

        {/* Skip to Website Button */}
        {onSkip && (
          <button
            onClick={onSkip}
            className="px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Skip</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Right Side Bold Counter: 10, 20, 30 ... 100 in 6 seconds */}
      <div className="absolute right-8 sm:right-16 md:right-24 bottom-12 sm:bottom-16 z-20 flex flex-col items-end pointer-events-none select-none">
        <div className="flex items-baseline gap-1">
          <span className="font-anton text-7xl sm:text-8xl md:text-9xl text-slate-700 font-black tracking-tight leading-none transition-all duration-300 drop-shadow-sm">
            {count}
          </span>
          <span className="text-sm sm:text-base font-bold text-slate-500 font-trendy">
            %
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold tracking-[0.2em] text-slate-500 uppercase mt-1">
          <span>Loading Experience</span>
        </div>
        {/* Subtle sleek progress bar */}
        <div className="w-28 sm:w-36 h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1.5 shadow-inner">
          <div 
            className="h-full bg-slate-700 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>

      {/* Subtle Auto-scroll indicator at bottom center */}
      <div 
        onClick={onComplete}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm"
      >
        <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center animate-bounce bg-white/60 backdrop-blur-sm">
          <ArrowDown className="w-3 h-3 text-slate-600" />
        </div>
        <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-600">
          Scroll Down
        </span>
      </div>

    </div>
  );
};
