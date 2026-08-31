"use client";

import React, { useState, useCallback, useEffect } from "react";
import { type WishData } from "@/lib/config";
import { STARRY_KEYFRAMES, getStarryDefaults, STARRY_COLORS } from "./starry-night/starry-css";
import { useCelestialAudio } from "./starry-night/CelestialAudio";
import StargazeCanvas from "./starry-night/StargazeCanvas";
import AuroraSky from "./starry-night/AuroraSky";
import CosmicIntro from "./starry-night/CosmicIntro";
import CelestialMoon from "./starry-night/CelestialMoon";
import ConstellationWishes from "./starry-night/ConstellationWishes";
import MemoryOrbs from "./starry-night/MemoryOrbs";
import CosmicMessageWall from "./starry-night/CosmicMessageWall";
import CelestialCake from "./starry-night/CelestialCake";
import StarTelescope from "./starry-night/StarTelescope";
import StargazerHUD from "./starry-night/StargazerHUD";

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

export function StarryNight({ data }: TemplateProps) {
  const [entered, setEntered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  const { play, toggleMute, muted } = useCelestialAudio();

  // Scroll listener for moon & layer parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse move listener for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseParallax({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Safe parsed WishData or defaults
  const defaults = getStarryDefaults(data.relationship);
  const wishes = safeParse(data.starryWishes, defaults.wishes);
  const memories = safeParse(data.starryMemories, defaults.memories);
  const letters = safeParse(data.starryLetters, defaults.letters);
  const secrets = safeParse(data.starrySecrets, defaults.secrets);

  const handleEnter = useCallback(() => {
    setEntered(true);
    play("ambient");
    play("chime");
  }, [play]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: STARRY_COLORS.deepSpace,
        color: STARRY_COLORS.textPrimary,
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Inject Keyframe Animations */}
      <style dangerouslySetInnerHTML={{ __html: STARRY_KEYFRAMES }} />

      {/* Intro sequence overlay */}
      {!entered && (
        <CosmicIntro
          recipientName={data.recipientName}
          onEnter={handleEnter}
        />
      )}

      {/* Persistent Canvas Background */}
      <StargazeCanvas
        shootingStars={true}
        onShootingStar={() => play("whoosh")}
      />

      {/* Aurora Waves Background */}
      <AuroraSky />

      {/* Parallax 3D Moon */}
      <CelestialMoon
        parallaxX={mouseParallax.x}
        parallaxY={mouseParallax.y}
        scrollY={scrollY}
      />

      {/* Floating HUD */}
      {entered && (
        <StargazerHUD
          muted={muted}
          onToggleMute={toggleMute}
          recipientName={data.recipientName}
        />
      )}

      {/* Main Celestial Content Sections */}
      {entered && (
        <div style={{ position: "relative", zIndex: 10 }}>
          {/* Hero Section */}
          <section
            style={{
              minHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "120px 20px 60px",
            }}
          >
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: STARRY_COLORS.indigoLight,
                marginBottom: 16,
                opacity: 0.8,
              }}
            >
              ✦ Welcome to Your Universe ✦
            </p>
            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(40px, 8vw, 72px)",
                fontWeight: 300,
                color: STARRY_COLORS.starWhite,
                textShadow: `0 0 30px rgba(255,252,224,0.4), 0 0 80px rgba(253,224,71,0.2)`,
                letterSpacing: "0.02em",
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              Happy Birthday,
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 400, color: STARRY_COLORS.starGold }}>
                {data.recipientName}
              </span>
            </h1>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(15px, 3vw, 20px)",
                color: STARRY_COLORS.textDim,
                maxWidth: 480,
                lineHeight: 1.7,
              }}
            >
              &ldquo;Tonight, the whole sky belongs to you.&rdquo;
            </p>
          </section>

          {/* 1. Constellation Wishes */}
          <ConstellationWishes wishes={wishes} playSound={play} />

          {/* 2. Luminous Memory Orbs */}
          <MemoryOrbs memories={memories} playSound={play} />

          {/* 3. Secret Telescope Stargazer */}
          <StarTelescope secrets={secrets} playSound={play} />

          {/* 4. Starlight Birthday Cake & Candle Blow */}
          <CelestialCake
            recipientName={data.recipientName}
            age={data.age}
            playSound={play}
          />

          {/* 5. Cosmic Message & Floating Letters Wall */}
          <CosmicMessageWall
            letters={letters}
            senderName={data.senderName}
            message={data.message}
            playSound={play}
          />

          {/* Finale Footer */}
          <footer
            style={{
              padding: "80px 20px 120px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              borderTop: `1px solid ${STARRY_COLORS.indigoLight}15`,
            }}
          >
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 16, color: STARRY_COLORS.textDim }}>
              &ldquo;The night is quiet, but the stars will always shine for you.&rdquo;
            </p>
            <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: STARRY_COLORS.starGold }}>
              Until Your Next Adventure 🌙
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}
