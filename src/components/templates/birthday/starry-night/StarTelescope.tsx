"use client";

import { useState, useCallback } from "react";
import { STARRY_COLORS } from "./starry-css";
import type { CelestialSound } from "./CelestialAudio";

interface StarTelescopeProps {
  secrets: string[];
  playSound: (s: CelestialSound) => void;
}

export default function StarTelescope({ secrets, playSound }: StarTelescopeProps) {
  const [activeSecret, setActiveSecret] = useState<number | null>(null);

  const handleSpotSecret = useCallback(
    (idx: number) => {
      setActiveSecret(idx);
      playSound("twinkle");
    },
    [playSound]
  );

  return (
    <section
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px",
        position: "relative",
        zIndex: 10,
        textAlign: "center",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: STARRY_COLORS.indigoLight,
            marginBottom: 10,
            opacity: 0.7,
          }}
        >
          — Cosmic Secrets —
        </p>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 300,
            fontSize: "clamp(22px, 4vw, 34px)",
            color: STARRY_COLORS.starWhite,
            letterSpacing: "0.04em",
          }}
        >
          Look Through the Stargazer Telescope
        </h2>
        <div style={{ width: 50, height: 1, background: `linear-gradient(to right, transparent, ${STARRY_COLORS.starGold}60, transparent)`, margin: "14px auto 0" }} />
      </div>

      {/* Secret Star Nodes Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, maxWidth: 640 }}>
        {secrets.map((secret, i) => (
          <button
            key={i}
            onClick={() => handleSpotSecret(i)}
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              border: `1px dashed ${STARRY_COLORS.indigoLight}40`,
              background: `radial-gradient(circle, ${STARRY_COLORS.nebulaBlue}BB 0%, ${STARRY_COLORS.midnight}EE 100%)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              transition: "all 0.4s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = STARRY_COLORS.starGold;
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${STARRY_COLORS.indigoLight}40`;
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            <span style={{ fontSize: 24 }}>🔭</span>
            <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.2em", color: STARRY_COLORS.indigoLight, textTransform: "uppercase" }}>
              Sector #{i + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Secret Modal */}
      {activeSecret !== null && (
        <div
          onClick={() => setActiveSecret(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(1,3,11,0.88)",
            backdropFilter: "blur(10px)",
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 440,
              width: "100%",
              background: `${STARRY_COLORS.midnight}EE`,
              border: `1px solid ${STARRY_COLORS.starGold}30`,
              borderRadius: 24,
              padding: "40px 32px",
              textAlign: "center",
              position: "relative",
              boxShadow: `0 0 60px ${STARRY_COLORS.starGold}15`,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 16 }}>🌟</div>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: STARRY_COLORS.indigoLight,
                marginBottom: 16,
              }}
            >
              Telescope Discovery #{activeSecret + 1}
            </p>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(15px, 3vw, 18px)",
                color: STARRY_COLORS.textPrimary,
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              &ldquo;{secrets[activeSecret]}&rdquo;
            </p>
            <button
              onClick={() => setActiveSecret(null)}
              style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.3em", textTransform: "uppercase", color: STARRY_COLORS.textFaint, cursor: "pointer", background: "none", border: "none" }}
            >
              Close Telescope
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
