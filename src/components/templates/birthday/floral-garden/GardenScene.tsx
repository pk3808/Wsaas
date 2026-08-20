"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { GARDEN_COLORS, deterministicRandom } from "./garden-css";

interface GardenSceneProps {
  children: React.ReactNode;
  isActive: boolean;
}

// SVG Cherry Blossom Tree (left side) with organic growth & blooming
function CherryBlossomTreeLeft() {
  const blossoms = [
    [260, 250], [280, 220], [240, 230], [300, 210],
    [100, 270], [80, 250], [110, 260], [70, 240],
    [190, 270], [200, 250], [210, 260],
    [130, 290], [140, 300], [120, 310],
    [260, 200], [90, 230], [160, 280],
  ];

  return (
    <motion.svg
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 0.85 }}
      transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{ transformOrigin: "bottom left" }}
      className="absolute bottom-0 left-0 w-[280px] sm:w-[380px] h-auto pointer-events-none select-none"
      viewBox="0 0 400 600"
      fill="none"
    >
      {/* Trunk */}
      <path d="M180 600 C175 520 160 440 170 380 C175 340 180 310 190 280" stroke={GARDEN_COLORS.warmBrown} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M185 380 C200 340 220 300 260 260" stroke={GARDEN_COLORS.warmBrown} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M175 420 C150 370 120 330 100 280" stroke={GARDEN_COLORS.warmBrown} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M190 310 C210 270 240 240 280 220" stroke={GARDEN_COLORS.warmBrown} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M170 350 C140 310 110 290 80 250" stroke={GARDEN_COLORS.warmBrown} strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Blossom clusters with staggered blooming */}
      {blossoms.map(([cx, cy], i) => (
        <motion.g
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 + i * 0.08, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy} r={14 + (i % 3) * 4} fill={GARDEN_COLORS.blossomPink} opacity={0.5} />
          <circle cx={(cx as number) + 5} cy={(cy as number) - 3} r={10 + (i % 4) * 3} fill={GARDEN_COLORS.softBlossomPink} opacity={0.6} />
          <circle cx={(cx as number) - 4} cy={(cy as number) + 4} r={8 + (i % 3) * 3} fill={GARDEN_COLORS.dustyPink} opacity={0.35} />
        </motion.g>
      ))}
    </motion.svg>
  );
}

// SVG Cherry Blossom Tree (right side) with organic growth & blooming
function CherryBlossomTreeRight() {
  const blossoms = [
    [110, 260], [100, 240], [130, 250], [90, 230],
    [260, 200], [280, 270], [250, 220],
    [175, 240], [165, 250], [180, 230],
    [140, 270], [120, 280],
  ];

  return (
    <motion.svg
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 0.7 }}
      transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      style={{ transformOrigin: "bottom right" }}
      className="absolute bottom-0 right-0 w-[240px] sm:w-[320px] h-auto pointer-events-none select-none"
      viewBox="0 0 350 550"
      fill="none"
    >
      <path d="M200 550 C205 480 210 410 200 350 C195 310 185 280 175 250" stroke={GARDEN_COLORS.warmBrown} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M195 370 C170 330 140 300 110 270" stroke={GARDEN_COLORS.warmBrown} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M185 310 C200 270 230 240 260 210" stroke={GARDEN_COLORS.warmBrown} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M190 340 C220 310 250 290 280 270" stroke={GARDEN_COLORS.warmBrown} strokeWidth="4" fill="none" strokeLinecap="round" />

      {blossoms.map(([cx, cy], i) => (
        <motion.g
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 + i * 0.09, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy} r={12 + (i % 3) * 3} fill={GARDEN_COLORS.blossomPink} opacity={0.45} />
          <circle cx={(cx as number) - 3} cy={(cy as number) + 3} r={9 + (i % 3) * 2} fill={GARDEN_COLORS.softBlossomPink} opacity={0.5} />
        </motion.g>
      ))}
    </motion.svg>
  );
}

// Grass layer at the bottom with smooth spring entrance
function GrassLayer() {
  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      style={{ transformOrigin: "bottom" }}
      className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none select-none"
    >
      {/* Grass gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${GARDEN_COLORS.naturalGreen}dd 0%, ${GARDEN_COLORS.sage}88 50%, transparent 100%)`,
        }}
      />
      {/* Individual grass blades via SVG */}
      <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1200 100" preserveAspectRatio="none">
        {Array.from({ length: 60 }, (_, i) => {
          const x = i * 20 + deterministicRandom(i * 7) * 10;
          const h = 40 + deterministicRandom(i * 13) * 50;
          const sway = deterministicRandom(i * 19) > 0.5 ? 5 : -5;
          return (
            <path
              key={i}
              d={`M${x} 100 Q${x + sway} ${100 - h * 0.6} ${x + sway * 0.5} ${100 - h}`}
              stroke={i % 3 === 0 ? GARDEN_COLORS.deepSage : GARDEN_COLORS.naturalGreen}
              strokeWidth={1.5 + deterministicRandom(i * 3) * 1.5}
              fill="none"
              opacity={0.5 + deterministicRandom(i * 11) * 0.4}
              style={{ animation: `gardenLeafSway ${3 + (i % 4)}s ease-in-out ${(i % 5) * 0.5}s infinite` }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

// Sunlight glow with smooth warm sunrise fade-in
function SunlightGlow() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
      className="absolute top-0 right-0 w-[450px] h-[450px] pointer-events-none select-none"
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${GARDEN_COLORS.sunlightYellow}70 0%, ${GARDEN_COLORS.sunset}25 40%, transparent 70%)`,
          filter: "blur(40px)",
          animation: "gardenGlow 8s ease-in-out infinite",
        }}
      />
    </motion.div>
  );
}

// Glowing garden particles
function GardenParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {Array.from({ length: 15 }, (_, i) => {
        const left = deterministicRandom(i * 37) * 100;
        const top = 20 + deterministicRandom(i * 53) * 60;
        const size = 2 + deterministicRandom(i * 71) * 4;
        const dur = 5 + deterministicRandom(i * 97) * 8;
        const delay = deterministicRandom(i * 23) * 6;

        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              backgroundColor: GARDEN_COLORS.subtleGold,
              animation: `gardenParticle ${dur}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

export function GardenScene({ children, isActive }: GardenSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const x = ((e.clientX / clientWidth) - 0.5) * 2; // -1 to 1
    const y = ((e.clientY / clientHeight) - 0.5) * 2;
    setMouseOffset({ x: x * 8, y: y * 5 }); // subtle shift
  }, []);

  useEffect(() => {
    if (!isActive) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isActive, handleMouseMove]);

  if (!isActive) return null;

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Sky gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 -z-10"
        style={{
          background: `linear-gradient(180deg, 
            ${GARDEN_COLORS.skyBlue}40 0%, 
            ${GARDEN_COLORS.ivory} 35%, 
            ${GARDEN_COLORS.warmCream} 60%,
            ${GARDEN_COLORS.sage}30 100%)`,
        }}
      />

      {/* Background layer — moves slowly with mouse */}
      <div
        className="fixed inset-0 -z-[8] transition-transform duration-[2000ms] ease-out"
        style={{ transform: `translate(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px)` }}
      >
        <SunlightGlow />
        <GardenParticles />
      </div>

      {/* Midground layer — trees, moves medium */}
      <div
        className="fixed inset-0 -z-[6] transition-transform duration-[1500ms] ease-out"
        style={{ transform: `translate(${mouseOffset.x * 0.6}px, ${mouseOffset.y * 0.4}px)` }}
      >
        <CherryBlossomTreeLeft />
        <CherryBlossomTreeRight />
      </div>

      {/* Foreground layer — grass, moves most */}
      <div
        className="fixed inset-0 -z-[4] transition-transform duration-[1000ms] ease-out pointer-events-none"
        style={{ transform: `translate(${mouseOffset.x * 1}px, ${mouseOffset.y * 0.5}px)` }}
      >
        <GrassLayer />
      </div>

      {/* Soft vignette overlay */}
      <div
        className="fixed inset-0 -z-[2] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 50%, ${GARDEN_COLORS.ivory}60 100%)`,
        }}
      />

      {/* Content (scrollable) */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
