"use client";

import { ARCADE_COLORS } from "./arcade-css";

// ─── Reusable SVG Pixel Art Sprites ───

// Mystery Block (? Block)
export function MysteryBlock({ size = 48, glow = false }: { size?: number; glow?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={glow ? "drop-shadow-[0_0_12px_#FFD700]" : ""}>
      <rect x="0" y="0" width="16" height="16" fill={ARCADE_COLORS.blockGold} />
      <rect x="1" y="1" width="14" height="14" fill={ARCADE_COLORS.neonYellow} />
      <rect x="2" y="2" width="12" height="1" fill="#FFF8" />
      <rect x="2" y="2" width="1" height="12" fill="#FFF4" />
      <rect x="13" y="3" width="1" height="11" fill="#0004" />
      <rect x="3" y="13" width="11" height="1" fill="#0004" />
      {/* Question Mark */}
      <rect x="6" y="4" width="4" height="1" fill={ARCADE_COLORS.blockBrown} />
      <rect x="5" y="5" width="1" height="1" fill={ARCADE_COLORS.blockBrown} />
      <rect x="10" y="5" width="1" height="1" fill={ARCADE_COLORS.blockBrown} />
      <rect x="9" y="6" width="2" height="1" fill={ARCADE_COLORS.blockBrown} />
      <rect x="8" y="7" width="1" height="1" fill={ARCADE_COLORS.blockBrown} />
      <rect x="7" y="8" width="1" height="1" fill={ARCADE_COLORS.blockBrown} />
      <rect x="7" y="10" width="1" height="1" fill={ARCADE_COLORS.blockBrown} />
    </svg>
  );
}

// Pixel Coin (spinning)
export function PixelCoin({ size = 24, spin = false }: { size?: number; spin?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className={`drop-shadow-[0_0_6px_#FFD700] ${spin ? "" : ""}`}
      style={spin ? { animation: "arcadeCoinSpin 0.6s ease-in-out infinite" } : undefined}
    >
      <circle cx="6" cy="6" r="5" fill={ARCADE_COLORS.pixelGold} stroke={ARCADE_COLORS.blockBrown} strokeWidth="1" />
      <circle cx="6" cy="6" r="3.5" fill={ARCADE_COLORS.neonYellow} />
      <rect x="5" y="3" width="2" height="6" rx="0.5" fill={ARCADE_COLORS.blockBrown} opacity={0.7} />
    </svg>
  );
}

// Heart Power-Up
export function PixelHeart({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 14" className="drop-shadow-[0_0_8px_#FF4444]">
      <path
        d="M8 13 L1 6 C-1 3 2 0 5 1 L8 4 L11 1 C14 0 17 3 15 6 Z"
        fill={ARCADE_COLORS.pixelRed}
        stroke="#CC0000"
        strokeWidth="0.5"
      />
      <path d="M4 3 L5 2 L7 4" fill="none" stroke="#FF8888" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

// Star Power-Up
export function PixelStar({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className="drop-shadow-[0_0_8px_#FFE600]">
      <polygon
        points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6"
        fill={ARCADE_COLORS.neonYellow}
        stroke={ARCADE_COLORS.blockBrown}
        strokeWidth="0.5"
      />
      <polygon
        points="8,3 9,6 12,6 10,8 11,11 8,9 5,11 6,8 4,6 7,6"
        fill="#FFFF88"
        opacity={0.6}
      />
    </svg>
  );
}

// Zap / Lightning Power-Up
export function PixelZap({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 16" className="drop-shadow-[0_0_8px_#00D4FF]">
      <polygon
        points="8,0 3,8 6,8 4,16 12,6 8,6 11,0"
        fill={ARCADE_COLORS.neonBlue}
        stroke="#0088CC"
        strokeWidth="0.5"
      />
      <polygon
        points="8,2 5,8 7,8 5.5,13 10,7 8,7 10,2"
        fill="#88EEFF"
        opacity={0.5}
      />
    </svg>
  );
}

// Shield Power-Up
export function PixelShield({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 16" className="drop-shadow-[0_0_8px_#BF40FF]">
      <path
        d="M7 1 L1 4 L1 9 C1 12 4 15 7 16 C10 15 13 12 13 9 L13 4 Z"
        fill={ARCADE_COLORS.neonPurple}
        stroke="#8800CC"
        strokeWidth="0.5"
      />
      <path
        d="M7 3 L3 5 L3 9 C3 11 5 13 7 14 C9 13 11 11 11 9 L11 5 Z"
        fill="#DD88FF"
        opacity={0.4}
      />
      <rect x="6" y="5" width="2" height="6" fill="#FFFFFF" opacity={0.5} rx="0.5" />
      <rect x="4" y="7" width="6" height="2" fill="#FFFFFF" opacity={0.5} rx="0.5" />
    </svg>
  );
}

// Pixel Cake (small, for decorative use)
export function PixelCake({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 20" className="drop-shadow-[0_0_10px_#FF2D95]">
      {/* Candles */}
      <rect x="7" y="1" width="1" height="4" fill={ARCADE_COLORS.pixelWhite} />
      <rect x="11" y="1" width="1" height="4" fill={ARCADE_COLORS.pixelWhite} />
      <rect x="15" y="1" width="1" height="4" fill={ARCADE_COLORS.pixelWhite} />
      {/* Flames */}
      <rect x="7" y="0" width="1" height="1" fill={ARCADE_COLORS.neonYellow} />
      <rect x="11" y="0" width="1" height="1" fill={ARCADE_COLORS.neonYellow} />
      <rect x="15" y="0" width="1" height="1" fill={ARCADE_COLORS.neonYellow} />
      {/* Top tier */}
      <rect x="4" y="5" width="16" height="5" fill={ARCADE_COLORS.neonPink} rx="1" />
      <rect x="5" y="6" width="14" height="1" fill="#FF88BB" />
      {/* Bottom tier */}
      <rect x="2" y="10" width="20" height="7" fill={ARCADE_COLORS.neonPurple} rx="1" />
      <rect x="3" y="11" width="18" height="1" fill="#DD88FF" />
      {/* Plate */}
      <rect x="1" y="17" width="22" height="3" fill={ARCADE_COLORS.pixelGray} rx="1" />
    </svg>
  );
}

// Pixel Firework Burst Particle
export function PixelBurst({ color = ARCADE_COLORS.neonPink, size = 6 }: { color?: string; size?: number }) {
  return (
    <div
      className="absolute rounded-sm"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  );
}

// Player Sprite (simple 8-bit character)
export function PlayerSprite({ size = 48, facing = "right" }: { size?: number; facing?: "left" | "right" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 20"
      className="drop-shadow-[0_0_6px_#00D4FF]"
      style={facing === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* Head */}
      <rect x="5" y="0" width="6" height="6" fill="#FFCC88" rx="1" />
      {/* Eyes */}
      <rect x="6" y="2" width="1" height="2" fill={ARCADE_COLORS.crtBlack} />
      <rect x="9" y="2" width="1" height="2" fill={ARCADE_COLORS.crtBlack} />
      {/* Mouth */}
      <rect x="7" y="4" width="2" height="1" fill="#CC8866" />
      {/* Body */}
      <rect x="4" y="6" width="8" height="7" fill={ARCADE_COLORS.neonBlue} rx="1" />
      {/* Arms */}
      <rect x="2" y="7" width="2" height="5" fill={ARCADE_COLORS.neonBlue} rx="0.5" />
      <rect x="12" y="7" width="2" height="5" fill={ARCADE_COLORS.neonBlue} rx="0.5" />
      {/* Hands */}
      <rect x="2" y="11" width="2" height="2" fill="#FFCC88" rx="0.5" />
      <rect x="12" y="11" width="2" height="2" fill="#FFCC88" rx="0.5" />
      {/* Legs */}
      <rect x="5" y="13" width="3" height="5" fill={ARCADE_COLORS.crtDarkBlue} rx="0.5" />
      <rect x="8" y="13" width="3" height="5" fill={ARCADE_COLORS.crtDarkBlue} rx="0.5" />
      {/* Shoes */}
      <rect x="4" y="17" width="4" height="3" fill={ARCADE_COLORS.pixelRed} rx="0.5" />
      <rect x="8" y="17" width="4" height="3" fill={ARCADE_COLORS.pixelRed} rx="0.5" />
    </svg>
  );
}
