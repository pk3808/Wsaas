"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ARCADE_COLORS } from "./arcade-css";

// ─── DialogueSystem: RPG-Style Typewriter Dialogue Box ───

interface DialogueSystemProps {
  speaker: string;
  lines: string[];
  onComplete: () => void;
  playSound: (effect: string) => void;
  speakerColor?: string;
}

export default function DialogueSystem({
  speaker,
  lines,
  onComplete,
  playSound,
  speakerColor = ARCADE_COLORS.neonBlue,
}: DialogueSystemProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const currentLine = lines[lineIndex] || "";
  const displayedText = currentLine.slice(0, charIndex);
  const isLineComplete = charIndex >= currentLine.length;
  const isLastLine = lineIndex >= lines.length - 1;

  // Typewriter effect
  useEffect(() => {
    if (charIndex >= currentLine.length) return;
    const speed = currentLine[charIndex] === " " ? 20 : 35;
    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, currentLine]);

  // Blinking cursor
  useEffect(() => {
    if (!isLineComplete) {
      setShowCursor(true);
      return;
    }
    const timer = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(timer);
  }, [isLineComplete]);

  const handleAdvance = useCallback(() => {
    if (!isLineComplete) {
      // Skip to end of line
      setCharIndex(currentLine.length);
      return;
    }
    playSound("menuSelect");
    if (isLastLine) {
      onComplete();
    } else {
      setLineIndex((prev) => prev + 1);
      setCharIndex(0);
    }
  }, [isLineComplete, isLastLine, currentLine.length, onComplete, playSound]);

  return (
    <div
      onClick={handleAdvance}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "16px",
        right: "16px",
        maxWidth: "600px",
        margin: "0 auto",
        zIndex: 80,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          background: `${ARCADE_COLORS.crtBlack}F0`,
          border: `3px solid ${ARCADE_COLORS.neonBlue}80`,
          borderRadius: "8px",
          padding: "16px 20px 20px",
          boxShadow: `0 0 20px ${ARCADE_COLORS.neonBlue}30, inset 0 0 30px ${ARCADE_COLORS.crtBlack}`,
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Speaker Name Tag */}
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "16px",
            padding: "3px 12px",
            background: ARCADE_COLORS.crtBlack,
            border: `2px solid ${speakerColor}`,
            borderRadius: "4px",
            fontSize: "9px",
            color: speakerColor,
            letterSpacing: "2px",
            textShadow: `0 0 6px ${speakerColor}`,
          }}
        >
          {speaker.toUpperCase()}
        </div>

        {/* Dialogue Text */}
        <div
          style={{
            fontSize: "clamp(10px, 2.5vw, 12px)",
            lineHeight: "2.2",
            color: ARCADE_COLORS.pixelWhite,
            minHeight: "48px",
            letterSpacing: "0.5px",
          }}
        >
          {displayedText}
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "12px",
              backgroundColor: showCursor ? ARCADE_COLORS.pixelWhite : "transparent",
              marginLeft: "2px",
              verticalAlign: "middle",
            }}
          />
        </div>

        {/* Advance Prompt */}
        {isLineComplete && (
          <div
            style={{
              position: "absolute",
              bottom: "6px",
              right: "12px",
              fontSize: "8px",
              color: ARCADE_COLORS.neonGreen,
              animation: "arcadeBlink 1s step-end infinite",
              letterSpacing: "1px",
            }}
          >
            {isLastLine ? "▶ CONTINUE" : "▼ NEXT"}
          </div>
        )}
      </div>
    </div>
  );
}
