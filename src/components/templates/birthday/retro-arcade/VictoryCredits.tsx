"use client";

import React, { useState, useEffect } from "react";
import { ARCADE_COLORS, deterministicRandom } from "./arcade-css";

// ─── VictoryCredits: Game Complete / High Score Screen ───

interface VictoryCreditsProps {
  recipientName: string;
  senderName: string;
  message: string;
  score: number;
  coins: number;
  memoriesFound: number;
  totalMemories: number;
  powerupsCollected: number;
  totalPowerups: number;
  onRestart: () => void;
  playSound: (effect: string) => void;
}

export default function VictoryCredits({
  recipientName,
  senderName,
  message,
  score,
  coins,
  memoriesFound,
  totalMemories,
  powerupsCollected,
  totalPowerups,
  onRestart,
  playSound,
}: VictoryCreditsProps) {
  const [showCredits, setShowCredits] = useState(false);
  const [starBurst, setStarBurst] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setShowCredits(true), 1500);
    const t2 = setTimeout(() => setStarBurst(false), 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Generate score rank
  const maxScore = totalMemories * 100 + totalPowerups * 250 + 5000 + 500 * 5;
  const percentage = Math.round((score / maxScore) * 100);
  const rank =
    percentage >= 95 ? "S" : percentage >= 80 ? "A" : percentage >= 60 ? "B" : percentage >= 40 ? "C" : "D";

  const rankColors: Record<string, string> = {
    S: ARCADE_COLORS.neonYellow,
    A: ARCADE_COLORS.neonGreen,
    B: ARCADE_COLORS.neonBlue,
    C: ARCADE_COLORS.neonPurple,
    D: ARCADE_COLORS.pixelGray,
  };

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
      {/* Star burst overlay */}
      {starBurst && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 15 }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${deterministicRandom(i * 5 + 1) * 100}%`,
                top: `${deterministicRandom(i * 5 + 2) * 100}%`,
                width: "4px",
                height: "4px",
                backgroundColor: [
                  ARCADE_COLORS.neonPink,
                  ARCADE_COLORS.neonBlue,
                  ARCADE_COLORS.neonGreen,
                  ARCADE_COLORS.neonYellow,
                ][i % 4],
                boxShadow: `0 0 8px currentColor`,
                animation: `arcadeStarTwinkle ${1 + deterministicRandom(i + 30)}s ease-in-out infinite`,
                animationDelay: `${deterministicRandom(i + 40) * 2}s`,
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
      )}

      {/* GAME COMPLETE Title */}
      <div
        style={{
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: "clamp(16px, 5vw, 28px)",
          color: ARCADE_COLORS.neonPink,
          textShadow: `0 0 10px ${ARCADE_COLORS.neonPink}, 0 0 30px ${ARCADE_COLORS.neonPink}, 0 0 60px ${ARCADE_COLORS.neonPink}40`,
          letterSpacing: "4px",
          textAlign: "center",
          marginBottom: "8px",
          animation: "arcadeNeonPulse 2s ease-in-out infinite",
        }}
      >
        GAME COMPLETE
      </div>

      {/* Birthday Message */}
      <div
        style={{
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: "clamp(12px, 3vw, 18px)",
          color: ARCADE_COLORS.neonYellow,
          textShadow: `0 0 8px ${ARCADE_COLORS.neonYellow}`,
          textAlign: "center",
          marginBottom: "32px",
          letterSpacing: "3px",
        }}
      >
        HAPPY BIRTHDAY, {recipientName.toUpperCase()}!
      </div>

      {showCredits && (
        <div
          style={{
            maxWidth: "420px",
            width: "100%",
            animation: "arcadePulse 0.6s ease-out",
          }}
        >
          {/* High Score Table */}
          <div
            style={{
              background: `${ARCADE_COLORS.crtBlack}E0`,
              border: `3px solid ${ARCADE_COLORS.neonBlue}60`,
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "24px",
              boxShadow: `0 0 20px ${ARCADE_COLORS.neonBlue}20`,
            }}
          >
            <div
              style={{
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                fontSize: "11px",
                color: ARCADE_COLORS.neonBlue,
                textAlign: "center",
                letterSpacing: "2px",
                marginBottom: "16px",
                textShadow: `0 0 6px ${ARCADE_COLORS.neonBlue}`,
              }}
            >
              ★ HIGH SCORE ★
            </div>

            {/* Rank */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Press Start 2P', 'Courier New', monospace",
                  fontSize: "36px",
                  color: rankColors[rank],
                  textShadow: `0 0 15px ${rankColors[rank]}, 0 0 30px ${rankColors[rank]}60`,
                }}
              >
                {rank}
              </span>
            </div>

            {/* Stats */}
            {[
              { label: "FINAL SCORE", value: String(score).padStart(6, "0"), color: ARCADE_COLORS.neonYellow },
              { label: "COINS", value: `×${coins}`, color: ARCADE_COLORS.pixelGold },
              { label: "MEMORIES", value: `${memoriesFound}/${totalMemories}`, color: ARCADE_COLORS.neonGreen },
              { label: "POWER-UPS", value: `${powerupsCollected}/${totalPowerups}`, color: ARCADE_COLORS.neonPurple },
              { label: "BOSS", value: "DEFEATED", color: ARCADE_COLORS.pixelRed },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 0",
                  borderBottom: i < 4 ? `1px solid ${ARCADE_COLORS.pixelDarkGray}` : "none",
                  fontFamily: "'Press Start 2P', 'Courier New', monospace",
                  fontSize: "9px",
                }}
              >
                <span style={{ color: ARCADE_COLORS.pixelGray, letterSpacing: "1px" }}>{stat.label}</span>
                <span style={{ color: stat.color, textShadow: `0 0 4px ${stat.color}` }}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Developer Credits / Personal Message */}
          <div
            style={{
              background: `${ARCADE_COLORS.crtBlack}E0`,
              border: `3px solid ${ARCADE_COLORS.neonPink}40`,
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "24px",
              boxShadow: `0 0 15px ${ARCADE_COLORS.neonPink}15`,
            }}
          >
            <div
              style={{
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                fontSize: "9px",
                color: ARCADE_COLORS.neonPink,
                textAlign: "center",
                letterSpacing: "2px",
                marginBottom: "16px",
              }}
            >
              — DEVELOPER NOTES —
            </div>

            <div
              style={{
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                fontSize: "10px",
                color: ARCADE_COLORS.pixelWhite,
                lineHeight: "2.4",
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              {message || `This game was crafted just for you. You are the real MVP. Never stop being amazing. 🎮`}
            </div>

            <div
              style={{
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                fontSize: "8px",
                color: ARCADE_COLORS.pixelGray,
                textAlign: "center",
                marginTop: "16px",
                letterSpacing: "1px",
              }}
            >
              WITH LOVE, {senderName.toUpperCase()}
            </div>
          </div>

          {/* Restart Button */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                playSound("menuSelect");
                onRestart();
              }}
              style={{
                padding: "12px 28px",
                fontSize: "10px",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                color: ARCADE_COLORS.crtBlack,
                background: `linear-gradient(180deg, ${ARCADE_COLORS.neonGreen}, #22CC00)`,
                border: `3px solid ${ARCADE_COLORS.neonGreen}`,
                boxShadow: `0 0 15px ${ARCADE_COLORS.neonGreen}60`,
                borderRadius: "4px",
                cursor: "pointer",
                letterSpacing: "2px",
                animation: "arcadePulse 2s ease-in-out infinite",
              }}
            >
              ▶ PLAY AGAIN
            </button>
          </div>

          {/* Copyright */}
          <div
            style={{
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              fontSize: "7px",
              color: ARCADE_COLORS.pixelGray,
              textAlign: "center",
              marginTop: "24px",
              letterSpacing: "1px",
              opacity: 0.6,
            }}
          >
            © 2024 BIRTHDAY QUEST STUDIOS
            <br />
            ALL RIGHTS RESERVED
          </div>
        </div>
      )}
    </div>
  );
}
