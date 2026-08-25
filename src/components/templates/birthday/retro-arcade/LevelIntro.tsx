"use client";

import React, { useState, useEffect } from "react";
import { ARCADE_COLORS } from "./arcade-css";

// ─── LevelIntro: Full-Screen Level Transition Cinematic ───

interface LevelIntroProps {
  levelNumber: number;
  levelTitle: string;
  subtitle?: string;
  onComplete: () => void;
  playSound: (effect: string) => void;
}

export default function LevelIntro({ levelNumber, levelTitle, subtitle, onComplete, playSound }: LevelIntroProps) {
  const [phase, setPhase] = useState<"enter" | "show" | "exit">("enter");

  useEffect(() => {
    playSound("levelUp");
    const t1 = setTimeout(() => setPhase("show"), 400);
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    const t3 = setTimeout(() => onComplete(), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `${ARCADE_COLORS.crtBlack}F8`,
        fontFamily: "'Press Start 2P', 'Courier New', monospace",
        opacity: phase === "exit" ? 0 : 1,
        transition: "opacity 0.5s ease-out",
      }}
    >
      {/* Screen wipe bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: `linear-gradient(90deg, ${ARCADE_COLORS.neonPink}, ${ARCADE_COLORS.neonBlue}, ${ARCADE_COLORS.neonGreen})`,
          transform: phase === "enter" ? "scaleX(0)" : "scaleX(1)",
          transformOrigin: "left",
          transition: "transform 0.6s ease-out",
        }}
      />

      {/* Level Number */}
      <div
        style={{
          fontSize: "clamp(12px, 3vw, 16px)",
          color: ARCADE_COLORS.neonPink,
          letterSpacing: "6px",
          textShadow: `0 0 10px ${ARCADE_COLORS.neonPink}`,
          marginBottom: "16px",
          opacity: phase === "show" ? 1 : 0,
          transform: phase === "show" ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.4s ease-out",
        }}
      >
        — LEVEL {levelNumber} —
      </div>

      {/* Level Title */}
      <div
        style={{
          fontSize: "clamp(18px, 5vw, 32px)",
          color: ARCADE_COLORS.pixelWhite,
          letterSpacing: "4px",
          textShadow: `0 0 15px ${ARCADE_COLORS.neonBlue}80`,
          textAlign: "center",
          padding: "0 20px",
          opacity: phase === "show" ? 1 : 0,
          transform: phase === "show" ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
          transition: "all 0.5s ease-out 0.15s",
        }}
      >
        {levelTitle.toUpperCase()}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            marginTop: "12px",
            fontSize: "clamp(8px, 2vw, 10px)",
            color: ARCADE_COLORS.neonGreen,
            letterSpacing: "2px",
            opacity: phase === "show" ? 1 : 0,
            transition: "opacity 0.4s ease-out 0.3s",
          }}
        >
          {subtitle}
        </div>
      )}

      {/* Decorative pixel border */}
      <div
        style={{
          position: "absolute",
          bottom: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "6px",
          opacity: phase === "show" ? 0.4 : 0,
          transition: "opacity 0.4s ease-out 0.4s",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "6px",
              height: "6px",
              backgroundColor:
                i % 3 === 0
                  ? ARCADE_COLORS.neonPink
                  : i % 3 === 1
                  ? ARCADE_COLORS.neonBlue
                  : ARCADE_COLORS.neonGreen,
              borderRadius: "1px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
