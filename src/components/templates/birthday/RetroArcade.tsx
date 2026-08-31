"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { type WishData } from "@/lib/config";
import { ARCADE_KEYFRAMES, getArcadeDefaults } from "./retro-arcade/arcade-css";
import { useChiptuneEngine } from "./retro-arcade/ChiptuneEngine";
import NeonGrid from "./retro-arcade/NeonGrid";
import ArcadeHUD from "./retro-arcade/ArcadeHUD";
import ArcadeBoot from "./retro-arcade/ArcadeBoot";
import LevelIntro from "./retro-arcade/LevelIntro";
import DialogueSystem from "./retro-arcade/DialogueSystem";
import MemoryBlocks from "./retro-arcade/MemoryBlocks";
import PowerUpStage from "./retro-arcade/PowerUpStage";
import BossBattle from "./retro-arcade/BossBattle";
import VictoryCredits from "./retro-arcade/VictoryCredits";

interface TemplateProps {
  data: WishData;
  slug: string;
}

function safeParse<T>(jsonString: string | undefined, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

type GamePhase =
  | "boot"
  | "level1-intro"
  | "level1-dialogue"
  | "level2-intro"
  | "level2-play"
  | "level3-intro"
  | "level3-play"
  | "boss-intro"
  | "boss-play"
  | "victory";

// Konami Code
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
];

export function RetroArcade({ data }: TemplateProps) {
  // ── State ──
  const [phase, setPhase] = useState<GamePhase>("boot");
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lives] = useState(3);
  const [memoriesFound, setMemoriesFound] = useState(0);
  const [powerupsCollected, setPowerupsCollected] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Konami
  const konamiRef = useRef(0);
  const [konamiActivated, setKonamiActivated] = useState(false);

  // ── Sound ──
  const { play, toggleMute } = useChiptuneEngine();
  const playSound = useCallback(
    (effect: string) => {
      play(effect as Parameters<typeof play>[0]);
    },
    [play]
  );

  // ── Data ──
  const defaults = getArcadeDefaults(data.relationship);
  const memories = safeParse(data.arcadeMemories, defaults.memories);
  const powerups = safeParse(data.arcadePowerups, defaults.powerups);

  // ── Level label for HUD ──
  const levelLabel =
    phase.startsWith("level1") ? "1" :
    phase.startsWith("level2") ? "2" :
    phase.startsWith("level3") ? "3" :
    phase.startsWith("boss") ? "★" : "—";

  // ── Handlers ──
  const addScore = useCallback((pts: number) => {
    setScore((s) => s + pts);
  }, []);

  const addCoin = useCallback(() => {
    setCoins((c) => c + 1);
  }, []);

  // ── Konami Code Listener ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (konamiActivated) return;
      if (e.key === KONAMI_CODE[konamiRef.current]) {
        konamiRef.current++;
        if (konamiRef.current === KONAMI_CODE.length) {
          setKonamiActivated(true);
          addScore(9999);
          addCoin();
          playSound("victory");
        }
      } else {
        konamiRef.current = 0;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [konamiActivated, addScore, addCoin, playSound]);

  // ── Google Font for pixel text ──
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("press-start-2p-font")) return;
    const link = document.createElement("link");
    link.id = "press-start-2p-font";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    document.head.appendChild(link);
  }, []);

  // ── Phase Flow ──
  const handleBootStart = useCallback(() => {
    setPhase("level1-intro");
  }, []);

  const handleLevel1IntroComplete = useCallback(() => {
    setPhase("level1-dialogue");
  }, []);

  const handleLevel1DialogueComplete = useCallback(() => {
    setPhase("level2-intro");
  }, []);

  const handleLevel2IntroComplete = useCallback(() => {
    setPhase("level2-play");
  }, []);

  const handleMemoriesComplete = useCallback(() => {
    setMemoriesFound(memories.length);
    setPhase("level3-intro");
  }, [memories.length]);

  const handleLevel3IntroComplete = useCallback(() => {
    setPhase("level3-play");
  }, []);

  const handlePowerupsComplete = useCallback(() => {
    setPowerupsCollected(powerups.length);
    setPhase("boss-intro");
  }, [powerups.length]);

  const handleBossIntroComplete = useCallback(() => {
    setPhase("boss-play");
  }, []);

  const handleBossVictory = useCallback(() => {
    setPhase("victory");
  }, []);

  const handleRestart = useCallback(() => {
    setScore(0);
    setCoins(0);
    setMemoriesFound(0);
    setPowerupsCollected(0);
    konamiRef.current = 0;
    setKonamiActivated(false);
    setPhase("boot");
  }, []);

  // Track memories/powerups as they're collected
  const onMemoryScoreAdd = useCallback(
    (pts: number) => {
      addScore(pts);
      setMemoriesFound((m) => m + 1);
    },
    [addScore]
  );

  const onPowerupScoreAdd = useCallback(
    (pts: number) => {
      addScore(pts);
      setPowerupsCollected((p) => p + 1);
    },
    [addScore]
  );

  const showHUD = phase !== "boot" && !phase.endsWith("-intro");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0F",
        color: "#F0F0F0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Inject CSS keyframes */}
      <style dangerouslySetInnerHTML={{ __html: ARCADE_KEYFRAMES }} />

      {/* Neon Grid Background */}
      <NeonGrid />

      {/* HUD */}
      <ArcadeHUD
        score={score}
        coins={coins}
        lives={lives}
        level={levelLabel}
        playerName={data.recipientName}
        visible={showHUD}
      />

      {/* Sound Toggle */}
      {phase !== "boot" && (
        <button
          onClick={() => {
            const m = toggleMute();
            setIsMuted(m);
          }}
          style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            zIndex: 200,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.6)",
            border: "2px solid rgba(255,255,255,0.2)",
            color: "#F0F0F0",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      )}

      {/* ══ BOOT SCREEN ══ */}
      {phase === "boot" && (
        <ArcadeBoot
          recipientName={data.recipientName}
          senderName={data.senderName}
          onStart={handleBootStart}
          playSound={playSound}
        />
      )}

      {/* ══ LEVEL 1 INTRO ══ */}
      {phase === "level1-intro" && (
        <LevelIntro
          levelNumber={1}
          levelTitle="THE DAY YOU ARRIVED"
          subtitle="A hero was born..."
          onComplete={handleLevel1IntroComplete}
          playSound={playSound}
        />
      )}

      {/* ══ LEVEL 1 DIALOGUE ══ */}
      {phase === "level1-dialogue" && (
        <div
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            padding: "60px 20px",
          }}
        >
          {/* Hero section */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "60px",
              fontFamily: "'Press Start 2P', 'Courier New', monospace",
            }}
          >
            <div
              style={{
                fontSize: "clamp(24px, 6vw, 44px)",
                color: "#FF2D95",
                textShadow: "0 0 10px #FF2D95, 0 0 30px #FF2D95, 0 0 60px #FF2D9540",
                letterSpacing: "4px",
                animation: "arcadeNeonPulse 2s ease-in-out infinite",
                marginBottom: "12px",
              }}
            >
              HAPPY
            </div>
            <div
              style={{
                fontSize: "clamp(28px, 7vw, 52px)",
                color: "#00D4FF",
                textShadow: "0 0 10px #00D4FF, 0 0 30px #00D4FF, 0 0 60px #00D4FF40",
                letterSpacing: "6px",
                animation: "arcadeNeonPulse 2s ease-in-out 0.5s infinite",
              }}
            >
              BIRTHDAY
            </div>
            {data.age && (
              <div
                style={{
                  marginTop: "16px",
                  fontSize: "clamp(16px, 4vw, 24px)",
                  color: "#FFE600",
                  textShadow: "0 0 8px #FFE600",
                  letterSpacing: "3px",
                }}
              >
                LEVEL {data.age} UNLOCKED
              </div>
            )}
          </div>

          {/* Player sprite area */}
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "4px",
              background: "linear-gradient(135deg, #00D4FF, #BF40FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              animation: "arcadeFloat 2s ease-in-out infinite",
              boxShadow: "0 0 20px #00D4FF80",
              marginBottom: "40px",
            }}
          >
            🎮
          </div>

          <DialogueSystem
            speaker="NARRATOR"
            lines={[
              `Welcome, ${data.recipientName}!`,
              "Today is no ordinary day...",
              "A special quest has been prepared just for you.",
              "Mysteries await. Power-ups to collect. A final boss to face.",
              "Are you ready, Player 1? Let's go!",
            ]}
            onComplete={handleLevel1DialogueComplete}
            playSound={playSound}
          />
        </div>
      )}

      {/* ══ LEVEL 2 INTRO ══ */}
      {phase === "level2-intro" && (
        <LevelIntro
          levelNumber={2}
          levelTitle="MEMORY LANE"
          subtitle="Hit the blocks to unlock memories"
          onComplete={handleLevel2IntroComplete}
          playSound={playSound}
        />
      )}

      {/* ══ LEVEL 2 PLAY: MEMORY BLOCKS ══ */}
      {phase === "level2-play" && (
        <MemoryBlocks
          memories={memories}
          onScoreAdd={onMemoryScoreAdd}
          onCoinAdd={addCoin}
          onAllCollected={handleMemoriesComplete}
          playSound={playSound}
        />
      )}

      {/* ══ LEVEL 3 INTRO ══ */}
      {phase === "level3-intro" && (
        <LevelIntro
          levelNumber={3}
          levelTitle="BONUS STAGE"
          subtitle="Collect all the power-ups!"
          onComplete={handleLevel3IntroComplete}
          playSound={playSound}
        />
      )}

      {/* ══ LEVEL 3 PLAY: POWER-UPS ══ */}
      {phase === "level3-play" && (
        <PowerUpStage
          powerups={powerups}
          onScoreAdd={onPowerupScoreAdd}
          onCoinAdd={addCoin}
          onAllCollected={handlePowerupsComplete}
          playSound={playSound}
        />
      )}

      {/* ══ BOSS INTRO ══ */}
      {phase === "boss-intro" && (
        <LevelIntro
          levelNumber={4}
          levelTitle="FINAL BOSS"
          subtitle="The Birthday Cake awaits..."
          onComplete={handleBossIntroComplete}
          playSound={playSound}
        />
      )}

      {/* ══ BOSS PLAY ══ */}
      {phase === "boss-play" && (
        <BossBattle
          recipientName={data.recipientName}
          age={data.age}
          onVictory={handleBossVictory}
          onScoreAdd={addScore}
          playSound={playSound}
        />
      )}

      {/* ══ VICTORY CREDITS ══ */}
      {phase === "victory" && (
        <VictoryCredits
          recipientName={data.recipientName}
          senderName={data.senderName}
          message={data.message}
          score={score}
          coins={coins}
          memoriesFound={memoriesFound}
          totalMemories={memories.length}
          powerupsCollected={powerupsCollected}
          totalPowerups={powerups.length}
          onRestart={handleRestart}
          playSound={playSound}
        />
      )}

      {/* Konami Code Toast */}
      {konamiActivated && (
        <div
          style={{
            position: "fixed",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 300,
            padding: "12px 24px",
            background: "rgba(0,0,0,0.9)",
            border: "2px solid #39FF14",
            borderRadius: "6px",
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            fontSize: "10px",
            color: "#39FF14",
            textShadow: "0 0 8px #39FF14",
            letterSpacing: "2px",
            animation: "arcadeGlow 2s ease-in-out 3",
            pointerEvents: "none",
          }}
        >
          ★ CHEAT CODE ACTIVATED ★ +9999 PTS
        </div>
      )}
    </div>
  );
}
