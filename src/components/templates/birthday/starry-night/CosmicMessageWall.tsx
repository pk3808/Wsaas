"use client";

import { useState, useCallback } from "react";
import { STARRY_COLORS } from "./starry-css";
import type { CelestialSound } from "./CelestialAudio";

interface CosmicMessageWallProps {
  letters: string[];
  senderName: string;
  message: string;
  playSound: (s: CelestialSound) => void;
}

export default function CosmicMessageWall({ letters, senderName, message, playSound }: CosmicMessageWallProps) {
  const [openLetter, setOpenLetter] = useState<number | null>(null);
  const [mainOpen, setMainOpen] = useState(false);

  const handleLetterOpen = useCallback((i: number) => {
    setOpenLetter(i);
    playSound("chime");
  }, [playSound]);

  const handleMainOpen = useCallback(() => {
    setMainOpen(true);
    playSound("reveal");
  }, [playSound]);

  return (
    <section
      style={{
        minHeight: "80vh",
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
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: STARRY_COLORS.indigoLight, marginBottom: 12, opacity: 0.7 }}>
          — Words Drifting Through the Night —
        </p>
        <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 300, fontSize: "clamp(22px, 4vw, 32px)", color: STARRY_COLORS.starWhite, letterSpacing: "0.04em" }}>
          Letters to the Stars
        </h2>
        <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${STARRY_COLORS.starGold}60, transparent)`, margin: "16px auto 0" }} />
      </div>

      {/* Floating letters */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, maxWidth: 700, marginBottom: 48 }}>
        {letters.map((letter, i) => (
          <button
            key={i}
            onClick={() => handleLetterOpen(i)}
            style={{
              width: "clamp(72px, 12vw, 88px)",
              height: "clamp(88px, 14vw, 108px)",
              borderRadius: 8,
              background: `linear-gradient(145deg, ${STARRY_COLORS.nebulaBlue}CC, ${STARRY_COLORS.indigoDeep}AA)`,
              border: `1px solid ${STARRY_COLORS.indigoLight}30`,
              boxShadow: `0 0 20px ${STARRY_COLORS.indigoMid}30`,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              animation: `letterFloat ${4 + i * 1.2}s ease-in-out infinite`,
              transition: "all 0.4s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${STARRY_COLORS.starGold}50`;
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 30px ${STARRY_COLORS.indigoMid}50, 0 0 60px ${STARRY_COLORS.starGold}10`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = `${STARRY_COLORS.indigoLight}30`;
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${STARRY_COLORS.indigoMid}30`;
            }}
          >
            {/* Wax seal dot */}
            <div style={{ position: "absolute", bottom: 10, width: 14, height: 14, borderRadius: "50%", backgroundColor: `${STARRY_COLORS.starGold}50`, border: `1px solid ${STARRY_COLORS.starGold}80` }} />
            {/* Envelope lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingBottom: 18 }}>
              <div style={{ width: 36, height: 1.5, background: `${STARRY_COLORS.indigoLight}50`, borderRadius: 2 }} />
              <div style={{ width: 28, height: 1.5, background: `${STARRY_COLORS.indigoLight}35`, borderRadius: 2 }} />
              <div style={{ width: 32, height: 1.5, background: `${STARRY_COLORS.indigoLight}40`, borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: 8, fontFamily: "monospace", letterSpacing: "0.2em", color: STARRY_COLORS.indigoLight, opacity: 0.5, textTransform: "uppercase" }}>
              Open
            </span>
          </button>
        ))}
      </div>

      {/* Main personal message CTA */}
      <button
        onClick={handleMainOpen}
        style={{
          padding: "16px 40px",
          borderRadius: 100,
          border: `1px solid ${STARRY_COLORS.starGold}40`,
          background: `rgba(253,224,71,0.05)`,
          color: STARRY_COLORS.starGold,
          fontFamily: "monospace",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "all 0.4s ease",
          backdropFilter: "blur(4px)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(253,224,71,0.12)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 30px rgba(253,224,71,0.15)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(253,224,71,0.05)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        }}
      >
        ✦ Read the Personal Message from {senderName}
      </button>

      {/* Individual letter modal */}
      {openLetter !== null && (
        <div
          onClick={() => setOpenLetter(null)}
          style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(1,3,11,0.88)", backdropFilter: "blur(10px)", padding: 24 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 520,
              width: "100%",
              background: `${STARRY_COLORS.midnight}EE`,
              border: `1px solid ${STARRY_COLORS.indigoLight}25`,
              borderRadius: 24,
              padding: "48px 40px",
              textAlign: "center",
              position: "relative",
              boxShadow: `0 0 60px ${STARRY_COLORS.indigoMid}30`,
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${STARRY_COLORS.starGold}50, transparent)` }} />
            <div style={{ fontSize: 24, marginBottom: 24 }}>✉️</div>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "clamp(15px, 3vw, 18px)", color: STARRY_COLORS.textPrimary, lineHeight: 1.9, marginBottom: 36 }}>
              &ldquo;{letters[openLetter]}&rdquo;
            </p>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: STARRY_COLORS.indigoLight, fontSize: 14 }}>
              — {senderName}
            </p>
            <button onClick={() => setOpenLetter(null)} style={{ marginTop: 32, fontSize: 10, fontFamily: "monospace", letterSpacing: "0.3em", textTransform: "uppercase", color: STARRY_COLORS.textFaint, cursor: "pointer", background: "none", border: "none" }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main message modal */}
      {mainOpen && (
        <div
          onClick={() => setMainOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(1,3,11,0.92)", backdropFilter: "blur(12px)", padding: 24 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 580,
              width: "100%",
              background: `${STARRY_COLORS.midnight}F2`,
              border: `1px solid ${STARRY_COLORS.starGold}25`,
              borderRadius: 28,
              padding: "56px 48px",
              position: "relative",
              boxShadow: `0 0 80px ${STARRY_COLORS.indigoMid}40, 0 0 160px ${STARRY_COLORS.starGold}08`,
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(to right, transparent, ${STARRY_COLORS.starGold}60, transparent)`, borderRadius: "28px 28px 0 0" }} />
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ fontSize: 12, fontFamily: "monospace", letterSpacing: "0.3em", textTransform: "uppercase", color: STARRY_COLORS.indigoLight, opacity: 0.7 }}>A note for you</div>
            </div>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(15px, 2.8vw, 19px)", color: STARRY_COLORS.textPrimary, lineHeight: 2, marginBottom: 36, whiteSpace: "pre-line", textAlign: "left" }}>
              {message}
            </p>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: STARRY_COLORS.starGold, fontSize: 16, textAlign: "right", opacity: 0.85 }}>
              — {senderName}
            </p>
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <button onClick={() => setMainOpen(false)} style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.3em", textTransform: "uppercase", color: STARRY_COLORS.textFaint, cursor: "pointer", background: "none", border: "none" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
