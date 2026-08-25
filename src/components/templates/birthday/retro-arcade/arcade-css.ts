// ─── Retro Arcade: Shared Design Tokens, Colors, Keyframes ───

export const ARCADE_COLORS = {
  // Core neon palette
  neonPink: "#FF2D95",
  neonBlue: "#00D4FF",
  neonGreen: "#39FF14",
  neonYellow: "#FFE600",
  neonPurple: "#BF40FF",
  neonOrange: "#FF6B2B",

  // CRT / dark tones
  crtBlack: "#0A0A0F",
  crtDarkBlue: "#0D0D2B",
  crtDeepPurple: "#1A0A2E",
  screenGlow: "#1A1A3E",

  // Pixel UI tones
  pixelGold: "#FFD700",
  pixelRed: "#FF4444",
  pixelWhite: "#F0F0F0",
  pixelGray: "#888899",
  pixelDarkGray: "#333344",

  // Game elements
  blockGold: "#E8A317",
  blockBrown: "#8B6914",
  pipeGreen: "#33CC33",
  pipeDarkGreen: "#228B22",
  brickRed: "#CC4444",
  skyGradientTop: "#0B0B2A",
  skyGradientBottom: "#1A0533",
  gridLine: "#FF2D9530",
  starWhite: "#FFFFFF",
};

// Deterministic random for SSR safety (same as Floral Garden)
export function deterministicRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

// CSS Keyframes for arcade-specific animations
export const ARCADE_KEYFRAMES = `
  @keyframes arcadeBlink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  @keyframes arcadePulse {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  @keyframes arcadeGlow {
    0%, 100% { filter: drop-shadow(0 0 8px currentColor); }
    50% { filter: drop-shadow(0 0 20px currentColor); }
  }

  @keyframes arcadeScanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  @keyframes arcadeCoinSpin {
    0% { transform: scaleX(1); }
    25% { transform: scaleX(0.1); }
    50% { transform: scaleX(1); }
    75% { transform: scaleX(0.1); }
    100% { transform: scaleX(1); }
  }

  @keyframes arcadeFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  @keyframes arcadeShake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-4px); }
    40% { transform: translateX(4px); }
    60% { transform: translateX(-3px); }
    80% { transform: translateX(3px); }
  }

  @keyframes arcadeFlameFlicker {
    0%, 100% { transform: scaleY(1) scaleX(1); opacity: 1; }
    25% { transform: scaleY(1.15) scaleX(0.9); opacity: 0.9; }
    50% { transform: scaleY(0.9) scaleX(1.1); opacity: 1; }
    75% { transform: scaleY(1.1) scaleX(0.85); opacity: 0.85; }
  }

  @keyframes arcadeNeonPulse {
    0%, 100% {
      text-shadow: 0 0 7px currentColor, 0 0 20px currentColor, 0 0 40px currentColor;
    }
    50% {
      text-shadow: 0 0 4px currentColor, 0 0 10px currentColor, 0 0 20px currentColor;
    }
  }

  @keyframes arcadeGridScroll {
    0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
    100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
  }

  @keyframes arcadeStarTwinkle {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  @keyframes arcadePixelExplosion {
    0% { opacity: 1; transform: scale(1) translate(0, 0); }
    100% { opacity: 0; transform: scale(0.3) translate(var(--ex), var(--ey)); }
  }

  @keyframes arcadeTypewriter {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes arcadeCRTOn {
    0% { opacity: 0; transform: scaleY(0.005) scaleX(0.3); }
    30% { opacity: 0.6; transform: scaleY(0.005) scaleX(1); }
    50% { opacity: 1; transform: scaleY(1) scaleX(1); filter: brightness(2); }
    100% { opacity: 1; transform: scaleY(1) scaleX(1); filter: brightness(1); }
  }

  @keyframes arcadeVictoryFlash {
    0%, 100% { background-color: transparent; }
    50% { background-color: rgba(255, 255, 255, 0.08); }
  }
`;

// Default fallback data for when user doesn't provide custom values
export const ARCADE_DEFAULTS = {
  memories: [
    { title: "First Quest", date: "Level 1", text: "Remember when we couldn't stop laughing? That was the beginning of the adventure." },
    { title: "Co-op Mode", date: "Level 2", text: "Best player 2 I could ask for. We make the perfect team." },
    { title: "Side Quest", date: "Level 3", text: "That random detour we took? Best side quest ever." },
    { title: "Boss Fight", date: "Level 4", text: "When things got tough, you never quit. That's what heroes do." },
  ],
  powerups: [
    { type: "heart", name: "More Love", wish: "May you feel loved every single day of this new level." },
    { type: "star", name: "Star Power", wish: "May this year bring the most amazing moments of your life." },
    { type: "zap", name: "Speed Boost", wish: "For all the exciting new adventures waiting around the corner." },
    { type: "shield", name: "Shield Up", wish: "May nothing ever dim your light or slow you down." },
  ],
  secrets: [
    "SECRET AREA FOUND! You mean more to me than any high score ever could. 💛",
  ],
};
