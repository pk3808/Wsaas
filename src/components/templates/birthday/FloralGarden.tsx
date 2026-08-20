"use client";

import { useState, useCallback } from "react";
import { type WishData } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { GARDEN_KEYFRAMES, GARDEN_COLORS } from "./floral-garden/garden-css";
import { GardenIntro } from "./floral-garden/GardenIntro";
import { GardenScene } from "./floral-garden/GardenScene";
import { FloatingPetals } from "./floral-garden/FloatingPetals";
import { HeroWish } from "./floral-garden/HeroWish";
import { SpiritCakeDelivery } from "./floral-garden/SpiritCakeDelivery";
import { FlowerMessages } from "./floral-garden/FlowerMessages";
import { WishFlowers } from "./floral-garden/WishFlowers";
import { MemoryPath } from "./floral-garden/MemoryPath";
import { WishTree } from "./floral-garden/WishTree";
import { HiddenButterfly } from "./floral-garden/HiddenButterfly";
import { FinalGarden } from "./floral-garden/FinalGarden";
import { ProgressIndicator } from "./floral-garden/ProgressIndicator";
import { AmbientSoundToggle } from "./floral-garden/AmbientSoundToggle";

export function FloralGarden({ data, slug }: { data: WishData; slug: string }) {
  const [inGarden, setInGarden] = useState(false);

  const handleEnterGarden = useCallback(() => {
    setInGarden(true);
  }, []);

  return (
    <>
      {/* Inject garden keyframe animations */}
      <style dangerouslySetInnerHTML={{ __html: GARDEN_KEYFRAMES }} />

      {/* ─── PHASE 1: INTRO ─── */}
      <AnimatePresence>
        {!inGarden && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <GardenIntro
              recipientName={data.recipientName}
              onEnterGarden={handleEnterGarden}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: SEAMLESS LIVING GARDEN WORLD ─── */}
      {inGarden && (
        <motion.div
          key="garden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Floating petals layer */}
          <FloatingPetals count={18} intensity="normal" />

          {/* Hidden butterfly easter egg */}
          <HiddenButterfly />

          {/* Ambient sound toggle */}
          <AmbientSoundToggle />

          {/* Scroll progress indicator */}
          <ProgressIndicator />

          {/* Garden scene (parallax bg + trees + grass + sunlight) */}
          <GardenScene isActive={true}>
            {/* Section 1: Hero Birthday Wish with Spirit Angels Cake Delivery */}
            <HeroWish
              recipientName={data.recipientName}
              senderName={data.senderName}
              message={data.message}
              age={data.age}
            />

            {/* Section 2: Interactive Flower Messages */}
            <FlowerMessages
              nickname={data.nickname}
              recipientName={data.recipientName}
            />

            {/* Section 4: Things I Wish For You */}
            <WishFlowers recipientName={data.recipientName} />

            {/* Section 5: Memory Path */}
            <MemoryPath recipientName={data.recipientName} />

            {/* Section 6: The Wish Tree */}
            <WishTree recipientName={data.recipientName} />

            {/* Section 7: Final Sunset Scene */}
            <FinalGarden
              recipientName={data.recipientName}
              senderName={data.senderName}
            />
          </GardenScene>
        </motion.div>
      )}
    </>
  );
}