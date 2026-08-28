"use client";

import { useEffect, useRef } from "react";
import { STARRY_COLORS } from "./starry-css";

interface CelestialMoonProps {
  parallaxX?: number;
  parallaxY?: number;
  scrollY?: number;
}

export default function CelestialMoon({ parallaxX = 0, parallaxY = 0, scrollY = 0 }: CelestialMoonProps) {
  const parallaxOffset = scrollY * 0.35;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        paddingTop: `clamp(60px, 12vh, 120px)`,
        pointerEvents: "none",
        zIndex: 2,
        transform: `translateY(${parallaxOffset}px)`,
        transition: "transform 0.1s linear",
      }}
    >
      <div
        style={{
          transform: `translate(${parallaxX * 0.4}px, ${parallaxY * 0.4}px)`,
          transition: "transform 0.3s ease-out",
          position: "relative",
        }}
      >
        {/* Outer halo */}
        <div
          style={{
            position: "absolute",
            inset: "-60px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${STARRY_COLORS.starWhite}08 0%, transparent 70%)`,
            animation: "moonPulse 8s ease-in-out infinite",
          }}
        />

        {/* Mid halo */}
        <div
          style={{
            position: "absolute",
            inset: "-20px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${STARRY_COLORS.starGold}12 0%, transparent 70%)`,
            filter: "blur(8px)",
            animation: "moonPulse 6s ease-in-out infinite 1s",
          }}
        />

        {/* Moon body */}
        <div
          style={{
            width: "clamp(120px, 16vw, 220px)",
            height: "clamp(120px, 16vw, 220px)",
            borderRadius: "50%",
            background: `radial-gradient(
              ellipse at 35% 35%,
              ${STARRY_COLORS.starWhite} 0%,
              ${STARRY_COLORS.starCream} 40%,
              ${STARRY_COLORS.moonGlow} 70%,
              #C8B870 100%
            )`,
            boxShadow: `
              0 0 60px rgba(255,252,224,0.25),
              0 0 120px rgba(255,252,224,0.08),
              inset -20px -20px 40px rgba(0,0,0,0.15),
              inset 10px 10px 20px rgba(255,255,255,0.3)
            `,
            position: "relative",
            overflow: "hidden",
            animation: "moonPulse 10s ease-in-out infinite 2s",
          }}
        >
          {/* Mare / craters */}
          <div style={{ position: "absolute", top: "22%", left: "20%", width: "22%", height: "18%", background: "rgba(0,0,0,0.07)", borderRadius: "50%", filter: "blur(6px)" }} />
          <div style={{ position: "absolute", top: "50%", left: "55%", width: "28%", height: "22%", background: "rgba(0,0,0,0.09)", borderRadius: "50%", filter: "blur(8px)" }} />
          <div style={{ position: "absolute", top: "68%", left: "18%", width: "35%", height: "28%", background: "rgba(0,0,0,0.06)", borderRadius: "50%", filter: "blur(10px)" }} />
          <div style={{ position: "absolute", top: "35%", left: "40%", width: "15%", height: "12%", background: "rgba(0,0,0,0.04)", borderRadius: "50%", filter: "blur(4px)" }} />

          {/* Terminator shadow (day-night boundary) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(
                ellipse at 75% 50%,
                transparent 60%,
                rgba(2,6,23,0.12) 100%
              )`,
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Moon phase ring */}
        <div
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            border: `1px solid rgba(255,252,224,0.12)`,
            pointerEvents: "none",
          }}
        />

        {/* Star companions near moon */}
        {[
          { top: "10%", left: "110%", size: 4, delay: 0 },
          { top: "60%", left: "115%", size: 3, delay: 1.5 },
          { top: "-10%", left: "105%", size: 5, delay: 0.8 },
          { top: "80%", left: "-25%", size: 3, delay: 2 },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              backgroundColor: STARRY_COLORS.starGold,
              boxShadow: `0 0 ${s.size * 3}px ${STARRY_COLORS.starGold}80`,
              animation: `cosmicPulse ${3 + i}s ease-in-out infinite ${s.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
