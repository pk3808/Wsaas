"use client";

import { useEffect, useRef } from "react";
import { starRandom, STARRY_COLORS } from "./starry-css";

interface StargazeCanvasProps {
  shootingStars?: boolean;
  onShootingStar?: () => void;
}

interface Star {
  x: number; y: number; r: number;
  alpha: number; speed: number;
  twinkleOffset: number;
}

export default function StargazeCanvas({ shootingStars = true, onShootingStar }: StargazeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onShootingStarRef = useRef(onShootingStar);
  onShootingStarRef.current = onShootingStar;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Build a stable star field using deterministic pseudo-random
    const STAR_COUNT = 350;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, i) => ({
      x: starRandom(i * 3 + 1) * width,
      y: starRandom(i * 3 + 2) * height,
      r: starRandom(i * 3 + 3) * 1.6 + 0.2,
      alpha: starRandom(i * 7 + 4),
      speed: (starRandom(i * 11 + 5) * 0.018) + 0.004,
      twinkleOffset: starRandom(i * 13 + 6) * Math.PI * 2,
    }));

    // Shooting star state
    interface Comet {
      x: number; y: number;
      vx: number; vy: number;
      len: number; alpha: number;
      life: number; maxLife: number;
    }
    let comets: Comet[] = [];
    let shootTimer = 0;
    const SHOOT_INTERVAL = 240 + Math.floor(starRandom(99) * 180); // 4-7s at 60fps

    let raf: number;
    let frame = 0;

    function spawnComet() {
      const startX = Math.random() * width * 0.5;
      const startY = Math.random() * height * 0.3;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.4;
      const speed = 8 + Math.random() * 6;
      comets.push({
        x: startX, y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: 80 + Math.random() * 80,
        alpha: 1, life: 0, maxLife: 60,
      });
      onShootingStarRef.current?.();
    }

    function draw() {
      if (!ctx) return;
      frame++;
      ctx.clearRect(0, 0, width, height);

      // ── Twinkling Stars ──
      const t = frame * 0.015;
      stars.forEach((star) => {
        const alpha = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t + star.twinkleOffset));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);

        // Gold tint for larger stars
        if (star.r > 1.2) {
          ctx.fillStyle = `rgba(253,224,71,${alpha * 0.7})`;
        } else {
          ctx.fillStyle = `rgba(255,252,224,${alpha})`;
        }
        ctx.fill();

        // Subtle cross glow on bright stars
        if (star.r > 1.3 && alpha > 0.7) {
          ctx.strokeStyle = `rgba(255,252,224,${alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.r * 3, star.y);
          ctx.lineTo(star.x + star.r * 3, star.y);
          ctx.moveTo(star.x, star.y - star.r * 3);
          ctx.lineTo(star.x, star.y + star.r * 3);
          ctx.stroke();
        }
      });

      // ── Shooting Stars (Comets) ──
      if (shootingStars) {
        shootTimer++;
        if (shootTimer >= SHOOT_INTERVAL) {
          shootTimer = 0;
          spawnComet();
        }

        comets = comets.filter((c) => c.life < c.maxLife);
        comets.forEach((c) => {
          c.life++;
          c.x += c.vx;
          c.y += c.vy;
          const progress = c.life / c.maxLife;
          const alpha = progress < 0.15
            ? progress / 0.15
            : progress > 0.75
            ? (1 - progress) / 0.25
            : 1;

          const tailX = c.x - (c.vx / Math.sqrt(c.vx * c.vx + c.vy * c.vy)) * c.len;
          const tailY = c.y - (c.vy / Math.sqrt(c.vx * c.vx + c.vy * c.vy)) * c.len;

          const grad = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
          grad.addColorStop(0, `rgba(255,252,224,0)`);
          grad.addColorStop(0.6, `rgba(253,224,71,${alpha * 0.5})`);
          grad.addColorStop(1, `rgba(255,255,255,${alpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(c.x, c.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Head sparkle
          ctx.beginPath();
          ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        });
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Re-position stars proportionally
      stars.forEach((star, i) => {
        star.x = starRandom(i * 3 + 1) * width;
        star.y = starRandom(i * 3 + 2) * height;
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [shootingStars]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity: 1,
      }}
    />
  );
}
