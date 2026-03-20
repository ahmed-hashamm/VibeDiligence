'use client';

/**
 * @file HeroVisual.tsx
 * @description Hero visual animation with orbiting nodes and stars.
 */

export default function HeroVisual() {
  const CX = 250;
  const CY = 280;

  // Small stars clustered near the core
  // Radius (r) should be between the core (16) and the first ring (148)
  const coreStars = [
    { r: 45, o: 0.65, delay: '0s', size: 1.5, speed: '4s' },
    { r: 75, o: 0.55, delay: '1s', size: 2, speed: '8s' },
    { r: 105, o: 0.55, delay: '2s', size: 1.2, speed: '4s' },
    { r: 125, o: 0.55, delay: '0.5s', size: 1.2, speed: '10s' },
  ];

  const nodes = [
    { r: 195, speed: '28s', delay: '0s', size: 4.5 },
    { r: 195, speed: '28s', delay: '4s', size: 3.0 },
    { r: 238, speed: '40s', delay: '0s', size: 4.0 },
    { r: 238, speed: '40s', delay: '6s', size: 2.8 },
  ];

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: '480px' }}
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
            key={`star-${i}`}
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              animation: `spin-slow ${n.speed} linear infinite`,
              animationDelay: n.delay,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
            }}
          >
            <circle
              cx={CX} cy={CY - n.r} r={n.size}
              fill="white" opacity={n.o}
              filter="url(#nglow)"
              style={{
                animation: `dot-pulse ${2.5 + i * 0.3}s ease-in-out infinite`,
                animationDelay: n.delay,
                transformOrigin: `${CX}px ${CY - n.r}px`,
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
          strokeDasharray="250 250"
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
            key={`node-${i}`}
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              animation: `spin-slow ${n.speed} linear infinite`,
              animationDelay: n.delay,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
            }}
          >
            <circle
              cx={CX} cy={CY - n.r} r={n.size}
              fill="white" opacity="0.90"
              filter="url(#nglow)"
              style={{
                animation: `dot-pulse ${2.5 + i * 0.3}s ease-in-out infinite`,
                animationDelay: n.delay,
                transformOrigin: `${CX}px ${CY - n.r}px`,
              }}
            />
          </g>
        ))}

        {/* Solid core */}
        <circle cx={CX} cy={CY} r="16" fill="url(#core)" />
        {/* Specular highlights */}
        <circle cx={CX} cy={CY} r="16" fill="white" filter="url(#nglow)" opacity="0.85" />

        {/* Metric Cards */}
        <g filter="url(#cshadow)" className="animate-float">
          <rect
            x="-42" y="62" width="206" height="66" rx="8"
            fill="rgba(8,6,18,0.92)"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1"
          />
          <circle cx="-22" cy="81" r="4.5" fill="#FF2D6B" opacity="0.9" />
          <text x="-12" y="84"
            style={{ fontFamily: "var(--font-mono)", fontSize: '10.5px', fontWeight: 500, fill: '#FF5588', letterSpacing: '0.07em' }}>
            AST_DEEP_SCAN
          </text>
          <text x="-26" y="106"
            style={{ fontFamily: "var(--font-mono)", fontSize: '13.5px', fontWeight: 600, fill: '#F0F0FF', letterSpacing: '0.02em' }}>
            RECURSION_LIMIT: OK
          </text>
        </g>

        <g filter="url(#cshadow)" className="animate-pulse">
          <rect
            x="420" y="400" width="170" height="56" rx="8"
            fill="rgba(8,6,18,0.92)"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="1"
          />
          <circle cx="438" cy="415" r="4.5" fill="#9B4FDE" opacity="0.9" />
          <text x="450" y="418"
            style={{ fontFamily: "var(--font-mono)", fontSize: '10.5px', fontWeight: 500, fill: '#9B4FDE', letterSpacing: '0.07em' }}>
            MEMORY_LEAKS
          </text>
          <text x="430" y="440"
            style={{ fontFamily: "var(--font-mono)", fontSize: '13.5px', fontWeight: 600, fill: '#F0F0FF', letterSpacing: '0.02em' }}>
            0.00kb / LEAK_FREE
          </text>
        </g>
      </svg>
    </div>
  );
}