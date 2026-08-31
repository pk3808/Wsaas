// ─── Magical Starry Night: Design Tokens, Keyframes & Defaults ───

export const STARRY_COLORS = {
  deepSpace:    "#01030B",
  cosmicDark:   "#020617",
  midnight:     "#070B1A",
  nebulaBlue:   "#0D1535",
  indigoDeep:   "#1E1B4B",
  indigoMid:    "#312E81",
  indigo:       "#4338CA",
  indigoLight:  "#818CF8",
  starGold:     "#FDE047",
  starCream:    "#FFF5D7",
  starWhite:    "#FFFCE0",
  moonGlow:     "#E0D4A0",
  auroraGreen:  "#34D399",
  auroraBlue:   "#67E8F9",
  auroraPink:   "#F472B6",
  aurораViolet: "#A78BFA",
  stardust:     "#E0E7FF",
  comet:        "#BAE6FD",
  textPrimary:  "#E2E8F0",
  textDim:      "#94A3B8",
  textFaint:    "#475569",
} as const;

// Deterministic pseudo-random (SSR-safe)
export function starRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export const STARRY_KEYFRAMES = `
  @keyframes starTwinkle {
    0%, 100% { opacity: var(--star-max, 1); transform: scale(1); }
    50% { opacity: var(--star-min, 0.2); transform: scale(0.7); }
  }

  @keyframes starShoot {
    0% { transform: translateX(0) translateY(0) scaleX(0); opacity: 1; }
    10% { scaleX(1); }
    100% { transform: translateX(300px) translateY(120px) scaleX(1); opacity: 0; }
  }

  @keyframes auroraWave {
    0% { transform: translateX(-5%) scaleY(1) skewX(-3deg); opacity: 0.4; }
    33% { transform: translateX(2%) scaleY(1.15) skewX(2deg); opacity: 0.7; }
    66% { transform: translateX(-3%) scaleY(0.9) skewX(-1deg); opacity: 0.5; }
    100% { transform: translateX(-5%) scaleY(1) skewX(-3deg); opacity: 0.4; }
  }

  @keyframes auroraWave2 {
    0% { transform: translateX(3%) scaleY(1.1) skewX(2deg); opacity: 0.3; }
    50% { transform: translateX(-4%) scaleY(0.85) skewX(-4deg); opacity: 0.6; }
    100% { transform: translateX(3%) scaleY(1.1) skewX(2deg); opacity: 0.3; }
  }

  @keyframes moonPulse {
    0%, 100% { box-shadow: 0 0 60px rgba(255,252,224,0.2), 0 0 120px rgba(255,252,224,0.08); }
    50% { box-shadow: 0 0 80px rgba(255,252,224,0.35), 0 0 180px rgba(255,252,224,0.12); }
  }

  @keyframes cosmicFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-18px) rotate(1.5deg); }
    66% { transform: translateY(-8px) rotate(-1deg); }
  }

  @keyframes cosmicPulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.08); }
  }

  @keyframes orbPing {
    0% { transform: scale(1); opacity: 0.7; }
    100% { transform: scale(2.5); opacity: 0; }
  }

  @keyframes starDust {
    0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
    20% { opacity: 0.8; }
    80% { opacity: 0.4; }
    100% { transform: translateY(-80px) translateX(20px) scale(0.3); opacity: 0; }
  }

  @keyframes candleFlicker {
    0%, 100% { transform: scaleX(1) scaleY(1) rotate(-2deg); opacity: 1; }
    25% { transform: scaleX(0.8) scaleY(1.2) rotate(3deg); opacity: 0.9; }
    50% { transform: scaleX(1.1) scaleY(0.9) rotate(-1deg); opacity: 0.95; }
    75% { transform: scaleX(0.9) scaleY(1.15) rotate(2deg); opacity: 0.85; }
  }

  @keyframes cometTrail {
    0% { opacity: 0; transform: translateX(-200px) translateY(-100px) scaleX(0.1); }
    5% { opacity: 1; }
    95% { opacity: 0.8; }
    100% { opacity: 0; transform: translateX(120vw) translateY(60vh) scaleX(1); }
  }

  @keyframes starfieldZoom {
    0% { transform: scale(0.1); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
  }

  @keyframes letterFloat {
    0%, 100% { transform: translateY(0) rotate(-1deg); }
    50% { transform: translateY(-20px) rotate(1deg); }
  }

  @keyframes glowPulse {
    0%, 100% { filter: blur(20px); opacity: 0.5; }
    50% { filter: blur(30px); opacity: 0.8; }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// Default data fallbacks
import { RelationshipType } from "@/lib/config";

export const getStarryDefaults = (relationship?: RelationshipType) => ({
  wishes: [
    "May every star in tonight's sky carry a wish just for you.",
    "May you always find your way back to the things that make you feel alive.",
    "May this year bring you more of everything that makes your soul shine.",
  ],
  memories: [
    { title: "A Moment That Stayed", text: "Some nights you just know you'll remember forever." },
    { title: "When Time Stood Still", text: "There are moments so beautiful even memory can't do them justice." },
    { title: "A Thousand Quiet Words", text: "We didn't need to say much. We already knew." },
  ],
  letters: [
    relationship === "partner"
      ? "If I could bottle one feeling and give it to you, it would be the way the night sky makes everything feel both infinite and intimate at the same time. That's what you are to me. Happy Birthday."
      : "If I could bottle one feeling and give it to you, it would be the way the night sky makes everything feel infinite and inspiring. You are a true star. Happy Birthday.",
  ],
  secrets: [
    "You radiate more light than you realize.",
    "The universe conspired to make you exactly as you are.",
    "The best chapters of your story are still unwritten.",
  ],
});

export const STARRY_DEFAULTS = getStarryDefaults("friend");
