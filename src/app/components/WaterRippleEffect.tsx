import React, { useEffect, useRef } from 'react';

interface WaterRippleEffectProps {
  className?: string;
  dropRadius?: number;
  perturbance?: number;
  damping?: number;
}

export const WaterRippleEffect: React.FC<WaterRippleEffectProps> = ({
  className = '',
  dropRadius = 32,
  perturbance = 0.065,
  damping = 0.976,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Simulation grid dimensions: 128x128 gives 4x faster compute and 2x faster wave propagation
    const SIM_W = 128;
    const SIM_H = 128;
    const TOTAL_CELLS = SIM_W * SIM_H;

    const updateCanvasDimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };
    updateCanvasDimensions();

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext('webgl', { alpha: true, antialias: false, depth: false }) ||
        canvas.getContext('experimental-webgl', { alpha: true, antialias: false, depth: false })) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }

    if (gl) {
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    let animationFrameId: number;
    let isVisibleOnScreen = true;
    let activeEnergy = 1.0; // Keeps simulation running while waves exist

    // Buffers for 2D wave equation simulation
    let buffer1 = new Float32Array(TOTAL_CELLS);
    let buffer2 = new Float32Array(TOTAL_CELLS);

    // Fast drop adder with pre-squared distance
    const addDrop = (normX: number, normY: number, radius: number, strength: number) => {
      const cx = Math.floor(normX * SIM_W);
      const cy = Math.floor(normY * SIM_H);
      const r = Math.max(2, Math.floor(radius));
      const rSq = r * r;

      const minX = Math.max(1, cx - r);
      const maxX = Math.min(SIM_W - 2, cx + r);
      const minY = Math.max(1, cy - r);
      const maxY = Math.min(SIM_H - 2, cy + r);

      for (let y = minY; y <= maxY; y++) {
        const dy = y - cy;
        const dySq = dy * dy;
        const row = y * SIM_W;
        for (let x = minX; x <= maxX; x++) {
          const dx = x - cx;
          const distSq = dx * dx + dySq;
          if (distSq < rSq) {
            const dist = Math.sqrt(distSq);
            const factor = Math.cos((dist / r) * Math.PI * 0.5);
            buffer1[row + x] += factor * strength;
          }
        }
      }
      activeEnergy = 1.0; // Wake up simulation immediately
    };

    // Auto-resize handler
    const handleResize = () => {
      if (!canvas) return;
      updateCanvasDimensions();
      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener('resize', handleResize);

    // Mouse / Touch interaction (scoped to hero viewport)
    let lastX = -1;
    let lastY = -1;
    let lastTime = 0;

    const onPointerMove = (clientX: number, clientY: number) => {
      // Only process when visible on screen and within hero bounds
      if (!isVisibleOnScreen || clientY > window.innerHeight + 50) return;

      const normX = Math.max(0.001, Math.min(0.999, clientX / window.innerWidth));
      const normY = Math.max(0.001, Math.min(0.999, clientY / window.innerHeight));

      const now = performance.now();
      if (lastX >= 0 && lastY >= 0) {
        const dx = (normX - lastX) * window.innerWidth;
        const dy = (normY - lastY) * window.innerHeight;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Fast responsive ripple trigger (responsive 16ms cadence)
        if (dist > 4 && now - lastTime > 16) {
          lastTime = now;
          const strength = Math.min(0.55, 0.18 + dist * 0.006);
          const dynamicRadius = Math.max(3, Math.min(7, (dropRadius / 1200) * SIM_W));
          addDrop(normX, normY, dynamicRadius, strength);
        }
      } else {
        addDrop(normX, normY, 4, 0.32);
      }

      lastX = normX;
      lastY = normY;
    };

    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleClick = (e: MouseEvent) => {
      if (!isVisibleOnScreen || e.clientY > window.innerHeight) return;
      const normX = Math.max(0.001, Math.min(0.999, e.clientX / window.innerWidth));
      const normY = Math.max(0.001, Math.min(0.999, e.clientY / window.innerHeight));
      addDrop(normX, normY, 6, 0.72);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    // Periodic gentle ambient droplets during active viewing
    const ambientInterval = setInterval(() => {
      if (document.hidden || !isVisibleOnScreen) return;
      const rx = 0.15 + Math.random() * 0.7;
      const ry = 0.2 + Math.random() * 0.6;
      const radius = 3.5 + Math.random() * 2.5;
      const strength = 0.28 + Math.random() * 0.18;
      addDrop(rx, ry, radius, strength);
    }, 1400);

    // Initial welcoming drops
    setTimeout(() => addDrop(0.3, 0.45, 5, 0.38), 200);
    setTimeout(() => addDrop(0.7, 0.52, 5, 0.4), 600);

    // -------------------------------------------------------------
    // WEBGL RIPPLE PIPELINE
    // -------------------------------------------------------------
    if (gl) {
      const createShader = (type: number, src: string): WebGLShader | null => {
        if (!gl) return null;
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.warn('Shader compile failed:', gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vsSource = `
        attribute vec2 a_position;
        varying vec2 v_uv;
        void main() {
          v_uv = (a_position + 1.0) * 0.5;
          v_uv.y = 1.0 - v_uv.y;
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const fsSource = `
        precision highp float;
        varying vec2 v_uv;
        uniform sampler2D u_heightmap;
        uniform vec2 u_resolution;
        uniform float u_perturbance;
        uniform float u_time;

        vec4 getStudioBg(vec2 uv) {
          vec3 leftColor  = vec3(0.306, 0.796, 0.761);
          vec3 midColor   = vec3(0.572, 0.890, 0.710);
          vec3 rightColor = vec3(0.525, 0.847, 0.518);

          float t = clamp(uv.x, 0.0, 1.0);
          vec3 baseBg;
          if (t < 0.5) {
            baseBg = mix(leftColor, midColor, t * 2.0);
          } else {
            baseBg = mix(midColor, rightColor, (t - 0.5) * 2.0);
          }

          float glow = smoothstep(0.85, 0.0, distance(uv, vec2(0.5, 0.3))) * 0.08;
          baseBg += vec3(glow * 0.5, glow * 0.7, glow * 0.6);
          return vec4(baseBg, 1.0);
        }

        void main() {
          vec2 step = 1.0 / u_resolution;

          float left   = texture2D(u_heightmap, v_uv - vec2(step.x, 0.0)).r;
          float right  = texture2D(u_heightmap, v_uv + vec2(step.x, 0.0)).r;
          float top    = texture2D(u_heightmap, v_uv - vec2(0.0, step.y)).r;
          float bottom = texture2D(u_heightmap, v_uv + vec2(0.0, step.y)).r;

          vec2 normal = vec2(right - left, bottom - top);

          // Living subtle water shimmer
          float drift1 = sin(v_uv.x * 6.5 + u_time * 1.5 + v_uv.y * 4.5) * 0.0016;
          float drift2 = cos(v_uv.y * 7.5 - u_time * 1.2 + v_uv.x * 5.0) * 0.0016;
          float drift3 = sin((v_uv.x + v_uv.y) * 8.0 + u_time * 1.0) * 0.0012;
          vec2 activeUndulation = vec2(drift1 + drift3, drift2 + drift3);

          vec2 combinedNormal = normal + activeUndulation;
          vec2 refractedUv = clamp(v_uv + combinedNormal * u_perturbance, 0.0, 1.0);

          vec4 color = getStudioBg(refractedUv);

          // Specular wave crest lighting
          vec3 lightDir = normalize(vec3(-0.3, -0.6, 0.7));
          vec3 surfaceNormal = normalize(vec3(combinedNormal.x * 3.5, combinedNormal.y * 3.5, 1.0));
          float specular = pow(max(0.0, dot(surfaceNormal, lightDir)), 32.0);

          color.rgb += vec3(1.0, 1.0, 1.0) * specular * 0.85;

          float waveShade = clamp(-combinedNormal.y * 1.5, 0.0, 0.18);
          color.rgb -= vec3(waveShade * 0.35, waveShade * 0.25, waveShade * 0.15);

          gl_FragColor = color;
        }
      `;

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);

      if (vs && fs) {
        const program = gl.createProgram();
        if (program) {
          gl.attachShader(program, vs);
          gl.attachShader(program, fs);
          gl.linkProgram(program);

          if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.useProgram(program);

            const posBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array([
                -1.0, -1.0,
                 1.0, -1.0,
                -1.0,  1.0,
                -1.0,  1.0,
                 1.0, -1.0,
                 1.0,  1.0,
              ]),
              gl.STATIC_DRAW
            );

            const posLoc = gl.getAttribLocation(program, 'a_position');
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

            const heightTex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, heightTex);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            const byteBuffer = new Uint8Array(TOTAL_CELLS);

            const uHeightmapLoc = gl.getUniformLocation(program, 'u_heightmap');
            const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
            const uPerturbanceLoc = gl.getUniformLocation(program, 'u_perturbance');
            const uTimeLoc = gl.getUniformLocation(program, 'u_time');

            gl.uniform1i(uHeightmapLoc, 0);
            gl.uniform2f(uResolutionLoc, SIM_W, SIM_H);
            gl.uniform1f(uPerturbanceLoc, perturbance);

            const startTime = performance.now();

            // High performance animation loop
            const stepSimulation = () => {
              let totalDelta = 0;
              // Solve 2D wave equation
              for (let y = 1; y < SIM_H - 1; y++) {
                const row = y * SIM_W;
                const rowUp = (y - 1) * SIM_W;
                const rowDown = (y + 1) * SIM_W;

                for (let x = 1; x < SIM_W - 1; x++) {
                  const wave =
                    (buffer1[row + (x - 1)] +
                      buffer1[row + (x + 1)] +
                      buffer1[rowUp + x] +
                      buffer1[rowDown + x]) *
                      0.5 -
                    buffer2[row + x];
                  const nextVal = wave * damping;
                  buffer2[row + x] = nextVal;
                  totalDelta += Math.abs(nextVal);
                }
              }

              // Swap buffers
              const temp = buffer1;
              buffer1 = buffer2;
              buffer2 = temp;

              activeEnergy = totalDelta > 0.05 ? 1.0 : activeEnergy * 0.95;

              // Convert float to byte
              for (let i = 0; i < TOTAL_CELLS; i++) {
                const val = (buffer1[i] + 0.5) * 255;
                byteBuffer[i] = val < 0 ? 0 : val > 255 ? 255 : val;
              }

              gl!.bindTexture(gl!.TEXTURE_2D, heightTex);
              gl!.texImage2D(
                gl!.TEXTURE_2D,
                0,
                gl!.LUMINANCE,
                SIM_W,
                SIM_H,
                0,
                gl!.LUMINANCE,
                gl!.UNSIGNED_BYTE,
                byteBuffer
              );
            };

            const render = () => {
              if (!isVisibleOnScreen) {
                // If off-screen, wait without executing WebGL or CPU math
                animationFrameId = requestAnimationFrame(render);
                return;
              }

              const elapsed = (performance.now() - startTime) * 0.001;
              if (uTimeLoc) gl!.uniform1f(uTimeLoc, elapsed);

              // 1. Solve Wave Equation (two sub-steps for fast, fluid propagation)
              if (activeEnergy > 0.01) {
                stepSimulation();
                stepSimulation();
              }

              // Maintain viewport & draw
              gl!.viewport(0, 0, canvas.width, canvas.height);
              gl!.drawArrays(gl!.TRIANGLES, 0, 6);

              animationFrameId = requestAnimationFrame(render);
            };

            render();

            // IntersectionObserver: pauses simulation completely when scrolled away from hero
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  isVisibleOnScreen = entry.isIntersecting;
                });
              },
              { threshold: 0.05 }
            );
            observer.observe(canvas);

            return () => {
              observer.disconnect();
              cancelAnimationFrame(animationFrameId);
              clearInterval(ambientInterval);
              window.removeEventListener('resize', handleResize);
              window.removeEventListener('mousemove', handleMouseMove);
              window.removeEventListener('touchmove', handleTouchMove);
              window.removeEventListener('click', handleClick);
            };
          }
        }
      }
    }

    return () => {
      clearInterval(ambientInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
    };
  }, [dropRadius, perturbance, damping]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
      }}
      className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`}
    />
  );
};
