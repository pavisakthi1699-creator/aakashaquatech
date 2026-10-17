import React from 'react';

interface TornPaperEdgeProps {
  position?: 'bottom' | 'top';
  color?: string;
  shadowColor?: string;
}

export const TornPaperEdge: React.FC<TornPaperEdgeProps> = ({
  position = 'bottom',
  color = '#ffffff',
  shadowColor = 'rgba(0, 0, 0, 0.45)',
}) => {
  // A realistic, high-detail jagged torn paper path
  const tearPath =
    'M0,0 L0,32 L14,39 L26,27 L38,44 L52,31 L66,41 L80,28 L94,38 L108,24 L122,36 L136,26 L150,42 L164,30 L178,39 L192,25 L206,37 L220,28 L235,42 L250,29 L265,40 L280,26 L295,38 L310,27 L325,43 L340,30 L355,39 L370,25 L385,41 L400,28 L415,38 L430,26 L445,42 L460,29 L475,39 L490,26 L505,43 L520,30 L535,40 L550,27 L565,39 L580,28 L595,44 L610,31 L625,39 L640,26 L655,42 L670,29 L685,39 L700,27 L715,43 L730,30 L745,39 L760,26 L775,41 L790,28 L805,38 L820,26 L835,42 L850,29 L865,39 L880,27 L895,43 L910,30 L925,39 L940,26 L955,41 L970,28 L985,38 L1000,26 L1015,42 L1030,29 L1045,39 L1060,27 L1075,43 L1090,30 L1105,39 L1120,26 L1135,41 L1150,28 L1165,38 L1180,29 L1192,39 L1200,32 L1200,0 Z';

  // Slightly offset jagged path for realistic white paper fiber fray
  const fiberPath =
    'M0,0 L0,36 L14,43 L26,30 L38,48 L52,35 L66,45 L80,32 L94,42 L108,28 L122,40 L136,30 L150,46 L164,34 L178,43 L192,29 L206,41 L220,32 L235,46 L250,33 L265,44 L280,30 L295,42 L310,31 L325,47 L340,34 L355,43 L370,29 L385,45 L400,32 L415,42 L430,30 L445,46 L460,33 L475,43 L490,30 L505,47 L520,34 L535,44 L550,31 L565,43 L580,32 L595,48 L610,35 L625,43 L640,30 L655,46 L670,33 L685,43 L700,31 L715,47 L730,34 L745,43 L760,30 L775,45 L790,32 L805,42 L820,30 L835,46 L850,33 L865,43 L880,31 L895,47 L910,34 L925,43 L940,30 L955,45 L970,32 L985,42 L1000,30 L1015,46 L1030,33 L1045,43 L1060,31 L1075,47 L1090,34 L1105,43 L1120,30 L1135,45 L1150,32 L1165,42 L1180,33 L1192,43 L1200,36 L1200,0 Z';

  const isBottom = position === 'bottom';

  return (
    <div
      className={`absolute left-0 right-0 w-full pointer-events-none select-none z-50 overflow-visible ${
        isBottom ? 'bottom-0 translate-y-[98%]' : 'top-0 -translate-y-[98%] rotate-180'
      }`}
      style={{
        filter: `drop-shadow(0 ${isBottom ? '18px' : '-18px'} 22px ${shadowColor}) drop-shadow(0 ${isBottom ? '6px' : '-6px'} 8px rgba(0,0,0,0.3))`,
      }}
    >
      <svg
        viewBox="0 0 1200 55"
        preserveAspectRatio="none"
        className="w-full h-9 sm:h-12 md:h-14 block"
      >
        {/* Layer 1: Rough White Exposed Paper Fiber Layer */}
        <path d={fiberPath} fill="#f1f5f9" opacity="0.9" />

        {/* Layer 2: Main Paper Body Color */}
        <path d={tearPath} fill={color} />
      </svg>
    </div>
  );
};
