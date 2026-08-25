"use client";

import React, { useEffect, useState } from "react";
import { ARCADE_COLORS, deterministicRandom } from "./arcade-css";

// ─── NeonGrid: Synthwave Parallax Background ───

export default function NeonGrid() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Generate deterministic stars
  const stars = Array.from({ length: 80 }, (_, i) => ({
    x: deterministicRandom(i * 7 + 1) * 100,
    y: deterministicRandom(i * 7 + 2) * 60,
    size: deterministicRandom(i * 7 + 3) * 2.5 + 0.5,
    delay: deterministicRandom(i * 7 + 4) * 5,
    duration: deterministicRandom(i * 7 + 5) * 3 + 2,
  }));

  const parallaxX = (mousePos.x - 0.5) * 15;
  const parallaxY = (mousePos.y - 0.5) * 10;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        background: `linear-gradient(180deg, ${ARCADE_COLORS.skyGradientTop} 0%, ${ARCADE_COLORS.crtDeepPurple} 50%, ${ARCADE_COLORS.skyGradientBottom} 100%)`,
      }}
    >
      {/* Parallax star field */}
      <div
        style={{
          position: "absolute",
          inset: "-20px",
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {stars.map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              backgroundColor: ARCADE_COLORS.starWhite,
              boxShadow: `0 0 ${star.size * 3}px ${ARCADE_COLORS.starWhite}`,
              animation: `arcadeStarTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Neon perspective grid floor */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-10%",
          right: "-10%",
          height: "45%",
          perspective: "400px",
          transform: `translateX(${parallaxX * 0.3}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div
          style={{
            width: "120%",
            height: "200%",
            marginLeft: "-10%",
            transformOrigin: "center top",
            transform: "rotateX(65deg)",
            backgroundImage: `
              linear-gradient(to right, ${ARCADE_COLORS.gridLine} 1px, transparent 1px),
              linear-gradient(to bottom, ${ARCADE_COLORS.gridLine} 1px, transparent 1px)
            `,
            backgroundSize: "60px 40px",
            animation: "arcadeGridScroll 2s linear infinite",
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,1) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,1) 100%)",
          }}
        />
        {/* Grid horizon glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${ARCADE_COLORS.neonPink}, ${ARCADE_COLORS.neonBlue}, ${ARCADE_COLORS.neonPink}, transparent)`,
            boxShadow: `0 0 30px ${ARCADE_COLORS.neonPink}, 0 0 60px ${ARCADE_COLORS.neonPink}40`,
            borderRadius: "50%",
          }}
        />
      </div>

      {/* CRT scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.08) 2px,
            rgba(0,0,0,0.08) 4px
          )`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
}
