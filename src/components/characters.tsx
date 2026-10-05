/**
 * The "cute layer" (Doc 03 §4): Eggie, the Egg Crew, Pip and the 30-egg tray.
 *
 * Flat-soft inline SVG, palette fills only, eggs always WHITE. Motion comes
 * from CSS classes in globals.css (wobble/blink/hop/egg-drop/walk), all of
 * which switch off under prefers-reduced-motion. Every illustration is
 * decorative (aria-hidden) — meaning lives in the surrounding copy.
 *
 * Cute stops at data: never use these inside spec tables, pricing, forms or
 * legal pages, and never put Pip next to quote/price language (Doc 03 §4.2–4.3).
 */

const C = {
  white: "#FFFFFF",
  oat: "#F8EFE2",
  line: "#E9DCCB",
  butter: "#FBE7A1",
  peach: "#F6D9C9",
  clay: "#A9573E",
  cocoa: "#4A3A32",
};

const shadow = { filter: "drop-shadow(0 12px 24px rgba(74,58,50,0.10))" };

/* ------------------------------------------------------------------------- */
/* Egg — the base shape, drawn in a 100×128 box with its base at (50,124).    */
/* ------------------------------------------------------------------------- */

const EGG = "M50 4C24 4 6 46 6 78c0 28 20 46 44 46s44-18 44-46C94 46 76 4 50 4Z";
const EGG_LIGHT = "M47 8C25 8 10 46 10 76c0 25 17 41 38 41 22 0 38-17 38-43C86 44 70 8 47 8Z";

type Face = "happy" | "calm" | "none" | "wow";

function EggFace({ face }: { face: Face }) {
  if (face === "none") return null;
  return (
    <g>
      <ellipse cx="30" cy="88" rx="7.5" ry="4.2" fill={C.peach} />
      <ellipse cx="70" cy="88" rx="7.5" ry="4.2" fill={C.peach} />
      <g className="blink">
        <circle cx="38" cy="76" r="3.8" fill={C.cocoa} />
        <circle cx="62" cy="76" r="3.8" fill={C.cocoa} />
      </g>
      {face === "happy" ? (
        <path d="M44.5 87q5.5 5 11 0" fill="none" stroke={C.cocoa} strokeWidth="2.4" strokeLinecap="round" />
      ) : face === "wow" ? (
        <ellipse cx="50" cy="89" rx="3" ry="3.6" fill={C.cocoa} />
      ) : null}
    </g>
  );
}

/** An egg as an SVG <g>, base-centred at (x, y), scaled by s. */
export function EggShape({
  x = 50,
  y = 124,
  s = 1,
  face = "happy",
  className,
  style,
}: {
  x?: number;
  y?: number;
  s?: number;
  face?: Face;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <g transform={`translate(${x - 50 * s} ${y - 124 * s}) scale(${s})`}>
      <g className={className} style={style}>
        <path d={EGG} fill={C.oat} />
        <path d={EGG_LIGHT} fill={C.white} />
        <ellipse cx="33" cy="36" rx="5" ry="10" transform="rotate(-22 33 36)" fill={C.white} opacity="0.9" />
        <EggFace face={face} />
      </g>
    </g>
  );
}

/** Eggie — the hero egg (hero, 404, empty states, success). */
export function Eggie({
  className,
  face = "happy",
  title,
}: {
  className?: string;
  face?: Face;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 132"
      className={className}
      style={shadow}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <g className="egg-hover">
        <EggShape face={face} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------------- */
/* Pip — round fluffy butter chick, drawn in a 120×120 box, feet at y≈114.   */
/* ------------------------------------------------------------------------- */

function PipBody({ wing = true }: { wing?: boolean }) {
  return (
    <g>
      {/* feet */}
      <g stroke={C.clay} strokeWidth="3.2" strokeLinecap="round" fill="none">
        <path d="M48 104v9m0 0-5 3m5-3 5 3" />
        <path d="M72 104v9m0 0-5 3m5-3 5 3" />
      </g>
      {/* tuft */}
      <ellipse cx="55" cy="24" rx="5" ry="9" transform="rotate(-20 55 24)" fill={C.butter} />
      <ellipse cx="64" cy="22" rx="4.5" ry="8" transform="rotate(18 64 22)" fill={C.butter} />
      {/* body */}
      <circle cx="60" cy="66" r="42" fill={C.butter} />
      <path d="M24 82c6 16 20 26 36 26s30-10 36-26c-10 10-22 15-36 15S34 92 24 82Z" fill={C.cocoa} opacity="0.05" />
      {wing ? (
        <path d="M24 70c-4 10 2 20 12 22 4-8 3-17-2-24-3-2-7-1-10 2Z" fill={C.cocoa} opacity="0.07" />
      ) : null}
      {/* cheeks */}
      <ellipse cx="38" cy="70" rx="7" ry="4" fill={C.peach} />
      <ellipse cx="82" cy="70" rx="7" ry="4" fill={C.peach} />
      {/* eyes */}
      <g className="blink">
        <circle cx="47" cy="58" r="4.2" fill={C.cocoa} />
        <circle cx="73" cy="58" r="4.2" fill={C.cocoa} />
      </g>
      {/* beak */}
      <path d="M54 66h12l-6 8Z" fill={C.clay} stroke={C.clay} strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
}

/** Pip — the brand chick (section transitions, footer peek, Why Vardaan). */
export function Pip({ className, hop = false }: { className?: string; hop?: boolean }) {
  return (
    <svg viewBox="0 0 120 122" className={className} style={shadow} aria-hidden="true">
      <g className={hop ? "hop" : undefined}>
        <PipBody />
      </g>
    </svg>
  );
}

/** Pip peeking over an edge — only the top half shows (footer). */
export function PipPeek({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      <PipBody wing={false} />
      {/* little wings gripping the edge */}
      <ellipse cx="24" cy="77" rx="11" ry="5" fill={C.butter} />
      <ellipse cx="96" cy="77" rx="11" ry="5" fill={C.butter} />
    </svg>
  );
}

/* ------------------------------------------------------------------------- */
/* Egg Crew — three sizes side by side (grade explainers).                   */
/* ------------------------------------------------------------------------- */

export function EggCrew({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 330 190" className={className} style={shadow} aria-hidden="true">
      <ellipse cx="165" cy="180" rx="150" ry="7" fill={C.cocoa} opacity="0.06" />
      <g className="egg-hover">
        <EggShape x={62} y={178} s={0.95} face="calm" />
      </g>
      <g className="egg-hover">
        <EggShape x={160} y={178} s={1.12} face="happy" />
      </g>
      <g className="egg-hover">
        <EggShape x={268} y={178} s={1.3} face="calm" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------------- */
/* The 30-egg tray, in soft perspective.                                     */
/* ------------------------------------------------------------------------- */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Small tray illustration for the packaging section and icons. */
export function TrayIcon({ className }: { className?: string }) {
  const eggs: { x: number; y: number; s: number }[] = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 5; c++) {
      const t = (r + 0.5) / 3;
      eggs.push({ x: lerp(lerp(70, 230, (c + 0.5) / 5), lerp(40, 260, (c + 0.5) / 5), t), y: lerp(80, 170, t), s: lerp(0.32, 0.42, t) });
    }
  }
  return (
    <svg viewBox="0 0 300 220" className={className} style={shadow} aria-hidden="true">
      <path d="M52 62h196l34 132H18Z" fill={C.oat} stroke={C.line} strokeWidth="3" strokeLinejoin="round" />
      <path d="M18 194h264l-4 16H22Z" fill={C.line} />
      {eggs.map((e, i) => (
        <g key={i}>
          <ellipse cx={e.x} cy={e.y + 2} rx={34 * e.s} ry={11 * e.s} fill={C.line} />
          <EggShape x={e.x} y={e.y} s={e.s} face="none" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------------- */
/* Scenes for specific moments.                                              */
/* ------------------------------------------------------------------------- */

/** Thank-you page: Pip hopping out of a cracked white egg. */
export function PipHatching({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 220" className={className} style={shadow} aria-hidden="true">
      <ellipse cx="100" cy="210" rx="70" ry="6" fill={C.cocoa} opacity="0.07" />
      {/* top shell flying off */}
      <g transform="translate(118 18) rotate(24)">
        <path d="M0 40C0 16 14 0 34 0s34 16 34 40l-9-7-8 8-9-8-8 8-9-8-8 8-8-8Z" fill={C.white} stroke={C.line} strokeWidth="2" strokeLinejoin="round" />
      </g>
      {/* Pip */}
      <g transform="translate(40 30)">
        <g className="hop">
          <PipBody />
        </g>
      </g>
      {/* bottom shell */}
      <path
        d="M40 130l12 10 12-10 12 10 12-10 12 10 12-10 12 10 12-10 12 10 4-2c2 6 2 12 2 18 0 34-26 56-60 56s-60-22-60-56c0-6 1-12 3-18Z"
        fill={C.white}
        stroke={C.line}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M44 160c4 26 26 42 56 42 28 0 50-16 56-40-12 20-32 30-56 30s-46-12-56-32Z" fill={C.oat} />
    </svg>
  );
}

/** 404: Eggie rolling away off the edge of a tray. */
export function RollingEggie({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 220" className={className} style={shadow} aria-hidden="true">
      <path d="M10 150h170l10 40H0Z" fill={C.oat} stroke={C.line} strokeWidth="3" strokeLinejoin="round" />
      {[40, 90, 140].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={154} rx={18} ry={6} fill={C.line} />
          <EggShape x={x} y={152} s={0.36} face="none" />
        </g>
      ))}
      {/* empty cup where Eggie was */}
      <ellipse cx="172" cy="154" rx="16" ry="5" fill={C.line} />
      {/* motion lines */}
      <g stroke={C.line} strokeWidth="4" strokeLinecap="round">
        <path d="M206 118h26" />
        <path d="M200 134h20" />
        <path d="M212 102h16" />
      </g>
      <g transform="rotate(38 290 140)">
        <EggShape x={290} y={196} s={0.62} face="wow" />
      </g>
    </svg>
  );
}

/** "Our promise": Eggie holding a small sign (the sign text is real HTML below). */
export function EggieWithSign({ className, label }: { className?: string; label: string }) {
  return (
    <svg viewBox="0 0 140 190" className={className} style={shadow} role="img" aria-label={label}>
      {/* sign */}
      <rect x="66" y="6" width="5" height="70" rx="2.5" fill={C.clay} opacity="0.85" />
      <rect x="14" y="8" width="112" height="44" rx="12" fill={C.white} stroke={C.line} strokeWidth="2" />
      <text
        x="70"
        y="38"
        textAnchor="middle"
        fill={C.cocoa}
        style={{ fontFamily: "var(--font-anton), Anton, Impact, sans-serif", fontSize: 20, letterSpacing: 0.5 }}
      >
        {label.toUpperCase()}
      </text>
      <g className="egg-hover">
        <EggShape x={70} y={186} s={0.95} face="happy" />
      </g>
      {/* tiny arm holding the stick */}
      <path d="M58 118q6-30 12-44" stroke={C.oat} strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** A small egg that "walks" along the How-it-works path. */
export function WalkingEgg({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 100 132" className={className} aria-hidden="true">
      <g className="walk" style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
        <EggShape face="calm" />
      </g>
    </svg>
  );
}
