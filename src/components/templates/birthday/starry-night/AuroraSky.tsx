"use client";

import { STARRY_COLORS } from "./starry-css";

// Flowing aurora borealis effect using layered CSS animations
export default function AuroraSky() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
        opacity: 0.55,
      }}
    >
      {/* Aurora Band 1 — Green to Blue */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "-10%",
          width: "120%",
          height: "30%",
          background: `linear-gradient(
            180deg,
            transparent 0%,
            ${STARRY_COLORS.auroraGreen}18 30%,
            ${STARRY_COLORS.auroraBlue}22 60%,
            transparent 100%
          )`,
          filter: "blur(28px)",
          animation: "auroraWave 14s ease-in-out infinite",
          transformOrigin: "50% 50%",
        }}
      />

      {/* Aurora Band 2 — Pink to Violet */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "-5%",
          width: "110%",
          height: "22%",
          background: `linear-gradient(
            180deg,
            transparent 0%,
            ${STARRY_COLORS.auroraPink}14 35%,
            ${STARRY_COLORS["aurораViolet"]}18 65%,
            transparent 100%
          )`,
          filter: "blur(35px)",
          animation: "auroraWave2 18s ease-in-out infinite 2s",
          transformOrigin: "50% 50%",
        }}
      />

      {/* Aurora Band 3 — Subtle teal shimmer */}
      <div
        style={{
          position: "absolute",
          top: "2%",
          left: "0%",
          width: "100%",
          height: "18%",
          background: `linear-gradient(
            180deg,
            transparent 0%,
            ${STARRY_COLORS.auroraBlue}10 50%,
            transparent 100%
          )`,
          filter: "blur(50px)",
          animation: "auroraWave 22s ease-in-out infinite 6s",
          transformOrigin: "50% 50%",
        }}
      />

      {/* Aurora Band 4 — Bottom horizon glow */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "-15%",
          width: "130%",
          height: "14%",
          background: `linear-gradient(
            180deg,
            transparent 0%,
            ${STARRY_COLORS.indigoLight}12 50%,
            transparent 100%
          )`,
          filter: "blur(40px)",
          animation: "auroraWave2 26s ease-in-out infinite 3s",
          transformOrigin: "50% 50%",
        }}
      />

      {/* Horizon nebula glow — always present */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: `linear-gradient(
            to top,
            ${STARRY_COLORS.indigoDeep}60 0%,
            ${STARRY_COLORS.indigoMid}20 40%,
            transparent 100%
          )`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
