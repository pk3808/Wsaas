"use client";

import { useRef, useCallback } from "react";

// ─── Web Audio API 8-Bit Chiptune Sound Synthesizer ───
// All sounds are generated purely via Web Audio oscillators — no external files.

type SoundEffect =
  | "coin"
  | "powerup"
  | "blockBreak"
  | "candleBlow"
  | "victory"
  | "jump"
  | "menuSelect"
  | "levelUp"
  | "bossHit"
  | "gameOver";

export function useChiptuneEngine() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mutedRef = useRef(false);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playNote = useCallback(
    (freq: number, duration: number, type: OscillatorType = "square", gain = 0.15, delay = 0) => {
      if (mutedRef.current) return;
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        g.gain.setValueAtTime(gain, ctx.currentTime + delay);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration);
      } catch {
        // Silently fail if audio is not available
      }
    },
    [getCtx]
  );

  const play = useCallback(
    (effect: SoundEffect) => {
      switch (effect) {
        case "coin":
          // Quick ascending 2-note arpeggio
          playNote(988, 0.08, "square", 0.12, 0);
          playNote(1319, 0.15, "square", 0.12, 0.08);
          break;

        case "powerup":
          // Triumphant ascending 4-note chime
          playNote(523, 0.1, "square", 0.1, 0);
          playNote(659, 0.1, "square", 0.1, 0.1);
          playNote(784, 0.1, "square", 0.1, 0.2);
          playNote(1047, 0.2, "square", 0.12, 0.3);
          break;

        case "blockBreak":
          // Short percussive hit + descending tone
          playNote(200, 0.06, "sawtooth", 0.15, 0);
          playNote(150, 0.08, "square", 0.1, 0.03);
          playNote(80, 0.1, "square", 0.08, 0.08);
          break;

        case "candleBlow":
          // Soft descending whoosh
          playNote(800, 0.12, "sine", 0.08, 0);
          playNote(400, 0.15, "sine", 0.06, 0.08);
          playNote(200, 0.2, "sine", 0.04, 0.18);
          break;

        case "victory":
          // Classic victory fanfare (8 notes)
          playNote(523, 0.12, "square", 0.12, 0);
          playNote(523, 0.12, "square", 0.12, 0.12);
          playNote(523, 0.12, "square", 0.12, 0.24);
          playNote(523, 0.3, "square", 0.12, 0.36);
          playNote(415, 0.12, "square", 0.12, 0.66);
          playNote(466, 0.12, "square", 0.12, 0.78);
          playNote(523, 0.15, "square", 0.12, 0.9);
          playNote(466, 0.08, "square", 0.1, 1.05);
          playNote(523, 0.4, "square", 0.12, 1.13);
          break;

        case "jump":
          // Quick ascending sweep
          playNote(200, 0.04, "square", 0.1, 0);
          playNote(400, 0.04, "square", 0.1, 0.04);
          playNote(600, 0.06, "square", 0.08, 0.08);
          break;

        case "menuSelect":
          // Simple click
          playNote(660, 0.06, "square", 0.08, 0);
          break;

        case "levelUp":
          // Ascending scale
          playNote(262, 0.08, "square", 0.1, 0);
          playNote(330, 0.08, "square", 0.1, 0.08);
          playNote(392, 0.08, "square", 0.1, 0.16);
          playNote(523, 0.08, "square", 0.1, 0.24);
          playNote(659, 0.08, "square", 0.1, 0.32);
          playNote(784, 0.15, "square", 0.12, 0.4);
          playNote(1047, 0.3, "square", 0.12, 0.55);
          break;

        case "bossHit":
          // Heavy hit + rumble
          playNote(100, 0.1, "sawtooth", 0.15, 0);
          playNote(60, 0.15, "sawtooth", 0.12, 0.05);
          playNote(880, 0.04, "square", 0.08, 0);
          break;

        case "gameOver":
          // Sad descending
          playNote(392, 0.2, "square", 0.1, 0);
          playNote(330, 0.2, "square", 0.1, 0.2);
          playNote(262, 0.2, "square", 0.1, 0.4);
          playNote(196, 0.4, "square", 0.12, 0.6);
          break;
      }
    },
    [playNote]
  );

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    return mutedRef.current;
  }, []);

  return { play, toggleMute, isMuted: () => mutedRef.current };
}
