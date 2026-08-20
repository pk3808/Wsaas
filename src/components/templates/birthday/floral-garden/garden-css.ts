// ─── Floral Garden: Shared CSS Keyframes & SVG Paths ───
// All garden animations defined here for reuse across components.

export const GARDEN_COLORS = {
  ivory: "#FEFCF3",
  cream: "#FFF9F0",
  warmCream: "#FDF6EC",
  sage: "#8DAE93",
  deepSage: "#6B8F71",
  naturalGreen: "#4A7C59",
  forestGreen: "#2D5A3D",
  dustyPink: "#D4A0A0",
  blossomPink: "#F4C2C2",
  softBlossomPink: "#FADBD8",
  warmBrown: "#8B7355",
  darkBrown: "#5C4A32",
  subtleGold: "#C9A96E",
  softLavender: "#C4B7D4",
  skyBlue: "#B8D4E3",
  sunlightYellow: "#FFF3CD",
  sunset: "#F0C987",
  sunsetWarm: "#E8A87C",
} as const;

// SVG paths for cherry blossom petals (5 petal shapes)
export const PETAL_PATHS = [
  "M10 0 C15 5, 20 15, 10 20 C0 15, 5 5, 10 0Z",             // teardrop
  "M8 0 C14 3, 18 12, 10 18 C2 12, 2 3, 8 0Z",               // slim petal
  "M10 0 C18 4, 22 16, 10 22 C-2 16, 2 4, 10 0Z",            // wide petal
  "M6 0 C12 6, 14 14, 6 18 C-2 14, 0 6, 6 0Z",               // narrow
  "M10 0 C16 2, 20 10, 16 18 C10 22, 4 18, 0 10 C4 2, 10 0, 10 0Z", // rounded
] as const;

// SVG leaf shapes
export const LEAF_PATHS = [
  "M5 0 C10 5, 12 15, 5 25 C-2 15, 0 5, 5 0Z",   // simple leaf
  "M4 0 C8 3, 10 12, 6 20 C2 12, 0 3, 4 0Z",     // thin leaf
] as const;

// Deterministic pseudo-random for SSR-safe animations
export function deterministicRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// CSS keyframes for garden animations (injected via <style>)
export const GARDEN_KEYFRAMES = `
  @keyframes gardenPetalFloat {
    0% { transform: translateY(-5vh) translateX(0) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 0.8; }
    100% { transform: translateY(105vh) translateX(80px) rotate(360deg); opacity: 0; }
  }

  @keyframes gardenPetalFloatReverse {
    0% { transform: translateY(-5vh) translateX(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.9; }
    90% { opacity: 0.7; }
    100% { transform: translateY(105vh) translateX(-60px) rotate(-270deg); opacity: 0; }
  }

  @keyframes gardenLeafSway {
    0%, 100% { transform: rotate(-5deg) translateX(0); }
    25% { transform: rotate(3deg) translateX(5px); }
    50% { transform: rotate(-3deg) translateX(-3px); }
    75% { transform: rotate(5deg) translateX(4px); }
  }

  @keyframes gardenGlow {
    0%, 100% { opacity: 0.4; filter: blur(20px); }
    50% { opacity: 0.7; filter: blur(25px); }
  }

  @keyframes gardenParticle {
    0% { transform: translateY(0) scale(1); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 0.6; }
    100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
  }

  @keyframes gardenButterflyWing {
    0%, 100% { transform: scaleX(1); }
    50% { transform: scaleX(0.3); }
  }

  @keyframes gardenButterflyFly {
    0% { transform: translate(-10vw, 60vh) rotate(-5deg); }
    25% { transform: translate(30vw, 40vh) rotate(5deg); }
    50% { transform: translate(50vw, 50vh) rotate(-3deg); }
    75% { transform: translate(70vw, 35vh) rotate(4deg); }
    100% { transform: translate(110vw, 45vh) rotate(-5deg); }
  }

  @keyframes gardenSunrise {
    0% { opacity: 0; transform: scale(0.8) translateY(20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes gardenGrassGrow {
    0% { transform: scaleY(0); transform-origin: bottom; }
    100% { transform: scaleY(1); transform-origin: bottom; }
  }

  @keyframes gardenBranchGrow {
    0% { stroke-dashoffset: 1000; }
    100% { stroke-dashoffset: 0; }
  }

  @keyframes gardenFlowerBloom {
    0% { transform: scale(0) rotate(-30deg); opacity: 0; }
    60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  @keyframes gardenSubtleBreathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// Default wish messages for flower messages
export const DEFAULT_FLOWER_MESSAGES = [
  "One thing I hope you never forget: you make ordinary days feel special.",
  "The world is a little bit better because you're in it.",
  "May you always find reasons to smile, even on the quietest days.",
  "Some people bring sunshine wherever they go — you're one of them.",
  "Here's to another year of being absolutely, wonderfully you.",
];

// Default wishes for "Things I Wish For You"
export const DEFAULT_WISHES = [
  { icon: "🌸", title: "More Adventures", text: "May you always find another road worth taking." },
  { icon: "🌿", title: "Peace", text: "May you have quiet mornings and peaceful nights." },
  { icon: "🌼", title: "Happiness", text: "May happiness find you even on ordinary days." },
  { icon: "🌱", title: "Growth", text: "May you become everything you once dreamed of becoming." },
  { icon: "🦋", title: "Freedom", text: "May you always feel free to be exactly who you are." },
  { icon: "✨", title: "Magic", text: "May life keep surprising you in the most beautiful ways." },
];

// Default memory placeholders
export const DEFAULT_MEMORIES = [
  { title: "That Random Tuesday", note: "I didn't know it would become one of my favorite memories." },
  { title: "The Unexpected Laugh", note: "Some moments don't need a reason to become unforgettable." },
  { title: "A Quiet Evening", note: "Sometimes the simplest moments are the most meaningful ones." },
];
