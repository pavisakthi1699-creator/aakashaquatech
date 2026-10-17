import React, { useEffect, useState, useRef } from 'react';

export const WaterCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isHoveredRef = useRef(false);
  const followerPos = useRef({ x: -100, y: -100 });
  const mousePos = useRef({ x: -100, y: -100 });
  const followerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTrailPos = useRef({ x: -100, y: -100, time: 0 });

  useEffect(() => {
    // Only disable if device is purely touch with no hover capability
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const spawnDroplet = (x: number, y: number) => {
      const container = containerRef.current;
      if (!container) return;
      if (container.children.length > 8) {
        container.firstElementChild?.remove();
      }
      const size = Math.random() * 5 + 4;
      const drop = document.createElement('div');
      drop.className =
        'absolute rounded-full bg-cyan-300/70 blur-[0.4px] border border-white/90 pointer-events-none animate-water-droplet-fade';
      drop.style.left = `${x + (Math.random() * 8 - 4)}px`;
      drop.style.top = `${y + (Math.random() * 8 - 4)}px`;
      drop.style.width = `${size}px`;
      drop.style.height = `${size}px`;
      drop.style.transform = 'translate(-50%, -50%)';
      container.appendChild(drop);
      drop.addEventListener('animationend', () => drop.remove(), { once: true });
    };

    const spawnRipple = (x: number, y: number) => {
      const container = containerRef.current;
      if (!container) return;
      if (container.children.length > 10) {
        container.firstElementChild?.remove();
      }
      const rip = document.createElement('div');
      rip.className =
        'absolute rounded-full border-2 border-cyan-400 pointer-events-none animate-water-ripple-expand shadow-[0_0_15px_rgba(6,182,212,0.4)]';
      rip.style.left = `${x}px`;
      rip.style.top = `${y}px`;
      rip.style.transform = 'translate(-50%, -50%)';
      container.appendChild(rip);
      rip.addEventListener('animationend', () => rip.remove(), { once: true });
    };

    const onMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      mousePos.current.x = clientX;
      mousePos.current.y = clientY;

      // Update inner pinpoint droplet with ZERO latency (hardware 1:1)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0px) translate(-50%, -50%)`;
      }

      if (!isVisible) setIsVisible(true);

      // Lightweight droplet trail: spawn only when moving and throttled, directly via DOM (no React re-render)
      const now = performance.now();
      const dx = clientX - lastTrailPos.current.x;
      const dy = clientY - lastTrailPos.current.y;
      const dist = dx * dx + dy * dy;

      if (dist > 300 && now - lastTrailPos.current.time > 45) {
        lastTrailPos.current = { x: clientX, y: clientY, time: now };
        spawnDroplet(clientX, clientY);
      }

      // Fast check for interactive elements WITHOUT triggering costly getComputedStyle reflow
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest(
            'button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-interactive="true"]'
          )
        );
        if (interactive !== isHoveredRef.current) {
          isHoveredRef.current = interactive;
          setIsHovered(interactive);
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      spawnRipple(e.clientX, e.clientY);
    };

    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Snappy liquid bubble follower loop with 0.45 responsiveness
    let animationFrameId: number;
    const updateFollower = () => {
      const ease = 0.45; // Fast, snappy tracking while keeping liquid smoothness
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0px) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(updateFollower);
    };
    animationFrameId = requestAnimationFrame(updateFollower);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
      {/* 1. DOM particle container for trails and ripples (zero React re-renders) */}
      <div ref={containerRef} className="absolute inset-0 pointer-events-none" />

      {/* 2. Responsive Floating Liquid Bubble / Outer Ring */}
      <div
        ref={followerRef}
        className={`absolute top-0 left-0 rounded-full transition-all duration-200 ease-out flex items-center justify-center pointer-events-none ${
          isHovered
            ? 'w-14 h-14 bg-cyan-400/25 border-2 border-cyan-300 shadow-[0_0_24px_rgba(6,182,212,0.65)] backdrop-blur-[1px] scale-110'
            : isMouseDown
            ? 'w-7 h-7 bg-cyan-500/40 border border-cyan-200 scale-90'
            : 'w-10 h-10 bg-cyan-400/15 border border-cyan-400/70 shadow-[0_0_14px_rgba(6,182,212,0.35)] backdrop-blur-[0.5px]'
        }`}
      >
        {/* Subtle internal water refraction highlight */}
        <span className="w-2 h-1 rounded-full bg-white/80 absolute top-1.5 left-2 rotate-[-30deg]" />
      </div>

      {/* 3. Sharp Inner Water Droplet Pointer (Instant 0-Lag Follower) */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 rounded-full pointer-events-none transition-transform duration-75 ease-out shadow-sm ${
          isHovered
            ? 'w-3.5 h-3.5 bg-white border border-cyan-500 shadow-[0_0_10px_rgba(255,255,255,0.9)] scale-125'
            : isMouseDown
            ? 'w-2 h-2 bg-[#005f73] scale-75'
            : 'w-2.5 h-2.5 bg-gradient-to-tr from-[#005f73] to-[#00a4ba] border border-white/90 shadow-[0_0_6px_rgba(0,95,115,0.4)]'
        }`}
      />
    </div>
  );
};
