"use client";

import { useState, useCallback } from "react";
import { STARRY_COLORS } from "./starry-css";
import type { CelestialSound } from "./CelestialAudio";

interface MemoryOrbsProps {
  memories: { title: string; text: string }[];
  playSound: (s: CelestialSound) => void;
}

const ORB_COLORS = [
  { glow: STARRY_COLORS.auroraGreen,  ring: "#34D39960", label: "Emerald Memory" },
  { glow: STARRY_COLORS.auroraBlue,   ring: "#67E8F960", label: "Sapphire Memory" },
  { glow: STARRY_COLORS.auroraPink,   ring: "#F472B660", label: "Rose Memory" },
  { glow: STARRY_COLORS["aurораViolet"], ring: "#A78BFA60", label: "Violet Memory" },
];

export default function MemoryOrbs({ memories, playSound }: MemoryOrbsProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleOpen = useCallback(
    (i: number) => {
      setOpenIndex(i);
      playSound("chime");
    },
    [playSound]
  );

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 20px",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 72 }}>
        <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: STARRY_COLORS.indigoLight, marginBottom: 12, opacity: 0.7 }}>
          — Luminous Memories —
        </p>
        <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 300, fontSize: "clamp(22px, 4vw, 32px)", color: STARRY_COLORS.starWhite, letterSpacing: "0.04em" }}>
          Memories That Still Shine
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "clamp(13px, 2.5vw, 15px)", color: STARRY_COLORS.textDim, marginTop: 12, maxWidth: 360, textAlign: "center" }}>
          &ldquo;Some memories never really disappear — they become part of the sky.&rdquo;
        </p>
        <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${STARRY_COLORS.starGold}60, transparent)`, margin: "16px auto 0" }} />
      </div>

      {/* Orbs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "clamp(32px, 6vw, 72px)",
          maxWidth: 800,
        }}
      >
        {memories.map((mem, i) => {
          const orb = ORB_COLORS[i % ORB_COLORS.length];

          return (
            <div
              key={i}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
            >
              {/* Orb button */}
              <button
                onClick={() => handleOpen(i)}
                style={{
                  width: "clamp(72px, 12vw, 96px)",
                  height: "clamp(72px, 12vw, 96px)",
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 35% 35%, ${orb.glow}40 0%, ${orb.glow}15 50%, transparent 70%)`,
                  border: `1px solid ${orb.ring}`,
                  boxShadow: `0 0 24px ${orb.glow}30, 0 0 48px ${orb.glow}15, inset 0 0 20px ${orb.glow}10`,
                  cursor: "pointer",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.4s ease",
                  animation: `cosmicFloat ${4 + i * 0.8}s ease-in-out infinite`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 40px ${orb.glow}60, 0 0 80px ${orb.glow}25, inset 0 0 30px ${orb.glow}20`;
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 24px ${orb.glow}30, 0 0 48px ${orb.glow}15, inset 0 0 20px ${orb.glow}10`;
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                }}
              >
                {/* Inner ping ring */}
                <div
                  style={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: "50%",
                    border: `1px solid ${orb.glow}30`,
                    animation: "orbPing 3s ease-out infinite",
                  }}
                />
                {/* Core glow dot */}
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: orb.glow,
                    boxShadow: `0 0 16px ${orb.glow}`,
                    opacity: 0.9,
                  }}
                />
              </button>

              {/* Label */}
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "monospace",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: orb.glow,
                  opacity: 0.6,
                }}
              >
                {orb.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {openIndex !== null && (
        <div
          onClick={() => setOpenIndex(null)}
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
              maxWidth: 460,
              width: "100%",
              background: `${STARRY_COLORS.midnight}EE`,
              border: `1px solid ${ORB_COLORS[openIndex % ORB_COLORS.length].ring}`,
              borderRadius: 24,
              padding: "48px 40px",
              textAlign: "center",
              position: "relative",
              boxShadow: `0 0 60px ${ORB_COLORS[openIndex % ORB_COLORS.length].glow}20`,
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${ORB_COLORS[openIndex % ORB_COLORS.length].glow}60, transparent)` }} />

            {/* Orb mini */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: `${ORB_COLORS[openIndex % ORB_COLORS.length].glow}20`,
                border: `1px solid ${ORB_COLORS[openIndex % ORB_COLORS.length].ring}`,
                boxShadow: `0 0 20px ${ORB_COLORS[openIndex % ORB_COLORS.length].glow}40`,
                margin: "0 auto 24px",
              }}
            />

            <h3
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: ORB_COLORS[openIndex % ORB_COLORS.length].glow,
                marginBottom: 16,
                opacity: 0.8,
              }}
            >
              {memories[openIndex]?.title}
            </h3>
            <div style={{ width: "60%", height: 1, background: `${STARRY_COLORS.indigoLight}20`, margin: "0 auto 24px" }} />
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(15px, 3vw, 18px)",
                color: STARRY_COLORS.textPrimary,
                lineHeight: 1.8,
                marginBottom: 36,
              }}
            >
              &ldquo;{memories[openIndex]?.text}&rdquo;
            </p>
            <button
              onClick={() => setOpenIndex(null)}
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
