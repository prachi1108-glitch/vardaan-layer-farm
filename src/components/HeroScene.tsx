/**
 * "Morning at the farm" hero scene (Doc 06 §2, option A).
 * Pure inline SVG + CSS animation (see globals.css .hero-* classes): a soft
 * sunrise warms in, a hen settles onto the nest, and a few eggs settle into
 * place. Comes to rest; reduced-motion users get the final static scene.
 *
 * No client JS, no external assets — crisp on retina, tiny, theme-friendly.
 */
export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label="Illustration: a hen settling on a nest of eggs at sunrise on the farm"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6E9CC" />
          <stop offset="0.55" stopColor="#FBF7EC" />
          <stop offset="1" stopColor="#F1F6EF" />
        </linearGradient>
        <radialGradient id="hs-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F2CE76" />
          <stop offset="1" stopColor="#C79233" />
        </radialGradient>
        <clipPath id="hs-clip">
          <rect x="0" y="0" width="400" height="500" rx="28" />
        </clipPath>
      </defs>

      <g clipPath="url(#hs-clip)">
        <rect x="0" y="0" width="400" height="500" fill="url(#hs-sky)" />

        {/* Sun + rays */}
        <g className="hero-rays" opacity="0">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="297"
              y="36"
              width="6"
              height="200"
              rx="3"
              fill="#E8B84B"
              opacity="0.5"
              transform={`rotate(${i * 30} 300 136)`}
            />
          ))}
        </g>
        <circle className="hero-sun" cx="300" cy="136" r="46" fill="url(#hs-sun)" />

        {/* Distant fields */}
        <path d="M0 430 Q 120 384 260 418 T 400 404 V 500 H 0 Z" fill="#E7EFE4" />
        <path d="M0 458 Q 150 418 300 452 T 400 446 V 500 H 0 Z" fill="#D7E6CF" />

        {/* Nest */}
        <ellipse cx="200" cy="430" rx="132" ry="40" fill="#D8A566" />
        <ellipse cx="200" cy="424" rx="120" ry="32" fill="#E6C173" />
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M${96 + i * 26} 430 q 12 -14 26 -2`}
            stroke="#A9741D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
        ))}

        {/* Eggs settling into the nest */}
        <g>
          <ellipse className="hero-egg hero-egg-1" cx="150" cy="420" rx="20" ry="26" fill="#FFFDF7" />
          <ellipse className="hero-egg hero-egg-1" cx="150" cy="414" rx="8" ry="10" fill="#FFFFFF" opacity="0.7" />
          <ellipse className="hero-egg hero-egg-3" cx="250" cy="420" rx="20" ry="26" fill="#FFFDF7" />
          <ellipse className="hero-egg hero-egg-3" cx="250" cy="414" rx="8" ry="10" fill="#FFFFFF" opacity="0.7" />
          <ellipse className="hero-egg hero-egg-2" cx="200" cy="426" rx="21" ry="27" fill="#FFFEFA" />
          <ellipse className="hero-egg hero-egg-2" cx="200" cy="419" rx="8" ry="10" fill="#FFFFFF" opacity="0.7" />
        </g>

        {/* Hen settling onto the nest */}
        <g className="hero-hen">
          {/* tail */}
          <path d="M118 372 q -34 -10 -44 -46 q 30 8 46 26 q -6 12 -2 20 Z" fill="#2F4A37" />
          {/* body */}
          <ellipse cx="205" cy="360" rx="92" ry="72" fill="#245021" />
          {/* wing */}
          <path d="M232 336 q -58 -20 -104 20 q 34 30 86 20 q 22 -18 18 -40 Z" fill="#2F6329" />
          <path d="M150 356 q 26 12 58 8" stroke="#E7EFE4" strokeWidth="3" fill="none" opacity="0.5" strokeLinecap="round" />
          {/* neck + head */}
          <path d="M262 330 q 26 -8 30 -40 q 2 -18 -14 -26 q -22 -6 -30 18 q -6 26 14 48 Z" fill="#245021" />
          <circle cx="286" cy="270" r="30" fill="#2F6329" />
          {/* comb */}
          <path d="M270 246 q 6 -16 16 -6 q 10 -16 18 -2 q 12 -8 12 8 q -2 12 -22 12 q -16 0 -24 -12 Z" fill="#C0271C" />
          {/* wattle */}
          <path d="M296 296 q 8 8 2 18 q -10 2 -12 -8 Z" fill="#C0271C" />
          {/* beak */}
          <path d="M314 274 l 26 6 l -24 12 Z" fill="#C79233" />
          {/* eye */}
          <circle cx="296" cy="266" r="4.4" fill="#12300F" />
          <circle cx="297.4" cy="264.6" r="1.4" fill="#FBF7EC" />
        </g>
      </g>
    </svg>
  );
}
