"use client";

import { STARRY_COLORS } from "./starry-css";

interface StargazerHUDProps {
  muted: boolean;
  onToggleMute: () => void;
  recipientName: string;
}

export default function StargazerHUD({ muted, onToggleMute, recipientName }: StargazerHUDProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        right: 16,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pointerEvents: "none",
      }}
    >
      {/* Top Left Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(2,6,23,0.65)",
          border: `1px solid ${STARRY_COLORS.indigoLight}25`,
          backdropFilter: "blur(8px)",
          padding: "6px 16px",
          borderRadius: 100,
          pointerEvents: "auto",
        }}
      >
        <span style={{ fontSize: 12 }}>🌟</span>
        <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: STARRY_COLORS.textPrimary }}>
          {recipientName}&apos;s Night Sky
        </span>
      </div>

      {/* Top Right Sound Toggle */}
      <button
        onClick={onToggleMute}
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "rgba(2,6,23,0.65)",
          border: `1px solid ${STARRY_COLORS.indigoLight}25`,
          backdropFilter: "blur(8px)",
          color: STARRY_COLORS.textPrimary,
          fontSize: 16,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
          transition: "all 0.3s ease",
        }}
        title={muted ? "Unmute Celestial Sounds" : "Mute Sounds"}
      >
        {muted ? "🔇" : "🔔"}
      </button>
    </div>
  );
}
