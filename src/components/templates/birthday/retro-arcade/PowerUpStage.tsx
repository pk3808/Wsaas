"use client";

import React, { useState, useCallback } from "react";
import { ARCADE_COLORS } from "./arcade-css";
import { PixelHeart, PixelStar, PixelZap, PixelShield } from "./PixelSprites";

// ─── PowerUpStage: Bonus Stage – Birthday Power-Ups ───

interface PowerUp {
  type: string;
  name: string;
  wish: string;
}

interface PowerUpStageProps {
  powerups: PowerUp[];
  onScoreAdd: (points: number) => void;
  onCoinAdd: () => void;
  onAllCollected: () => void;
  playSound: (effect: string) => void;
}

const POWERUP_ICON: Record<string, React.FC<{ size?: number }>> = {
  heart: PixelHeart,
  star: PixelStar,
  zap: PixelZap,
  shield: PixelShield,
};

const POWERUP_COLORS: Record<string, string> = {
  heart: ARCADE_COLORS.pixelRed,
  star: ARCADE_COLORS.neonYellow,
  zap: ARCADE_COLORS.neonBlue,
  shield: ARCADE_COLORS.neonPurple,
};

export default function PowerUpStage({ powerups, onScoreAdd, onCoinAdd, onAllCollected, playSound }: PowerUpStageProps) {
  const [collected, setCollected] = useState<Set<number>>(new Set());
  const [activeWish, setActiveWish] = useState<number | null>(null);

  const handleCollect = useCallback(
    (index: number) => {
      if (collected.has(index)) return;
      playSound("powerup");
      onScoreAdd(250);
      onCoinAdd();

      setCollected((prev) => {
        const next = new Set(prev);
        next.add(index);
        if (next.size === powerups.length) {
          setTimeout(() => onAllCollected(), 2000);
        }
        return next;
      });
      setActiveWish(index);
    },
    [collected, powerups.length, onScoreAdd, onCoinAdd, onAllCollected, playSound]
  );

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px 40px",
        zIndex: 10,
      }}
    >
      {/* Section Title */}
      <div
        style={{
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: "clamp(12px, 3vw, 16px)",
          color: ARCADE_COLORS.neonPurple,
          textShadow: `0 0 10px ${ARCADE_COLORS.neonPurple}`,
          letterSpacing: "3px",
          textAlign: "center",
          marginBottom: "12px",
          animation: "arcadeNeonPulse 2s ease-in-out infinite",
        }}
      >
        ★ BONUS STAGE ★
      </div>
      <div
        style={{
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: "9px",
          color: ARCADE_COLORS.pixelGray,
          textAlign: "center",
          marginBottom: "40px",
          letterSpacing: "1px",
        }}
      >
        COLLECT BIRTHDAY POWER-UPS!
      </div>

      {/* Power-Up Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(powerups.length, 2)}, 1fr)`,
          gap: "24px",
          maxWidth: "480px",
          width: "100%",
        }}
      >
        {powerups.map((pu, i) => {
          const isCollected = collected.has(i);
          const Icon = POWERUP_ICON[pu.type] || PixelStar;
          const color = POWERUP_COLORS[pu.type] || ARCADE_COLORS.neonYellow;

          return (
            <div
              key={i}
              onClick={() => handleCollect(i)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "28px 16px",
                background: isCollected
                  ? `${ARCADE_COLORS.crtBlack}C0`
                  : `radial-gradient(circle, ${color}15, transparent)`,
                border: `3px solid ${isCollected ? color + "40" : color + "80"}`,
                borderRadius: "12px",
                cursor: isCollected ? "default" : "pointer",
                transition: "all 0.4s ease",
                boxShadow: isCollected ? "none" : `0 0 25px ${color}30, inset 0 0 20px ${color}10`,
                transform: isCollected ? "scale(0.95)" : "scale(1)",
                animation: !isCollected ? "arcadeFloat 2.5s ease-in-out infinite" : undefined,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              <div
                style={{
                  animation: !isCollected ? "arcadeGlow 2s ease-in-out infinite" : undefined,
                  color: color,
                  transition: "all 0.4s ease",
                  opacity: isCollected ? 0.4 : 1,
                }}
              >
                <Icon size={48} />
              </div>

              <div
                style={{
                  fontFamily: "'Press Start 2P', 'Courier New', monospace",
                  fontSize: "10px",
                  color: isCollected ? ARCADE_COLORS.pixelGray : color,
                  textAlign: "center",
                  letterSpacing: "1px",
                  textShadow: isCollected ? "none" : `0 0 6px ${color}`,
                }}
              >
                {isCollected ? "✓ COLLECTED" : pu.name.toUpperCase()}
              </div>

              {isCollected && (
                <div
                  style={{
                    fontFamily: "'Press Start 2P', 'Courier New', monospace",
                    fontSize: "8px",
                    color: ARCADE_COLORS.neonGreen,
                    letterSpacing: "1px",
                  }}
                >
                  +250 PTS
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress */}
      <div
        style={{
          marginTop: "32px",
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: "10px",
          color: ARCADE_COLORS.pixelGray,
          letterSpacing: "2px",
        }}
      >
        {collected.size}/{powerups.length} POWER-UPS
      </div>

      {/* Wish Reveal Popup */}
      {activeWish !== null && (
        <div
          onClick={() => {
            playSound("menuSelect");
            setActiveWish(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `${ARCADE_COLORS.crtBlack}D0`,
            cursor: "pointer",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              maxWidth: "380px",
              width: "90%",
              background: `linear-gradient(135deg, ${ARCADE_COLORS.crtDeepPurple}, ${ARCADE_COLORS.crtBlack})`,
              border: `3px solid ${POWERUP_COLORS[powerups[activeWish].type] || ARCADE_COLORS.neonPurple}`,
              borderRadius: "8px",
              padding: "24px",
              boxShadow: `0 0 30px ${POWERUP_COLORS[powerups[activeWish].type] || ARCADE_COLORS.neonPurple}40`,
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              animation: "arcadePulse 0.3s ease-out",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div style={{ marginBottom: "16px", animation: "arcadeFloat 2s ease-in-out infinite" }}>
              {React.createElement(POWERUP_ICON[powerups[activeWish].type] || PixelStar, { size: 48 })}
            </div>

            <div
              style={{
                fontSize: "11px",
                color: POWERUP_COLORS[powerups[activeWish].type] || ARCADE_COLORS.neonYellow,
                letterSpacing: "2px",
                marginBottom: "16px",
                textShadow: `0 0 8px ${POWERUP_COLORS[powerups[activeWish].type]}`,
              }}
            >
              {powerups[activeWish].name.toUpperCase()} GET!
            </div>

            <div
              style={{
                fontSize: "10px",
                color: ARCADE_COLORS.pixelWhite,
                lineHeight: "2.2",
              }}
            >
              {powerups[activeWish].wish}
            </div>

            <div
              style={{
                marginTop: "20px",
                fontSize: "8px",
                color: ARCADE_COLORS.neonGreen,
                animation: "arcadeBlink 1s step-end infinite",
                letterSpacing: "1px",
                cursor: "pointer",
              }}
              onClick={() => {
                playSound("menuSelect");
                setActiveWish(null);
              }}
            >
              ▶ CLOSE
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
