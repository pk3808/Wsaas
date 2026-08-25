"use client";

import React, { useState, useCallback } from "react";
import { ARCADE_COLORS } from "./arcade-css";
import { MysteryBlock, PixelCoin } from "./PixelSprites";

// ─── MemoryBlocks: Level 2 – Mystery Block Memory Lane ───

interface Memory {
  title: string;
  date: string;
  text: string;
}

interface MemoryBlocksProps {
  memories: Memory[];
  onScoreAdd: (points: number) => void;
  onCoinAdd: () => void;
  onAllCollected: () => void;
  playSound: (effect: string) => void;
}

export default function MemoryBlocks({ memories, onScoreAdd, onCoinAdd, onAllCollected, playSound }: MemoryBlocksProps) {
  const [revealedBlocks, setRevealedBlocks] = useState<Set<number>>(new Set());
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [coinBursts, setCoinBursts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleBlockHit = useCallback(
    (index: number, e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (revealedBlocks.has(index)) return;
      playSound("blockBreak");

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const burstId = Date.now();
      setCoinBursts((prev) => [...prev, { id: burstId, x: rect.left + rect.width / 2, y: rect.top }]);
      setTimeout(() => setCoinBursts((prev) => prev.filter((b) => b.id !== burstId)), 1000);

      playSound("coin");
      onScoreAdd(100);
      onCoinAdd();

      setRevealedBlocks((prev) => {
        const next = new Set(prev);
        next.add(index);
        if (next.size === memories.length) {
          setTimeout(() => onAllCollected(), 1500);
        }
        return next;
      });
      setActiveCard(index);
    },
    [revealedBlocks, memories.length, onScoreAdd, onCoinAdd, onAllCollected, playSound]
  );

  const handleDismissCard = useCallback(() => {
    playSound("menuSelect");
    setActiveCard(null);
  }, [playSound]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px 40px",
        zIndex: 10,
      }}
    >
      {/* Section Title */}
      <div
        style={{
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: "clamp(12px, 3vw, 16px)",
          color: ARCADE_COLORS.neonYellow,
          textShadow: `0 0 10px ${ARCADE_COLORS.neonYellow}`,
          letterSpacing: "3px",
          textAlign: "center",
          marginBottom: "12px",
        }}
      >
        ? MYSTERY BLOCKS ?
      </div>
      <div
        style={{
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: "9px",
          color: ARCADE_COLORS.pixelGray,
          textAlign: "center",
          marginBottom: "40px",
          letterSpacing: "1px",
        }}
      >
        TAP BLOCKS TO UNLOCK MEMORIES
      </div>

      {/* Block Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(memories.length, 2)}, 1fr)`,
          gap: "24px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        {memories.map((memory, i) => {
          const isRevealed = revealedBlocks.has(i);
          return (
            <div
              key={i}
              onClick={(e) => handleBlockHit(i, e)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "24px 16px",
                background: isRevealed
                  ? `${ARCADE_COLORS.crtBlack}C0`
                  : `linear-gradient(135deg, ${ARCADE_COLORS.blockGold}20, ${ARCADE_COLORS.neonYellow}10)`,
                border: `3px solid ${isRevealed ? ARCADE_COLORS.neonGreen + "60" : ARCADE_COLORS.blockGold + "80"}`,
                borderRadius: "8px",
                cursor: isRevealed ? "default" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: isRevealed
                  ? `0 0 15px ${ARCADE_COLORS.neonGreen}20`
                  : `0 0 15px ${ARCADE_COLORS.blockGold}30`,
                transform: isRevealed ? "scale(0.98)" : "scale(1)",
                animation: !isRevealed ? "arcadeFloat 3s ease-in-out infinite" : undefined,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {isRevealed ? (
                <>
                  <div
                    style={{
                      fontFamily: "'Press Start 2P', 'Courier New', monospace",
                      fontSize: "10px",
                      color: ARCADE_COLORS.neonGreen,
                      textAlign: "center",
                      letterSpacing: "1px",
                    }}
                  >
                    ✓ {memory.title}
                  </div>
                  <div
                    style={{
                      fontSize: "8px",
                      fontFamily: "'Press Start 2P', 'Courier New', monospace",
                      color: ARCADE_COLORS.pixelGray,
                      letterSpacing: "1px",
                    }}
                  >
                    +100 PTS
                  </div>
                </>
              ) : (
                <>
                  <div style={{ animation: "arcadePulse 1.5s ease-in-out infinite" }}>
                    <MysteryBlock size={56} glow />
                  </div>
                  <div
                    style={{
                      fontFamily: "'Press Start 2P', 'Courier New', monospace",
                      fontSize: "8px",
                      color: ARCADE_COLORS.neonYellow,
                      animation: "arcadeBlink 1.5s step-end infinite",
                    }}
                  >
                    TAP!
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div
        style={{
          marginTop: "32px",
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: "10px",
          color: ARCADE_COLORS.pixelGray,
          letterSpacing: "2px",
        }}
      >
        {revealedBlocks.size}/{memories.length} FOUND
      </div>

      {/* Floating Coin Burst Particles */}
      {coinBursts.map((burst) => (
        <div key={burst.id} style={{ position: "fixed", left: burst.x - 10, top: burst.y - 10, zIndex: 200, pointerEvents: "none" }}>
          {Array.from({ length: 5 }).map((_, ci) => (
            <div
              key={ci}
              style={{
                position: "absolute",
                animation: `arcadePixelExplosion 0.8s ease-out forwards`,
                ["--ex" as string]: `${(ci - 2) * 30}px`,
                ["--ey" as string]: `${-30 - ci * 15}px`,
              }}
            >
              <PixelCoin size={12} />
            </div>
          ))}
        </div>
      ))}

      {/* Active Memory Card Popup */}
      {activeCard !== null && (
        <div
          onClick={handleDismissCard}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `${ARCADE_COLORS.crtBlack}D0`,
            cursor: "pointer",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              maxWidth: "380px",
              width: "90%",
              background: `linear-gradient(135deg, ${ARCADE_COLORS.crtDarkBlue}, ${ARCADE_COLORS.crtBlack})`,
              border: `3px solid ${ARCADE_COLORS.neonGreen}`,
              borderRadius: "8px",
              padding: "24px",
              boxShadow: `0 0 30px ${ARCADE_COLORS.neonGreen}40`,
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
              animation: "arcadePulse 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Item Found header */}
            <div
              style={{
                textAlign: "center",
                fontSize: "10px",
                color: ARCADE_COLORS.neonGreen,
                marginBottom: "16px",
                letterSpacing: "2px",
                animation: "arcadeNeonPulse 2s ease-in-out infinite",
              }}
            >
              ★ MEMORY FOUND ★
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: "12px",
                color: ARCADE_COLORS.neonYellow,
                textAlign: "center",
                marginBottom: "6px",
                textShadow: `0 0 8px ${ARCADE_COLORS.neonYellow}`,
              }}
            >
              {memories[activeCard].title}
            </div>

            {/* Date */}
            <div
              style={{
                fontSize: "8px",
                color: ARCADE_COLORS.pixelGray,
                textAlign: "center",
                marginBottom: "16px",
                letterSpacing: "1px",
              }}
            >
              {memories[activeCard].date}
            </div>

            {/* Text */}
            <div
              style={{
                fontSize: "10px",
                color: ARCADE_COLORS.pixelWhite,
                lineHeight: "2.2",
                textAlign: "center",
              }}
            >
              {memories[activeCard].text}
            </div>

            {/* Dismiss */}
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontSize: "8px",
                color: ARCADE_COLORS.neonGreen,
                animation: "arcadeBlink 1s step-end infinite",
                letterSpacing: "1px",
                cursor: "pointer",
              }}
              onClick={handleDismissCard}
            >
              ▶ CLOSE
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
