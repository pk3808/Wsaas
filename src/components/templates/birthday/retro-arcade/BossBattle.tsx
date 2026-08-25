"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ARCADE_COLORS, deterministicRandom } from "./arcade-css";

// ─── BossBattle: Final Boss – The Birthday Cake ───

interface BossBattleProps {
  recipientName: string;
  age?: string;
  candleCount?: number;
  onVictory: () => void;
  onScoreAdd: (points: number) => void;
  playSound: (effect: string) => void;
}

export default function BossBattle({
  recipientName,
  age,
  candleCount: customCandleCount,
  onVictory,
  onScoreAdd,
  playSound,
}: BossBattleProps) {
  const candleCount = customCandleCount || (age ? Math.min(parseInt(age) || 5, 8) : 5);
  const [extinguished, setExtinguished] = useState<Set<number>>(new Set());
  const [shaking, setShaking] = useState(false);
  const [bossHp, setBossHp] = useState(100);
  const [defeated, setDefeated] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  const hpPerCandle = 100 / candleCount;

  const handleBlowCandle = useCallback(
    (index: number) => {
      if (extinguished.has(index) || defeated) return;

      playSound("candleBlow");
      playSound("bossHit");

      // Screen shake
      setShaking(true);
      setTimeout(() => setShaking(false), 300);

      onScoreAdd(500);

      setExtinguished((prev) => {
        const next = new Set(prev);
        next.add(index);
        const newHp = Math.max(0, 100 - next.size * hpPerCandle);
        setBossHp(newHp);

        if (next.size === candleCount) {
          // Boss defeated!
          setTimeout(() => {
            setDefeated(true);
            playSound("victory");
            onScoreAdd(5000);

            // Spawn confetti
            const newConfetti = Array.from({ length: 40 }, (_, ci) => ({
              id: Date.now() + ci,
              x: deterministicRandom(ci * 3 + 1) * 100,
              y: deterministicRandom(ci * 3 + 2) * 100,
              color: [
                ARCADE_COLORS.neonPink,
                ARCADE_COLORS.neonBlue,
                ARCADE_COLORS.neonGreen,
                ARCADE_COLORS.neonYellow,
                ARCADE_COLORS.neonPurple,
                ARCADE_COLORS.neonOrange,
              ][ci % 6],
            }));
            setConfetti(newConfetti);

            setTimeout(() => onVictory(), 4000);
          }, 500);
        }

        return next;
      });
    },
    [extinguished, defeated, candleCount, hpPerCandle, onScoreAdd, onVictory, playSound]
  );

  // Remove confetti after animation
  useEffect(() => {
    if (confetti.length === 0) return;
    const timer = setTimeout(() => setConfetti([]), 4000);
    return () => clearTimeout(timer);
  }, [confetti]);

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
        animation: shaking ? "arcadeShake 0.3s ease-out" : undefined,
      }}
    >
      {/* BOSS Title */}
      <div
        style={{
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontSize: "clamp(14px, 3.5vw, 18px)",
          color: ARCADE_COLORS.pixelRed,
          textShadow: `0 0 10px ${ARCADE_COLORS.pixelRed}, 0 0 30px ${ARCADE_COLORS.pixelRed}60`,
          letterSpacing: "4px",
          textAlign: "center",
          marginBottom: "8px",
          animation: defeated ? undefined : "arcadeNeonPulse 1.5s ease-in-out infinite",
        }}
      >
        {defeated ? "★ BOSS DEFEATED ★" : "⚠ BOSS BATTLE ⚠"}
      </div>

      {!defeated && (
        <div
          style={{
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            fontSize: "9px",
            color: ARCADE_COLORS.pixelGray,
            textAlign: "center",
            marginBottom: "24px",
            letterSpacing: "1px",
          }}
        >
          TAP CANDLES TO BLOW THEM OUT!
        </div>
      )}

      {/* Boss HP Bar */}
      <div
        style={{
          width: "min(320px, 90%)",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            fontSize: "8px",
            color: ARCADE_COLORS.pixelRed,
            marginBottom: "6px",
            letterSpacing: "1px",
          }}
        >
          BOSS HP
        </div>
        <div
          style={{
            height: "16px",
            background: `${ARCADE_COLORS.crtBlack}C0`,
            border: `2px solid ${ARCADE_COLORS.pixelRed}60`,
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${bossHp}%`,
              background:
                bossHp > 50
                  ? `linear-gradient(90deg, ${ARCADE_COLORS.neonGreen}, ${ARCADE_COLORS.neonYellow})`
                  : bossHp > 25
                  ? `linear-gradient(90deg, ${ARCADE_COLORS.neonYellow}, ${ARCADE_COLORS.neonOrange})`
                  : `linear-gradient(90deg, ${ARCADE_COLORS.neonOrange}, ${ARCADE_COLORS.pixelRed})`,
              transition: "width 0.5s ease-out, background 0.5s ease-out",
              boxShadow: `0 0 10px ${bossHp > 50 ? ARCADE_COLORS.neonGreen : ARCADE_COLORS.pixelRed}80`,
            }}
          />
        </div>
      </div>

      {/* Birthday Cake SVG */}
      <div
        style={{
          position: "relative",
          width: "min(300px, 80vw)",
          height: "min(260px, 60vw)",
          margin: "0 auto 30px",
        }}
      >
        <svg
          viewBox="0 0 200 180"
          width="100%"
          height="100%"
          style={{
            filter: defeated
              ? `drop-shadow(0 0 30px ${ARCADE_COLORS.neonPink}80)`
              : `drop-shadow(0 0 15px ${ARCADE_COLORS.neonPink}40)`,
            transition: "filter 0.5s ease",
          }}
        >
          {/* Plate */}
          <rect x="15" y="150" width="170" height="16" rx="4" fill={ARCADE_COLORS.pixelGray} />
          <rect x="20" y="152" width="160" height="4" fill="#AAAABB" />

          {/* Bottom tier */}
          <rect x="25" y="110" width="150" height="42" rx="4" fill={ARCADE_COLORS.neonPurple} />
          <rect x="30" y="114" width="140" height="6" fill="#DD88FF" opacity={0.5} />
          <rect x="30" y="140" width="140" height="6" fill="#DD88FF" opacity={0.3} />

          {/* Middle tier */}
          <rect x="45" y="72" width="110" height="40" rx="4" fill={ARCADE_COLORS.neonPink} />
          <rect x="50" y="76" width="100" height="5" fill="#FF88BB" opacity={0.5} />
          <rect x="50" y="100" width="100" height="5" fill="#FF88BB" opacity={0.3} />

          {/* Top tier */}
          <rect x="65" y="40" width="70" height="34" rx="4" fill={ARCADE_COLORS.neonBlue} />
          <rect x="70" y="44" width="60" height="4" fill="#88EEFF" opacity={0.5} />
          <rect x="70" y="62" width="60" height="4" fill="#88EEFF" opacity={0.3} />

          {/* Frosting drips */}
          {[30, 55, 80, 105, 130, 155].map((x, i) => (
            <rect
              key={`drip-b-${i}`}
              x={x}
              y={108}
              width={6}
              height={deterministicRandom(i + 10) * 10 + 6}
              rx={3}
              fill="#FF88DD"
              opacity={0.6}
            />
          ))}
          {[50, 75, 100, 125].map((x, i) => (
            <rect
              key={`drip-m-${i}`}
              x={x}
              y={70}
              width={5}
              height={deterministicRandom(i + 20) * 8 + 5}
              rx={2.5}
              fill="#88EEFF"
              opacity={0.6}
            />
          ))}

          {/* Candles */}
          {Array.from({ length: candleCount }).map((_, i) => {
            const spacing = 60 / (candleCount + 1);
            const cx = 70 + spacing * (i + 1);
            const isOut = extinguished.has(i);

            return (
              <g key={`candle-${i}`} style={{ cursor: isOut ? "default" : "pointer" }} onClick={() => handleBlowCandle(i)}>
                {/* Candle stick */}
                <rect
                  x={cx - 2}
                  y={18}
                  width={4}
                  height={24}
                  fill={i % 2 === 0 ? ARCADE_COLORS.pixelWhite : ARCADE_COLORS.neonYellow}
                  stroke={ARCADE_COLORS.pixelGray}
                  strokeWidth={0.5}
                />
                {/* Stripe */}
                <rect
                  x={cx - 2}
                  y={26}
                  width={4}
                  height={3}
                  fill={i % 2 === 0 ? ARCADE_COLORS.neonPink : ARCADE_COLORS.neonBlue}
                  opacity={0.6}
                />
                {/* Flame or smoke */}
                {!isOut ? (
                  <g style={{ animation: "arcadeFlameFlicker 0.4s ease-in-out infinite", transformOrigin: `${cx}px 18px` }}>
                    <ellipse cx={cx} cy={13} rx={4} ry={6} fill={ARCADE_COLORS.neonYellow} opacity={0.9} />
                    <ellipse cx={cx} cy={14} rx={2.5} ry={4} fill={ARCADE_COLORS.neonOrange} opacity={0.7} />
                    <ellipse cx={cx} cy={15} rx={1.5} ry={2.5} fill="#FFFFFF" opacity={0.8} />
                  </g>
                ) : (
                  <g>
                    {/* Smoke puff */}
                    <circle cx={cx} cy={12} r={3} fill={ARCADE_COLORS.pixelGray} opacity={0.3} />
                    <circle cx={cx - 1} cy={8} r={2} fill={ARCADE_COLORS.pixelGray} opacity={0.15} />
                  </g>
                )}
              </g>
            );
          })}

          {/* Age label on cake */}
          {age && (
            <text
              x="100"
              y="95"
              textAnchor="middle"
              fill={ARCADE_COLORS.neonYellow}
              fontFamily="'Press Start 2P', monospace"
              fontSize="12"
              style={{
                textShadow: `0 0 6px ${ARCADE_COLORS.neonYellow}`,
              }}
            >
              {age}
            </text>
          )}
        </svg>

        {/* Defeat flash */}
        {defeated && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "8px",
              animation: "arcadeVictoryFlash 0.5s ease-in-out 3",
            }}
          />
        )}
      </div>

      {/* Defeat message */}
      {defeated && (
        <div
          style={{
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            fontSize: "clamp(14px, 4vw, 20px)",
            color: ARCADE_COLORS.neonGreen,
            textShadow: `0 0 10px ${ARCADE_COLORS.neonGreen}, 0 0 30px ${ARCADE_COLORS.neonGreen}60`,
            textAlign: "center",
            letterSpacing: "3px",
            animation: "arcadeNeonPulse 1.5s ease-in-out infinite",
          }}
        >
          HAPPY BIRTHDAY
          <br />
          {recipientName.toUpperCase()}!
        </div>
      )}

      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          style={{
            position: "fixed",
            left: `${c.x}%`,
            top: "-5%",
            width: "8px",
            height: "8px",
            backgroundColor: c.color,
            boxShadow: `0 0 6px ${c.color}`,
            borderRadius: "2px",
            animation: `arcadePixelExplosion 3s ease-out forwards`,
            ["--ex" as string]: `${(c.x - 50) * 0.5}px`,
            ["--ey" as string]: `${c.y + 100}vh`,
            zIndex: 200,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}
