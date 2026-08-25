"use client";

import React, { useEffect, useState } from "react";
import { ARCADE_COLORS } from "./arcade-css";
import { PixelHeart, PixelCoin } from "./PixelSprites";

// ─── ArcadeHUD: Persistent Top HUD Bar ───

interface ArcadeHUDProps {
  score: number;
  coins: number;
  lives: number;
  level: string;
  playerName: string;
  visible: boolean;
}

export default function ArcadeHUD({ score, coins, lives, level, playerName, visible }: ArcadeHUDProps) {
  const [displayScore, setDisplayScore] = useState(0);

  // Animated score counter
  useEffect(() => {
    if (displayScore === score) return;
    const diff = score - displayScore;
    const step = Math.max(1, Math.floor(Math.abs(diff) / 20));
    const timer = setTimeout(() => {
      setDisplayScore((prev) => {
        if (diff > 0) return Math.min(prev + step, score);
        return Math.max(prev + step, score);
      });
    }, 30);
    return () => clearTimeout(timer);
  }, [displayScore, score]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        background: `linear-gradient(180deg, ${ARCADE_COLORS.crtBlack}E0, ${ARCADE_COLORS.crtBlack}90)`,
        borderBottom: `2px solid ${ARCADE_COLORS.neonPink}60`,
        boxShadow: `0 2px 20px ${ARCADE_COLORS.neonPink}30`,
        fontFamily: "'Press Start 2P', 'Courier New', monospace",
        fontSize: "10px",
        color: ARCADE_COLORS.pixelWhite,
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Player Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
        <span style={{ color: ARCADE_COLORS.neonBlue, whiteSpace: "nowrap" }}>P1</span>
        <span
          style={{
            color: ARCADE_COLORS.neonGreen,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "90px",
          }}
        >
          {playerName.toUpperCase()}
        </span>
      </div>

      {/* Score */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ color: ARCADE_COLORS.pixelGray }}>SCORE</span>
        <span style={{ color: ARCADE_COLORS.neonYellow, minWidth: "60px", textAlign: "right" }}>
          {String(displayScore).padStart(6, "0")}
        </span>
      </div>

      {/* Coins */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <PixelCoin size={14} />
        <span style={{ color: ARCADE_COLORS.pixelGold }}>×{coins}</span>
      </div>

      {/* Level */}
      <div style={{ display: "none" }} className="sm:flex items-center gap-1">
        <span style={{ color: ARCADE_COLORS.pixelGray }}>LVL</span>
        <span style={{ color: ARCADE_COLORS.neonPurple }}>{level}</span>
      </div>

      {/* Lives (hearts) */}
      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        {Array.from({ length: lives }).map((_, i) => (
          <PixelHeart key={i} size={14} />
        ))}
      </div>
    </div>
  );
}
