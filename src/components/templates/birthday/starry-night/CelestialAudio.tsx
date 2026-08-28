"use client";

import { useCallback, useRef, useState } from "react";

// Sound name type
export type CelestialSound =
  | "twinkle"
  | "chime"
  | "whoosh"
  | "blow"
  | "reveal"
  | "victory"
  | "ambient";

// Web Audio API: all sounds synthesized — no external files
export function useCelestialAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const ambientRef = useRef<{ stop: () => void } | null>(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (sound: CelestialSound) => {
      if (mutedRef.current) return;
      const ctx = getCtx();
      if (!ctx) return;

      const now = ctx.currentTime;

      switch (sound) {
        // ── Crystalline star twinkle (high bell shimmer) ──
        case "twinkle": {
          const freqs = [1047, 1319, 1568, 2093];
          freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now + i * 0.06);
            gain.gain.setValueAtTime(0, now + i * 0.06);
            gain.gain.linearRampToValueAtTime(0.15, now + i * 0.06 + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.6);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.06);
            osc.stop(now + i * 0.06 + 0.7);
          });
          break;
        }

        // ── Celestial chime (deeper wind-chime) ──
        case "chime": {
          [523, 659, 784, 1047, 1319].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now + i * 0.12);
            gain.gain.setValueAtTime(0, now + i * 0.12);
            gain.gain.linearRampToValueAtTime(0.2, now + i * 0.12 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 1.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.12);
            osc.stop(now + i * 0.12 + 1.3);
          });
          break;
        }

        // ── Cosmic whoosh (shooting star) ──
        case "whoosh": {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(300, now);
          osc.frequency.exponentialRampToValueAtTime(80, now + 0.5);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(2000, now);
          filter.frequency.exponentialRampToValueAtTime(200, now + 0.5);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.55);
          break;
        }

        // ── Candle blow (soft noise burst) ──
        case "blow": {
          const buf = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
          const data = buf.getChannelData(0);
          for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
          }
          const src = ctx.createBufferSource();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 800;
          filter.Q.value = 0.8;
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          src.buffer = buf;
          src.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          src.start(now);
          break;
        }

        // ── Star reveal shimmer ──
        case "reveal": {
          [880, 1108, 1320, 1760, 2217].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, now + i * 0.08);
            gain.gain.setValueAtTime(0, now + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.9);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 1.0);
          });
          break;
        }

        // ── Celestial victory fanfare ──
        case "victory": {
          const melody = [523, 659, 784, 1047, 784, 1047, 1319, 1568];
          melody.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now + i * 0.18);
            gain.gain.setValueAtTime(0, now + i * 0.18);
            gain.gain.linearRampToValueAtTime(0.25, now + i * 0.18 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.18 + 0.4);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.18);
            osc.stop(now + i * 0.18 + 0.5);
          });
          break;
        }

        // ── Ambient cosmic drone ──
        case "ambient": {
          if (ambientRef.current) return;
          const freqs = [55, 110, 165, 220];
          const nodes = freqs.map((freq) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.018, now);
            gain.gain.linearRampToValueAtTime(0.035, now + 3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            return { osc, gain };
          });
          ambientRef.current = {
            stop: () => {
              const stopTime = ctxRef.current?.currentTime ?? 0;
              nodes.forEach(({ osc, gain }) => {
                gain.gain.linearRampToValueAtTime(0, stopTime + 2);
                osc.stop(stopTime + 2.1);
              });
              ambientRef.current = null;
            },
          };
          break;
        }
      }
    },
    [getCtx]
  );

  const toggleMute = useCallback((): boolean => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    if (next && ambientRef.current) {
      ambientRef.current.stop();
    }
    return next;
  }, []);

  const stopAmbient = useCallback(() => {
    ambientRef.current?.stop();
  }, []);

  return { play, toggleMute, stopAmbient, muted };
}
