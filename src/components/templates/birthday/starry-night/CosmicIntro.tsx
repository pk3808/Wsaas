"use client";

import { useState, useEffect } from "react";
import { STARRY_COLORS } from "./starry-css";

interface CosmicIntroProps {
  recipientName: string;
  onEnter: () => void;
}

// A single drifting star particle for the intro
function IntroDust({ index }: { index: number }) {
  const left = (index * 73 + 11) % 100;
  const top = (index * 41 + 23) % 100;
  const size = 2 + (index % 3);
  const dur = 3 + (index % 5) * 1.2;
  const delay = (index % 9) * 0.6;
  const isGold = index % 4 === 0;

  return (
    <div
      style={{
        position: "absolute",
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: isGold ? STARRY_COLORS.starGold : STARRY_COLORS.starCream,
        opacity: 0,
        animation: `starDust ${dur}s ease-in-out ${delay}s infinite`,
        pointerEvents: "none",
      }}
    />
  );
}

export default function CosmicIntro({ recipientName, onEnter }: CosmicIntroProps) {
  const [phase, setPhase] = useState<"ignite" | "text" | "ready">("ignite");

  useEffect(() => {
    // Phase 1: A single star ignites
    const t1 = setTimeout(() => setPhase("text"), 1800);
    // Phase 2: Text fades in
    const t2 = setTimeout(() => setPhase("ready"), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      onClick={phase === "ready" ? onEnter : undefined}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: STARRY_COLORS.deepSpace,
        cursor: phase === "ready" ? "pointer" : "default",
        overflow: "hidden",
      }}
    >
      {/* Ambient star dust */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {Array.from({ length: 30 }, (_, i) => <IntroDust key={i} index={i} />)}
      </div>

      {/* Horizon nebula glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: `linear-gradient(to top, ${STARRY_COLORS.indigoDeep}80, transparent)`,
          pointerEvents: "none",
        }}
      />

      {/* Phase 1: Star ignition dot */}
      <div
        style={{
          width: phase === "ignite" ? 4 : 0,
          height: phase === "ignite" ? 4 : 0,
          borderRadius: "50%",
          backgroundColor: "#fff",
          boxShadow: "0 0 12px #fff, 0 0 40px rgba(255,252,224,0.6)",
          transition: "all 1.8s ease",
          marginBottom: phase === "text" || phase === "ready" ? 0 : 48,
          opacity: phase === "ignite" ? 1 : 0,
          position: "absolute",
        }}
      />

      {/* Phase 2+: Main content */}
      <div
        style={{
          opacity: phase !== "ignite" ? 1 : 0,
          transition: "opacity 1.5s ease",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          padding: "0 24px",
          maxWidth: 480,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Pre-title */}
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(14px, 3vw, 18px)",
            color: STARRY_COLORS.indigoLight,
            letterSpacing: "0.06em",
            opacity: 0.85,
          }}
        >
          "Tonight, the stars have something to tell you…"
        </p>

        {/* Main title */}
        <div style={{ lineHeight: 1.1 }}>
          <div
            style={{
              fontSize: "clamp(11px, 2vw, 13px)",
              fontFamily: "monospace",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: STARRY_COLORS.indigoLight,
              marginBottom: 12,
              opacity: 0.7,
            }}
          >
            A Celestial Birthday for
          </div>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(36px, 8vw, 60px)",
              fontWeight: 300,
              color: STARRY_COLORS.starWhite,
              textShadow: `0 0 30px rgba(255,252,224,0.3), 0 0 60px rgba(253,224,71,0.15)`,
              letterSpacing: "0.02em",
            }}
          >
            {recipientName}
          </h1>
          <div
            style={{
              height: 1,
              background: `linear-gradient(to right, transparent, ${STARRY_COLORS.starGold}60, transparent)`,
              marginTop: 16,
            }}
          />
        </div>

        {/* Secondary text */}
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(13px, 2.5vw, 16px)",
            color: STARRY_COLORS.textDim,
            lineHeight: 1.7,
            opacity: phase === "ready" ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        >
          "They&apos;ve been waiting for you."
        </p>

        {/* Enter button */}
        <button
          onClick={(e) => { e.stopPropagation(); onEnter(); }}
          style={{
            marginTop: 8,
            padding: "12px 36px",
            borderRadius: 100,
            border: `1px solid ${STARRY_COLORS.indigoLight}50`,
            background: "rgba(99,102,241,0.08)",
            color: STARRY_COLORS.indigoLight,
            fontFamily: "monospace",
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.5s ease",
            opacity: phase === "ready" ? 1 : 0,
            backdropFilter: "blur(4px)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = STARRY_COLORS.starGold + "80";
            (e.currentTarget as HTMLButtonElement).style.color = STARRY_COLORS.starWhite;
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${STARRY_COLORS.indigoLight}30`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = STARRY_COLORS.indigoLight + "50";
            (e.currentTarget as HTMLButtonElement).style.color = STARRY_COLORS.indigoLight;
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          Enter the Night ✦
        </button>

        {/* Skip hint */}
        <p
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            color: STARRY_COLORS.textFaint,
            letterSpacing: "0.2em",
            opacity: phase === "ready" ? 0.6 : 0,
            transition: "opacity 1s ease 1s",
          }}
        >
          or tap anywhere
        </p>
      </div>
    </div>
  );
}
