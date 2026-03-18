// 'use client';

// // animations/svgs/HeroVisual.tsx
// // Hero visual matching the VibeDiligence design — deep pink radial glow, rotating rings,
// // white orbiting nodes, star field, and two floating metric cards.

// export default function HeroVisual() {
//   const CX = 250;
//   const CY = 200;

//   const stars = [
//     { x: 42, y: 28, r: 1.2, o: 0.5 }, { x: 108, y: 54, r: 0.8, o: 0.35 },
//     { x: 175, y: 18, r: 1.0, o: 0.45 }, { x: 248, y: 72, r: 0.7, o: 0.3 },
//     { x: 322, y: 32, r: 1.1, o: 0.55 }, { x: 398, y: 88, r: 0.9, o: 0.35 },
//     { x: 461, y: 22, r: 1.3, o: 0.45 }, { x: 520, y: 65, r: 0.7, o: 0.3 },
//     { x: 68, y: 118, r: 0.8, o: 0.35 }, { x: 138, y: 142, r: 1.0, o: 0.45 },
//     { x: 502, y: 128, r: 1.2, o: 0.5 }, { x: 548, y: 178, r: 0.8, o: 0.3 },
//     { x: 28, y: 210, r: 1.1, o: 0.4 }, { x: 82, y: 258, r: 0.7, o: 0.3 },
//     { x: 545, y: 242, r: 1.0, o: 0.45 }, { x: 572, y: 312, r: 0.8, o: 0.35 },
//     { x: 18, y: 340, r: 1.3, o: 0.45 }, { x: 58, y: 398, r: 0.9, o: 0.3 },
//     { x: 538, y: 388, r: 1.1, o: 0.4 }, { x: 558, y: 448, r: 0.7, o: 0.3 },
//     { x: 92, y: 468, r: 1.0, o: 0.45 }, { x: 148, y: 522, r: 0.8, o: 0.35 },
//     { x: 368, y: 558, r: 1.2, o: 0.5 }, { x: 458, y: 532, r: 0.9, o: 0.35 },
//     { x: 198, y: 48, r: 0.6, o: 0.28 }, { x: 438, y: 48, r: 0.8, o: 0.35 },
//     { x: 192, y: 512, r: 0.7, o: 0.28 }, { x: 278, y: 542, r: 1.0, o: 0.45 },
//     { x: 480, y: 312, r: 0.6, o: 0.28 }, { x: 112, y: 380, r: 0.8, o: 0.32 },
//   ];

//   const nodes = [
//     { r: 148, speed: '18s', delay: '0s', size: 5.5 },
//     { r: 148, speed: '18s', delay: '9s', size: 3.5 },
//     { r: 195, speed: '28s', delay: '0s', size: 4.5 },
//     { r: 195, speed: '28s', delay: '14s', size: 3.0 },
//     { r: 238, speed: '40s', delay: '0s', size: 4.0 },
//     { r: 238, speed: '40s', delay: '20s', size: 2.8 },
//   ];

//   return (
//     <div
//       className="w-full flex items-center justify-center"
//       style={{ height: '600px' }}
//     >
//       <svg
//         viewBox="0 0 600 600"
//         xmlns="http://www.w3.org/2000/svg"
//         style={{ width: '100%', maxWidth: '600px', height: '100%', overflow: 'visible' }}
//         aria-label="VibeDiligence AI analysis engine visual"
//       >
//         <defs>
//           {/* Main atmospheric glow behind everything */}
//           <radialGradient id="atmos" cx="50%" cy="50%" r="50%">
//             <stop offset="0%" stopColor="#FF1A6B" stopOpacity="0.55" />
//             <stop offset="18%" stopColor="#CC1A60" stopOpacity="0.45" />
//             <stop offset="38%" stopColor="#7B0E55" stopOpacity="0.30" />
//             <stop offset="60%" stopColor="#3D083A" stopOpacity="0.16" />
//             <stop offset="80%" stopColor="#120524" stopOpacity="0.07" />
//             <stop offset="100%" stopColor="#08080F" stopOpacity="0" />
//           </radialGradient>

//           {/* Core orb gradient */}
//           <radialGradient id="core" cx="38%" cy="32%" r="65%">
//             <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
//             <stop offset="25%" stopColor="#FFE0EE" stopOpacity="0.97" />
//             <stop offset="55%" stopColor="#FF4080" stopOpacity="0.85" />
//             <stop offset="100%" stopColor="#CC1555" stopOpacity="0.65" />
//           </radialGradient>

//           {/* Node soft glow filter */}
//           <filter id="nglow" x="-150%" y="-150%" width="400%" height="400%">
//             <feGaussianBlur stdDeviation="3.5" result="b" />
//             <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
//           </filter>

//           {/* Card drop shadow */}
//           <filter id="cshadow" x="-15%" y="-15%" width="130%" height="130%">
//             <feDropShadow dx="0" dy="3" stdDeviation="10" floodColor="#000" floodOpacity="0.55" />
//           </filter>
//         </defs>

//         {/* Star field */}
//         {stars.map((s, i) => (
//           <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.o} />
//         ))}

//         {/* Atmospheric radial glow */}
//         <circle cx={CX} cy={CY} r="270" fill="url(#atmos)" />

//         {/* Outer dashed ring — pink */}
//         <circle
//           cx={CX} cy={CY} r="242"
//           fill="none"
//           stroke="#FF2D6B"
//           strokeWidth="1.2"
//           strokeDasharray="5 22"
//           opacity="0.50"
//           style={{
//             transformOrigin: `${CX}px ${CY}px`,
//             animation: 'spin-slow 36s linear infinite',
//           }}
//         />

//         {/* Mid ring — purple arc */}
//         <circle
//           cx={CX} cy={CY} r="194"
//           fill="none"
//           stroke="#7B2FBE"
//           strokeWidth="1.8"
//           strokeDasharray="90 18"
//           opacity="0.60"
//           style={{
//             transformOrigin: `${CX}px ${CY}px`,
//             animation: 'spin-reverse 22s linear infinite',
//           }}
//         />

//         {/* Inner ring — faint pink */}
//         <circle
//           cx={CX} cy={CY} r="148"
//           fill="none"
//           stroke="#CC1A80"
//           strokeWidth="0.9"
//           strokeDasharray="35 14"
//           opacity="0.35"
//           style={{
//             transformOrigin: `${CX}px ${CY}px`,
//             animation: 'spin-slow 15s linear infinite',
//           }}
//         />

//         {/* Orbiting nodes */}
//         {nodes.map((n, i) => (
//           <g
//             key={i}
//             style={{
//               transformOrigin: `${CX}px ${CY}px`,
//               animation: `spin-slow ${n.speed} linear infinite`,
//               animationDelay: n.delay,
//               animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
//             }}
//           >
//             {/* Glow halo */}
//             <circle cx={CX} cy={CY - n.r} r={n.size + 5} fill="white" opacity="0.10" />
//             {/* Dot */}
//             <circle
//               cx={CX} cy={CY - n.r} r={n.size}
//               fill="white"
//               opacity="0.90"
//               filter="url(#nglow)"
//               style={{ animation: `dot-pulse ${2.5 + i * 0.3}s ease-in-out infinite`, animationDelay: n.delay }}
//             />
//           </g>
//         ))}

//         {/* Orb — layered glow rings */}
//         {/* <circle cx={CX} cy={CY} r="60" fill="rgba(255,45,100,0.12)"
//           style={{ animation: 'orb-pulse 3.2s ease-in-out infinite' }} />
//         <circle cx={CX} cy={CY} r="42" fill="rgba(255,60,120,0.20)"
//           style={{ animation: 'orb-pulse 3.2s ease-in-out infinite', animationDelay: '0.4s' }} />
//         <circle cx={CX} cy={CY} r="28" fill="rgba(255,90,150,0.35)"
//           style={{ animation: 'orb-pulse 3.2s ease-in-out infinite', animationDelay: '0.8s' }} />
//         <circle cx={CX} cy={CY} r="16" fill="rgba(255,140,180,0.55)"
//           style={{ animation: 'orb-pulse 3.2s ease-in-out infinite', animationDelay: '1.1s' }} /> */}
//         {/* Solid core */}
//         <circle cx={CX} cy={CY} r="11" fill="url(#core)" />
//         {/* Specular highlights */}
//         <circle cx={CX - 4} cy={CY - 3} r="4.5" fill="white" opacity="0.65" />
//         <circle cx={CX - 3} cy={CY - 2} r="2.2" fill="white" opacity="0.88" />

//         {/* ── Metric card — top left: AST_DEEP_SCAN ── */}
//         <g filter="url(#cshadow)">
//           <rect
//             x="44" y="105" width="204" height="66" rx="8"
//             fill="rgba(8,6,18,0.90)"
//             stroke="rgba(255,255,255,0.09)"
//             strokeWidth="1"
//           />
//           <circle cx="63" cy="124" r="4.5" fill="#FF2D6B" opacity="0.9" />
//           <text
//             x="74" y="129"
//             style={{ fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: '9.5px', fontWeight: 500, fill: '#FF5588', letterSpacing: '0.07em' }}
//           >
//             AST_DEEP_SCAN
//           </text>
//           <text
//             x="54" y="155"
//             style={{ fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: '13.5px', fontWeight: 600, fill: '#F0F0FF', letterSpacing: '0.02em' }}
//           >
//             RECURSION_LIMIT: OK
//           </text>
//         </g>

//         {/* ── Metric card — bottom right: MEMORY_LEAKS ── */}
//         <g filter="url(#cshadow)">
//           <rect
//             x="358" y="428" width="196" height="66" rx="8"
//             fill="rgba(8,6,18,0.90)"
//             stroke="rgba(255,255,255,0.09)"
//             strokeWidth="1"
//           />
//           <circle cx="372" cy="447" r="4.5" fill="#9B4FDE" opacity="0.9" />
//           <text
//             x="383" y="452"
//             style={{ fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: '9.5px', fontWeight: 500, fill: '#9B4FDE', letterSpacing: '0.07em' }}
//           >
//             MEMORY_LEAKS
//           </text>
//           <text
//             x="362" y="477"
//             style={{ fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: '13.5px', fontWeight: 600, fill: '#F0F0FF', letterSpacing: '0.02em' }}
//           >
//             0.00kb / LEAK_FREE
//           </text>
//         </g>

//       </svg>
//     </div>
//   );
// }
'use client';

// animations/svgs/HeroVisual.tsx
// Hero visual — deep pink radial glow, purple/red/purple rings,
// orbiting nodes, small stars near core, metric cards at outer ring edge.

export default function HeroVisual() {
  const CX = 250;
  const CY = 280;

  // Small stars clustered near the core (within r~110 of center)
  const coreStars = [


    { x: CX - 28, y: CY - 22, r: 1.0, o: 0.65, delay: '0s', size: 1.5, speed: '10s' },
    { x: CX + 72, y: CY + 85, r: 0.8, o: 0.55, delay: '1s', size: 2, speed: '10s' },
    // { x: CX - 55, y: CY + 78, r: 1.1, o: 0.60, delay: '0s', size: 1.1, speed: '10s' },
    // { x: CX + 95, y: CY + 52, r: 0.7, o: 0.50, delay: '0s', size: 1.2, speed: '10s' },
    // { x: CX + 40, y: CY - 100, r: 0.9, o: 0.60, delay: '0s', size: 1.2, speed: '10s' },
    { x: CX - 200, y: CY - 50, r: 0.8, o: 0.55, delay: '2s', size: 1.2, speed: '10s' },
    // { x: CX + 105, y: CY - 20, r: 1.0, o: 0.50, delay: '0s', size: 1.2, speed: '10s' },
    { x: CX - 10, y: CY - 208, r: 0.7, o: 0.55, delay: '0s', size: 1.2 },

    // { x: CX + 68, y: CY + 90, r: 0.9, o: 0.45 },
    // { x: CX - 78, y: CY - 95, r: 0.6, o: 0.50 },
    // { x: CX + 20, y: CY + 110, r: 0.8, o: 0.45 },
    // { x: CX - 110, y: CY - 48, r: 0.7, o: 0.50 },
  ];

  const nodes = [
    // { r: 148, speed: '18s', delay: '0s', size: 5.5 },
    // { r: 148, speed: '18s', delay: '9s', size: 3.5 },
    { r: 195, speed: '28s', delay: '0s', size: 4.5 },
    { r: 195, speed: '28s', delay: '4s', size: 3.0 },
    { r: 238, speed: '40s', delay: '0s', size: 4.0 },
    { r: 238, speed: '40s', delay: '6s', size: 2.8 },
  ];

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: '600px' }}
    >
      <svg
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: '600px', height: '100%', overflow: 'visible' }}
        aria-label="VibeDiligence AI analysis engine visual"
      >
        <defs>
          <radialGradient id="atmos" cx="50%" cy="42%" r="50%">
            <stop offset="0%" stopColor="#FF1A6B" stopOpacity="0.55" />
            <stop offset="18%" stopColor="#CC1A60" stopOpacity="0.45" />
            <stop offset="38%" stopColor="#7B0E55" stopOpacity="0.30" />
            <stop offset="60%" stopColor="#3D083A" stopOpacity="0.16" />
            <stop offset="80%" stopColor="#120524" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#08080F" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="core" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#FFE0EE" stopOpacity="0.97" />
            <stop offset="55%" stopColor="#FF4080" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#CC1555" stopOpacity="0.65" />
          </radialGradient>

          <filter id="nglow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="cshadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="10" floodColor="#000" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Atmospheric radial glow */}
        <circle cx={CX} cy={CY + 10} r="250" fill="url(#atmos)" />

        {/* Small stars near the core */}
        {coreStars.map((n, i) => (
          <g
            key={i}
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              animation: `spin-slow ${n.speed} linear infinite`,
              animationDelay: n.delay,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              opacity: 1
            }}
          >
            <circle cx={CX} cy={CY - n.r} r={n.size + 5} fill="white" opacity="0" />
            <circle
              cx={CX} cy={CY - n.r} r={n.size}
              fill="white" opacity="0.90"
              filter="url(#nglow)"
              style={{
                animation: `dot-pulse ${2.5 + i * 0.3}s ease-in-out infinite`,
                animationDelay: n.delay,
              }}
            />
          </g>
        ))}

        {/* ── Ring 1 — innermost — PURPLE ── */}
        <circle
          cx={CX} cy={CY} r="148"
          fill="none"
          stroke="#7B2FBE"
          strokeWidth="4"
          strokeDasharray="250 250" // want to have 2 arcs only not dashed
          opacity="0.8"
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            animation: 'spin-slow 15s linear infinite',
          }}
        />

        {/* ── Ring 2 — middle — RED ── */}
        <circle
          cx={CX} cy={CY} r="194"
          fill="none"
          stroke="#FF3333"
          strokeWidth="1.6"
          strokeDasharray="10 10"
          opacity="0.40"
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            animation: 'spin-reverse 30s linear infinite',
          }}
        />

        {/* ── Ring 3 — outermost — PURPLE ── */}
        <circle
          cx={CX} cy={CY} r="242"
          fill="none"
          stroke="#9B2FBE"
          strokeWidth="2"
          strokeDasharray="15 20"
          opacity="0.3"
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            animation: 'spin-slow 36s linear infinite',
          }}
        />

        {/* Orbiting nodes */}
        {nodes.map((n, i) => (
          <g
            key={i}
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              animation: `spin-slow ${n.speed} linear infinite`,
              animationDelay: n.delay,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              opacity: 1
            }}
          >
            <circle cx={CX} cy={CY - n.r} r={n.size + 5} fill="white" opacity="0" />
            <circle
              cx={CX} cy={CY - n.r} r={n.size}
              fill="white" opacity="0.90"
              filter="url(#nglow)"
              style={{
                animation: `dot-pulse ${2.5 + i * 0.3}s ease-in-out infinite`,
                animationDelay: n.delay,
              }}
            />
          </g>
        ))}
        {/* Solid core */}
        <circle cx={CX} cy={CY} r="16" fill="url(#core)" />
        {/* Specular highlights */}
        <circle cx={CX} cy={CY} r="16" fill="white" filter="url(#nglow)" opacity="0.85"
        />
        {/* <circle cx={CX} cy={CY} r="16" fill="white" filter="url(#nglow)" opacity="0.88" /> */}

        {/* ── Card top-left — positioned at outer ring edge ──
            Outer ring edge at top-left angle ≈ (CX - 170, CY - 170)
            Card right edge should kiss the ring boundary            */}
        <g filter="url(#cshadow)" className="animate-float  animate-duration-2000 animate-ease-in-out animate-infinite animate-delay-2000   " >
          <rect
            x="-72" y="42" width="206" height="66" rx="8"
            fill="rgba(8,6,18,0.92)"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1"
          />
          <circle cx="-52" cy="61" r="4.5" fill="#FF2D6B" opacity="0.9" />
          <text x="-42" y="64"
            style={{ fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: '10.5px', fontWeight: 500, fill: '#FF5588', letterSpacing: '0.07em' }}>
            AST_DEEP_SCAN
          </text>
          <text x="-56" y="86"
            style={{ fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: '13.5px', fontWeight: 600, fill: '#F0F0FF', letterSpacing: '0.02em' }}>
            RECURSION_LIMIT: OK
          </text>
        </g>

        {/* ── Card bottom-right — positioned at outer ring edge ──
            Outer ring edge at bottom-right angle ≈ (CX + 168, CY + 170)  */}
        <g filter="url(#cshadow)" className="animate-pulse  animate-duration-1 animate-ease-in-out animate-infinite animate-delay-5000   ">
          <rect
            x="420" y="400" width="170" height="56" rx="8"
            fill="rgba(8,6,18,0.92)"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1"
          />
          <circle cx="438" cy="415" r="4.5" fill="#9B4FDE" opacity="0.9" />
          <text x="450" y="418"
            style={{ fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: '10.5px', fontWeight: 500, fill: '#9B4FDE', letterSpacing: '0.07em' }}>
            MEMORY_LEAKS
          </text>
          <text x="430" y="440"
            style={{ fontFamily: "'JetBrains Mono','Courier New',monospace", fontSize: '13.5px', fontWeight: 600, fill: '#F0F0FF', letterSpacing: '0.02em' }}>
            0.00kb / LEAK_FREE
          </text>
        </g>

      </svg>
    </div>
  );
}