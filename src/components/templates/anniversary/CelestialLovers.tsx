"use client";

import React, { useEffect, useRef, useState } from "react";
import { type WishData } from "@/lib/config";
import { motion } from "framer-motion";
function parseData<T>(jsonString: string | undefined, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    return fallback;
  }
}

interface TemplateProps {
  data: WishData;
  slug: string;
}

function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw stars
      ctx.fillStyle = "#E0FFFF";
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw constellation lines between close stars
      ctx.strokeStyle = "rgba(224, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }

        // Draw line to mouse if close
        const dxMouse = stars[i].x - mousePos.x;
        const dyMouse = stars[i].y - mousePos.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          ctx.strokeStyle = `rgba(224, 255, 255, ${1 - distMouse / 150})`;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
          ctx.strokeStyle = "rgba(224, 255, 255, 0.15)"; // reset
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

export function CelestialLovers({ data }: TemplateProps) {
  const defaultConstellations = [
    { name: "The Meeting", text: "When our stars first aligned." },
    { name: "The Journey", text: "Navigating the galaxy together." },
    { name: "The Future", text: "Infinite space, infinite love." }
  ];

  const constellations = parseData(data.celestialConstellations, defaultConstellations);

  return (
    <div className="relative min-h-screen bg-black text-[#E0FFFF] font-serif overflow-hidden">

      {/* Background radial glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0f172a] via-black to-black pointer-events-none z-0" />

      <ConstellationCanvas />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="min-h-[80vh] flex flex-col items-center justify-center"
        >
          {data.yearsTogether && (
            <div className="mb-6 text-sm tracking-[0.4em] uppercase text-cyan-200/70">
              {data.yearsTogether}
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-light tracking-wide mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-100 to-blue-200">
            {data.recipientName}
          </h1>
          <div className="text-xl md:text-2xl text-cyan-100/60 font-light italic">
            Written in the stars...
          </div>
        </motion.div>

        <div className="w-full max-w-2xl my-32 space-y-32">
          {constellations.map((constellation: {name: string, text: string}, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1 }}
              className="relative p-8 border border-cyan-500/20 rounded-full backdrop-blur-sm bg-cyan-950/10"
            >
              <h3 className="text-2xl text-cyan-200 tracking-widest uppercase mb-4">{constellation.name}</h3>
              <p className="text-lg text-cyan-100/80 italic">{constellation.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="max-w-2xl mt-20 pb-32"
        >
          <p className="text-2xl md:text-3xl font-light leading-relaxed mb-12">
            "{data.message}"
          </p>

          {data.loveQuote && (
            <p className="text-xl italic text-cyan-400/80 mb-12">
              "{data.loveQuote}"
            </p>
          )}

          <div className="mt-16 pt-8 border-t border-cyan-500/30">
            <p className="text-sm tracking-[0.3em] uppercase text-cyan-200/60 mb-4">Eternally,</p>
            <p className="text-4xl text-cyan-100" style={{ fontFamily: "var(--font-cursive)" }}>
              {data.senderName}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
