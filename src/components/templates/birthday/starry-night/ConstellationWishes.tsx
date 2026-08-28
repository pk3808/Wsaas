"use client";

import { useState, useCallback } from "react";
import { STARRY_COLORS } from "./starry-css";
import type { CelestialSound } from "./CelestialAudio";

interface ConstellationWishesProps {
  wishes: string[];
  playSound: (s: CelestialSound) => void;
}

// SVG constellation star points per wish
const CONSTELLATIONS = [
  // Wish 1 — Orion-like
  [
    { cx: 50, cy: 20 }, { cx: 30, cy: 45 }, { cx: 70, cy: 45 },
    { cx: 40, cy: 65 }, { cx: 60, cy: 65 }, { cx: 50, cy: 85 },
  ],
  // Wish 2 — Dipper-like
  [
    { cx: 20, cy: 30 }, { cx: 35, cy: 25 }, { cx: 50, cy: 28 },
    { cx: 65, cy: 35 }, { cx: 65, cy: 55 }, { cx: 55, cy: 70 }, { cx: 40, cy: 75 },
  ],
  // Wish 3 — Crown-like
  [
    { cx: 30, cy: 60 }, { cx: 40, cy: 40 }, { cx: 50, cy: 25 },
    { cx: 60, cy: 40 }, { cx: 70, cy: 60 }, { cx: 50, cy: 80 },
  ],
];

const LINE_PATHS = [
  "M50,20 L30,45 L40,65 L50,85 L60,65 L70,45 L50,20",
  "M20,30 L35,25 L50,28 L65,35 L65,55 L55,70 L40,75",
  "M30,60 L40,40 L50,25 L60,40 L70,60 L50,80 L30,60",
];

export default function ConstellationWishes({ wishes, playSound }: ConstellationWishesProps) {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [drawing, setDrawing] = useState<number | null>(null);

  const handleStarClick = useCallback(
    (wishIndex: number) => {
      if (!revealed.includes(wishIndex)) {
        playSound("twinkle");
        setDrawing(wishIndex);
        setTimeout(() => {
          setRevealed((r) => [...r, wishIndex]);
          setDrawing(null);
          setActive(wishIndex);
          playSound("reveal");
        }, 1200);
      } else {
        setActive(wishIndex);
        playSound("chime");
      }
    },
    [revealed, playSound]
  );

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 20px", position: "relative", zIndex: 10 }}>
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: STARRY_COLORS.indigoLight, marginBottom: 12, opacity: 0.7 }}>
          — Touch a Star to Unlock a Wish —
        </p>
        <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 300, fontSize: "clamp(22px, 4vw, 32px)", color: STARRY_COLORS.starWhite, letterSpacing: "0.04em" }}>
          Wishes Written in the Stars
        </h2>
        <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${STARRY_COLORS.starGold}60, transparent)`, margin: "16px auto 0" }} />
      </div>

      {/* Constellations grid */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 48, maxWidth: 900, margin: "0 auto" }}>
        {wishes.slice(0, 3).map((wish, wi) => {
          const isRevealed = revealed.includes(wi);
          const isDrawing = drawing === wi;
          const isActive = active === wi;
          const pts = CONSTELLATIONS[wi % CONSTELLATIONS.length];

          return (
            <div
              key={wi}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}
            >
              {/* SVG constellation */}
              <div
                onClick={() => handleStarClick(wi)}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  width: 160,
                  height: 160,
                }}
              >
                <svg viewBox="0 0 100 100" width="160" height="160" style={{ overflow: "visible" }}>
                  {/* Constellation lines */}
                  <path
                    d={LINE_PATHS[wi % LINE_PATHS.length]}
                    fill="none"
                    stroke={STARRY_COLORS.indigoLight}
                    strokeWidth="0.6"
                    strokeDasharray="3 3"
                    opacity={isRevealed || isDrawing ? 1 : 0.2}
                    style={{
                      transition: "opacity 1s ease",
                      strokeDashoffset: isDrawing ? 200 : 0,
                      animation: isDrawing ? "none" : undefined,
                    }}
                  />

                  {/* Stars */}
                  {pts.map((pt, si) => (
                    <g key={si}>
                      {/* Ping ring on hover */}
                      {isActive && (
                        <circle
                          cx={pt.cx} cy={pt.cy} r={si === 0 ? 8 : 5}
                          fill="none"
                          stroke={STARRY_COLORS.starGold}
                          strokeWidth="0.5"
                          opacity={0.4}
                          style={{ animation: "orbPing 2s ease-out infinite" }}
                        />
                      )}
                      {/* Star dot */}
                      <circle
                        cx={pt.cx} cy={pt.cy}
                        r={si === 0 ? 4 : 2.5}
                        fill={isRevealed ? STARRY_COLORS.starGold : STARRY_COLORS.starCream}
                        opacity={isRevealed ? 1 : 0.5}
                        style={{
                          filter: isRevealed ? `drop-shadow(0 0 6px ${STARRY_COLORS.starGold})` : "none",
                          transition: "all 0.8s ease",
                        }}
                      />
                    </g>
                  ))}
                </svg>

                {/* Unlock hint */}
                {!isRevealed && !isDrawing && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: -4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 9,
                      fontFamily: "monospace",
                      letterSpacing: "0.2em",
                      color: STARRY_COLORS.textFaint,
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    tap to reveal
                  </div>
                )}

                {/* Drawing indicator */}
                {isDrawing && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: STARRY_COLORS.starGold, animation: "cosmicPulse 0.5s ease-in-out infinite" }} />
                  </div>
                )}
              </div>

              {/* Revealed wish text */}
              <div
                style={{
                  maxWidth: 220,
                  textAlign: "center",
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(10px)",
                  transition: "all 1s ease",
                }}
              >
                <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "clamp(13px, 2.5vw, 15px)", color: STARRY_COLORS.textPrimary, lineHeight: 1.7, opacity: 0.9 }}>
                  &ldquo;{wish}&rdquo;
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for active wish */}
      {active !== null && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(1,3,11,0.85)",
            backdropFilter: "blur(8px)",
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 480,
              width: "100%",
              backgroundColor: `${STARRY_COLORS.nebulaBlue}CC`,
              border: `1px solid ${STARRY_COLORS.indigoLight}30`,
              borderRadius: 24,
              padding: "48px 40px",
              textAlign: "center",
              position: "relative",
              boxShadow: `0 0 60px ${STARRY_COLORS.indigoMid}40`,
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${STARRY_COLORS.starGold}50, transparent)` }} />
            <div style={{ fontSize: 28, marginBottom: 20 }}>✦</div>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "clamp(16px, 3vw, 22px)", color: STARRY_COLORS.starWhite, lineHeight: 1.7, marginBottom: 32 }}>
              &ldquo;{wishes[active]}&rdquo;
            </p>
            <button
              onClick={() => setActive(null)}
              style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.3em", textTransform: "uppercase", color: STARRY_COLORS.textFaint, cursor: "pointer", background: "none", border: "none" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
