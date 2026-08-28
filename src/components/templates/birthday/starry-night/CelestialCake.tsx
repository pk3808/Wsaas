"use client";

import { useState, useCallback } from "react";
import { STARRY_COLORS } from "./starry-css";
import confetti from "canvas-confetti";
import type { CelestialSound } from "./CelestialAudio";

interface CelestialCakeProps {
  recipientName: string;
  age?: string;
  playSound: (s: CelestialSound) => void;
}

export default function CelestialCake({ recipientName, age, playSound }: CelestialCakeProps) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const handleBlow = useCallback(() => {
    if (candlesBlown || isBlowing) return;
    setIsBlowing(true);
    playSound("blow");

    setTimeout(() => {
      setCandlesBlown(true);
      setIsBlowing(false);
      playSound("victory");

      // Fire celestial star-shaped confetti
      const duration = 4000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 100,
        colors: [STARRY_COLORS.starGold, STARRY_COLORS.starWhite, STARRY_COLORS.auroraBlue, STARRY_COLORS.auroraPink],
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 40 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          shapes: ["star"],
        });
      }, 250);
    }, 800);
  }, [candlesBlown, isBlowing, playSound]);

  return (
    <section
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 20px",
        position: "relative",
        zIndex: 10,
        textAlign: "center",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: STARRY_COLORS.indigoLight,
            marginBottom: 12,
            opacity: 0.7,
          }}
        >
          — The Cosmic Birthday Cake —
        </p>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(26px, 5vw, 42px)",
            color: STARRY_COLORS.starWhite,
            letterSpacing: "0.04em",
          }}
        >
          Make a Starlight Wish
        </h2>
        {age && (
          <p style={{ fontFamily: "monospace", fontSize: 12, color: STARRY_COLORS.starGold, marginTop: 8, letterSpacing: "0.2em" }}>
            LEVEL {age} CELESTIAL MILESTONE
          </p>
        )}
      </div>

      {/* 3D Starlight Cake Container */}
      <div
        style={{
          position: "relative",
          width: "clamp(220px, 40vw, 300px)",
          height: 240,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: 40,
        }}
      >
        {/* Glowing Aura Behind Cake */}
        <div
          style={{
            position: "absolute",
            width: "120%",
            height: "80%",
            bottom: "0%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${STARRY_COLORS.starGold}25 0%, ${STARRY_COLORS.auroraPink}15 50%, transparent 70%)`,
            filter: "blur(20px)",
            animation: candlesBlown ? "cosmicPulse 3s ease-in-out infinite" : "none",
          }}
        />

        {/* Candles */}
        <div style={{ display: "flex", gap: 20, marginBottom: -4, zIndex: 10 }}>
          {[0, 1, 2].map((ci) => (
            <div key={ci} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Flame */}
              {!candlesBlown ? (
                <div
                  style={{
                    width: 10,
                    height: 18,
                    borderRadius: "50% 50% 35% 35%",
                    background: `radial-gradient(circle at 50% 80%, #FFF, ${STARRY_COLORS.starGold} 50%, #FF8C00 100%)`,
                    boxShadow: `0 0 12px ${STARRY_COLORS.starGold}, 0 0 24px ${STARRY_COLORS.starGold}80`,
                    animation: "candleFlicker 1.2s ease-in-out infinite",
                    animationDelay: `${ci * 0.3}s`,
                    transformOrigin: "bottom center",
                  }}
                />
              ) : (
                /* Smoke wisp */
                <div
                  style={{
                    width: 4,
                    height: 14,
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.4)",
                    filter: "blur(2px)",
                    animation: "starDust 2s ease-out forwards",
                  }}
                />
              )}
              {/* Candle Stick */}
              <div
                style={{
                  width: 8,
                  height: 36,
                  borderRadius: 4,
                  background: `linear-gradient(to right, ${STARRY_COLORS.stardust}, ${STARRY_COLORS.auroraBlue})`,
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Top Tier */}
        <div
          style={{
            width: "65%",
            height: 55,
            borderRadius: "16px 16px 8px 8px",
            background: `linear-gradient(135deg, ${STARRY_COLORS.indigoMid}, ${STARRY_COLORS.nebulaBlue})`,
            border: `1px solid ${STARRY_COLORS.indigoLight}40`,
            boxShadow: `0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)`,
            position: "relative",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 16 }}>✨</span>
        </div>

        {/* Bottom Tier */}
        <div
          style={{
            width: "95%",
            height: 75,
            borderRadius: "20px 20px 12px 12px",
            background: `linear-gradient(135deg, ${STARRY_COLORS.indigoDeep}, ${STARRY_COLORS.midnight})`,
            border: `1px solid ${STARRY_COLORS.indigoLight}50`,
            boxShadow: `0 8px 24px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.15)`,
            position: "relative",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <span style={{ fontSize: 14, opacity: 0.8 }}>🌟</span>
          <span style={{ fontSize: 14, opacity: 0.8 }}>🌙</span>
          <span style={{ fontSize: 14, opacity: 0.8 }}>🌟</span>
        </div>

        {/* Cake Stand Base */}
        <div
          style={{
            width: "110%",
            height: 14,
            borderRadius: 100,
            background: `linear-gradient(to right, ${STARRY_COLORS.starGold}80, ${STARRY_COLORS.starWhite}, ${STARRY_COLORS.starGold}80)`,
            boxShadow: `0 0 16px ${STARRY_COLORS.starGold}40`,
            zIndex: 3,
          }}
        />
      </div>

      {/* Interactive Action Button */}
      {!candlesBlown ? (
        <button
          onClick={handleBlow}
          disabled={isBlowing}
          style={{
            padding: "16px 44px",
            borderRadius: 100,
            border: `1px solid ${STARRY_COLORS.starGold}60`,
            background: `rgba(253,224,71,0.1)`,
            color: STARRY_COLORS.starGold,
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.4s ease",
            backdropFilter: "blur(6px)",
            boxShadow: `0 0 25px ${STARRY_COLORS.starGold}20`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(253,224,71,0.2)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 35px ${STARRY_COLORS.starGold}40`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(253,224,71,0.1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 25px ${STARRY_COLORS.starGold}20`;
          }}
        >
          {isBlowing ? "Blowing Out Candles... 💨" : "Blow Out the Candles 🕯️"}
        </button>
      ) : (
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(18px, 3.5vw, 24px)",
            color: STARRY_COLORS.starWhite,
            textShadow: `0 0 20px ${STARRY_COLORS.starGold}`,
            animation: "cosmicPulse 2s ease-in-out infinite",
          }}
        >
          ✨ May all your birthday wishes come true, {recipientName}! ✨
        </div>
      )}
    </section>
  );
}
