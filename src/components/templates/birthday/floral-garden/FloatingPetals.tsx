"use client";

import { useMemo } from "react";
import { PETAL_PATHS, LEAF_PATHS, GARDEN_COLORS, deterministicRandom } from "./garden-css";

interface FloatingPetalsProps {
  count?: number;
  intensity?: "calm" | "normal" | "lush";
}

export function FloatingPetals({ count = 18, intensity = "normal" }: FloatingPetalsProps) {
  const actualCount = intensity === "calm" ? Math.floor(count * 0.5) : intensity === "lush" ? Math.floor(count * 1.5) : count;

  const petals = useMemo(() => {
    return Array.from({ length: actualCount }, (_, i) => {
      const seed = i + 1;
      const r = (n: number) => deterministicRandom(seed * 100 + n);

      const petalIndex = Math.floor(r(1) * PETAL_PATHS.length);
      const isLeaf = r(2) > 0.75;
      const path = isLeaf ? LEAF_PATHS[Math.floor(r(3) * LEAF_PATHS.length)] : PETAL_PATHS[petalIndex];

      const colors = isLeaf
        ? [GARDEN_COLORS.sage, GARDEN_COLORS.deepSage, GARDEN_COLORS.naturalGreen]
        : [GARDEN_COLORS.blossomPink, GARDEN_COLORS.softBlossomPink, GARDEN_COLORS.dustyPink, GARDEN_COLORS.softLavender];
      const color = colors[Math.floor(r(4) * colors.length)];

      const left = r(5) * 100;
      const size = 12 + r(6) * 16;
      const duration = 12 + r(7) * 18;
      const delay = r(8) * 15;
      const opacity = 0.3 + r(9) * 0.5;
      const direction = r(10) > 0.5 ? "gardenPetalFloat" : "gardenPetalFloatReverse";

      return { id: i, path, color, left, size, duration, delay, opacity, direction };
    });
  }, [actualCount]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-0"
          style={{
            left: `${petal.left}%`,
            animation: `${petal.direction} ${petal.duration}s linear ${petal.delay}s infinite`,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 25"
            fill={petal.color}
            style={{
              filter: `blur(${petal.size > 20 ? 1 : 0}px)`,
            }}
          >
            <path d={petal.path} />
          </svg>
        </div>
      ))}
    </div>
  );
}
