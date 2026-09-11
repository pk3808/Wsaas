"use client";

import React, { useEffect, useRef } from "react";
import { type WishData } from "@/lib/config";
import { motion, useScroll, useTransform } from "framer-motion";
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

// Canvas-based Bokeh Engine
function BokehCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: { x: number; y: number; radius: number; speedX: number; speedY: number; opacity: number; life: number }[] = [];
    const numParticles = 40;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 40 + 10,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5 - 0.2, // slowly drift up
        opacity: Math.random() * 0.5 + 0.1,
        life: Math.random() * Math.PI * 2, // for sine wave pulsing
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life += 0.01;

        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;

        const currentOpacity = p.opacity + Math.sin(p.life) * 0.2;
        const boundedOpacity = Math.max(0, Math.min(0.8, currentOpacity));

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${boundedOpacity})`);
        gradient.addColorStop(1, `rgba(255, 215, 0, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

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
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ filter: "blur(4px)" }} />;
}

export function MidnightBokeh({ data }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultReasons = [
    "Your endless support",
    "The way you look at me",
    "Our late night conversations",
    "Your terrible jokes"
  ];

  const reasons = parseData(data.bokehReasons, defaultReasons);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#0B1021] text-white font-serif overflow-hidden selection:bg-[#FFD700] selection:text-[#0B1021]"
    >
      <BokehCanvas />

      {/* Subtle vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-radial-gradient from-transparent to-[#050812] opacity-80" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="min-h-[80vh] flex flex-col items-center justify-center text-center mt-10"
        >
          {data.yearsTogether && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[#FFD700] tracking-[0.2em] uppercase text-sm mb-6"
            >
              {data.yearsTogether}
            </motion.div>
          )}
          <h1 className="text-6xl md:text-8xl font-light mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            {data.recipientName}
          </h1>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-8" />

          {data.loveQuote && (
            <p className="text-xl md:text-2xl text-white/70 italic max-w-2xl font-light leading-relaxed">
              "{data.loveQuote}"
            </p>
          )}
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5 }}
          className="w-full max-w-2xl my-32 text-center space-y-8"
        >
          <p className="text-2xl md:text-4xl leading-relaxed font-light text-white/90">
            {data.message}
          </p>
        </motion.div>

        {/* Reasons (Floating Text) */}
        <div className="w-full max-w-3xl my-32 space-y-32">
          {reasons.map((reason: string, index: number) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                <div className="text-2xl md:text-3xl text-[#FFD700]/90 italic font-light drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                  ...{reason}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Outro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="min-h-[50vh] flex flex-col items-center justify-center text-center"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-12" />
          <p className="text-lg text-white/50 uppercase tracking-[0.4em] mb-4">Forever</p>
          <p className="text-4xl md:text-5xl text-[#FFD700] font-light">
            {data.senderName}
          </p>
        </motion.div>

      </div>
    </div>
  );
}
