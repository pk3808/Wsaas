"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GARDEN_COLORS } from "./garden-css";
import { Volume2, VolumeX } from "lucide-react";

export function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Generate gentle ambient tone using Web Audio API
  // (No external audio files needed)
  const startAmbience = () => {
    try {
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);
      gainRef.current = gain;

      // Very soft, barely audible nature-like tone
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.value = 220; // gentle low A
      osc1.connect(gain);
      osc1.start();

      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.value = 330; // gentle E
      const gain2 = ctx.createGain();
      gain2.gain.value = 0.3;
      osc2.connect(gain2);
      gain2.connect(gain);
      osc2.start();

      // Fade in
      gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 2);

      oscillatorRef.current = osc1;
      setIsPlaying(true);
      setIsLoaded(true);
    } catch {
      // Web Audio API not supported
    }
  };

  const stopAmbience = () => {
    if (gainRef.current && audioContextRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 1);
      setTimeout(() => {
        audioContextRef.current?.close();
        audioContextRef.current = null;
      }, 1200);
    }
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  useEffect(() => {
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 1 }}
      onClick={toggle}
      className="fixed top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
      style={{
        backgroundColor: `${GARDEN_COLORS.ivory}DD`,
        border: `1px solid ${GARDEN_COLORS.sage}30`,
        color: isPlaying ? GARDEN_COLORS.naturalGreen : GARDEN_COLORS.warmBrown,
        backdropFilter: "blur(8px)",
      }}
      title={isPlaying ? "Mute ambient sound" : "Play ambient garden sound"}
    >
      {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
    </motion.button>
  );
}
