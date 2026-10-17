import React, { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  baseX: number;
  speedY: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobbleOffset: number;
  opacity: number;
  depth: number; // 0 (far/small) to 1 (near/large)
}

export const AnimatedWaterBubbles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for gentle bubble displacement
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize bubble particles
    const bubbleCount = Math.min(Math.floor(width / 22), 65);
    const bubbles: Bubble[] = [];

    const createBubble = (initialY?: number): Bubble => {
      const depth = Math.random(); // 0 to 1
      const radius = 3 + depth * 14 + Math.random() * 4; // 3px to 21px
      const x = Math.random() * width;
      return {
        x,
        baseX: x,
        y: initialY !== undefined ? initialY : Math.random() * height,
        radius,
        speedY: 0.7 + depth * 1.8 + Math.random() * 0.5,
        wobbleSpeed: 0.015 + Math.random() * 0.03,
        wobbleAmp: 12 + depth * 24,
        wobbleOffset: Math.random() * Math.PI * 2,
        opacity: 0.25 + depth * 0.6,
        depth,
      };
    };

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(createBubble());
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render each bubble with crystal 3D liquid sphere highlights
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];

        // Move upward
        b.y -= b.speedY;

        // Sine wobble
        b.x = b.baseX + Math.sin(time * b.wobbleSpeed * 60 + b.wobbleOffset) * b.wobbleAmp;

        // Gentle mouse interaction (bubbles float away from cursor)
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
          const force = (130 - dist) / 130;
          b.x += (dx / dist) * force * 3.5;
          b.baseX += (dx / dist) * force * 1.8;
        }

        // Reset bubble when reaching the top
        if (b.y < -b.radius * 2) {
          bubbles[i] = createBubble(height + b.radius + Math.random() * 40);
          continue;
        }

        // Draw bubble body matching banner color palette at bubble's x position
        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);

        // Determine banner color based on horizontal screen position
        const t = Math.max(0, Math.min(1, b.x / width));
        // Banner tint: Left is Aqua (78, 203, 194), Right is Fresh Green (134, 216, 132)
        const bubbleR = Math.round(78 + (134 - 78) * t);
        const bubbleG = Math.round(203 + (216 - 203) * t);
        const bubbleB = Math.round(194 + (132 - 194) * t);

        // Radial gradient for 3D sphere volume tinted with banner color
        const radGrad = ctx.createRadialGradient(
          b.x - b.radius * 0.35,
          b.y - b.radius * 0.35,
          b.radius * 0.1,
          b.x,
          b.y,
          b.radius
        );
        radGrad.addColorStop(0, `rgba(255, 255, 255, ${0.5 * b.opacity})`);
        radGrad.addColorStop(0.4, `rgba(${bubbleR}, ${bubbleG}, ${bubbleB}, ${0.28 * b.opacity})`);
        radGrad.addColorStop(0.8, `rgba(${Math.round(bubbleR * 0.65)}, ${Math.round(bubbleG * 0.75)}, ${Math.round(bubbleB * 0.7)}, ${0.35 * b.opacity})`);
        radGrad.addColorStop(1, `rgba(${bubbleR}, ${bubbleG}, ${bubbleB}, ${0.55 * b.opacity})`);

        ctx.fillStyle = radGrad;
        ctx.fill();

        // Crisp bubble outer rim matching banner color
        ctx.lineWidth = Math.max(1, b.radius * 0.08);
        ctx.strokeStyle = `rgba(${bubbleR}, ${bubbleG}, ${bubbleB}, ${0.75 * b.opacity})`;
        ctx.stroke();

        // Specular highlight crescent at top-left
        ctx.beginPath();
        ctx.arc(
          b.x - b.radius * 0.36,
          b.y - b.radius * 0.36,
          b.radius * 0.32,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${0.7 * b.opacity})`;
        ctx.fill();

        // Secondary subtle inner reflection at bottom-right
        ctx.beginPath();
        ctx.arc(
          b.x + b.radius * 0.28,
          b.y + b.radius * 0.28,
          b.radius * 0.18,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(${bubbleR}, ${bubbleG}, ${bubbleB}, ${0.35 * b.opacity})`;
        ctx.fill();

        ctx.restore();
      }

      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    let isVisible = true;
    render();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (!wasVisible && isVisible) {
            animationFrameId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};
