"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ARCADE_COLORS } from "./arcade-css";
import { PixelCake } from "./PixelSprites";

// ─── ArcadeBoot: CRT Boot + INSERT COIN Title Screen ───

interface ArcadeBootProps {
  recipientName: string;
  senderName: string;
  onStart: () => void;
  playSound: (effect: string) => void;
}

export default function ArcadeBoot({ recipientName, senderName, onStart, playSound }: ArcadeBootProps) {
  const [phase, setPhase] = useState<"crt" | "boot" | "title" | "ready">("crt");

  useEffect(() => {
    // CRT turn-on effect
    const t1 = setTimeout(() => setPhase("boot"), 800);
    const t2 = setTimeout(() => setPhase("title"), 2200);
    const t3 = setTimeout(() => setPhase("ready"), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleStart = useCallback(() => {
    playSound("menuSelect");
    setTimeout(() => {
      playSound("levelUp");
      onStart();
    }, 150);
  }, [onStart, playSound]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: ARCADE_COLORS.crtBlack,
        fontFamily: "'Press Start 2P', 'Courier New', monospace",
        animation: phase === "crt" ? "arcadeCRTOn 0.8s ease-out forwards" : undefined,
        overflow: "hidden",
      }}
    >
      {/* CRT scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)`,
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* Boot Text Phase */}
      {phase === "boot" && (
        <div
          style={{
            color: ARCADE_COLORS.neonGreen,
            fontSize: "11px",
            lineHeight: "2",
            textAlign: "left",
            padding: "40px",
            animation: "arcadePulse 0.5s ease-in-out",
          }}
        >
          <div>BIOS v1.0 .......... OK</div>
          <div>MEMORY CHECK ........ 8192K OK</div>
          <div>LOADING BIRTHDAY.EXE ...</div>
          <div style={{ color: ARCADE_COLORS.neonYellow }}>
            PLAYER 1 DETECTED: {recipientName.toUpperCase()}
          </div>
        </div>
      )}

      {/* Title Screen Phase */}
      {(phase === "title" || phase === "ready") && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            padding: "40px 20px",
            textAlign: "center",
            animation: "arcadePulse 0.6s ease-out",
          }}
        >
          {/* Neon Title */}
          <div
            style={{
              fontSize: "clamp(20px, 5vw, 36px)",
              fontWeight: "bold",
              color: ARCADE_COLORS.neonPink,
              textShadow: `0 0 10px ${ARCADE_COLORS.neonPink}, 0 0 30px ${ARCADE_COLORS.neonPink}, 0 0 60px ${ARCADE_COLORS.neonPink}40`,
              animation: "arcadeNeonPulse 2s ease-in-out infinite",
              letterSpacing: "4px",
            }}
          >
            HAPPY
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontSize: "clamp(28px, 7vw, 52px)",
                fontWeight: "bold",
                color: ARCADE_COLORS.neonBlue,
                textShadow: `0 0 10px ${ARCADE_COLORS.neonBlue}, 0 0 30px ${ARCADE_COLORS.neonBlue}, 0 0 60px ${ARCADE_COLORS.neonBlue}40`,
                animation: "arcadeNeonPulse 2s ease-in-out 0.5s infinite",
                letterSpacing: "6px",
              }}
            >
              BIRTHDAY
            </div>
          </div>

          {/* Pixel Cake */}
          <div style={{ animation: "arcadeFloat 2s ease-in-out infinite", margin: "8px 0" }}>
            <PixelCake size={64} />
          </div>

          {/* Player Tag */}
          <div
            style={{
              fontSize: "clamp(10px, 2.5vw, 14px)",
              color: ARCADE_COLORS.neonYellow,
              textShadow: `0 0 6px ${ARCADE_COLORS.neonYellow}`,
              letterSpacing: "2px",
            }}
          >
            ★ PLAYER 1: {recipientName.toUpperCase()} ★
          </div>

          {/* From line */}
          <div
            style={{
              fontSize: "9px",
              color: ARCADE_COLORS.pixelGray,
              letterSpacing: "1px",
            }}
          >
            CRAFTED BY {senderName.toUpperCase()}
          </div>

          {/* INSERT COIN / START button */}
          {phase === "ready" ? (
            <button
              onClick={handleStart}
              style={{
                marginTop: "20px",
                padding: "14px 32px",
                fontSize: "clamp(11px, 2.5vw, 14px)",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                color: ARCADE_COLORS.crtBlack,
                background: `linear-gradient(180deg, ${ARCADE_COLORS.neonGreen}, #22CC00)`,
                border: `3px solid ${ARCADE_COLORS.neonGreen}`,
                boxShadow: `0 0 20px ${ARCADE_COLORS.neonGreen}80, inset 0 -3px 0 rgba(0,0,0,0.3)`,
                borderRadius: "4px",
                cursor: "pointer",
                animation: "arcadePulse 1.5s ease-in-out infinite",
                letterSpacing: "2px",
              }}
            >
              ▶ START GAME
            </button>
          ) : (
            <div
              style={{
                marginTop: "20px",
                fontSize: "12px",
                color: ARCADE_COLORS.neonGreen,
                animation: "arcadeBlink 1s step-end infinite",
                letterSpacing: "2px",
              }}
            >
              INSERT COIN
            </div>
          )}

          {/* Copyright footer */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              fontSize: "8px",
              color: ARCADE_COLORS.pixelGray,
              letterSpacing: "1px",
            }}
          >
            © 2024 BIRTHDAY QUEST STUDIOS
          </div>
        </div>
      )}
    </div>
  );
}
