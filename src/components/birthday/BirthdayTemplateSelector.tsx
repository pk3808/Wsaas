"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TEMPLATES, type TemplateIdType } from "@/lib/config";
import { ArrowRight, ChevronLeft, Check } from "lucide-react";

interface BirthdayTemplateSelectorProps {
  onSelect: (templateId: TemplateIdType) => void;
  onBack: () => void;
}

export function BirthdayTemplateSelector({ onSelect, onBack }: BirthdayTemplateSelectorProps) {
  const birthdayTemplates = TEMPLATES.filter(t => t.defaultOccasion === "birthday");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Layout calculations for the fan effect
  const calculateTransform = (index: number, isHovered: boolean, total: number) => {
    // Distribute cards along an arc
    const spreadAngle = 40; // Total angle to spread cards across
    const stepAngle = spreadAngle / (total - 1);
    const startAngle = -spreadAngle / 2;
    const baseRotation = startAngle + stepAngle * index;

    // Shift cards slightly upwards in the middle
    const distanceFromCenter = Math.abs(index - (total - 1) / 2);
    const baseY = Math.pow(distanceFromCenter, 2) * 8;

    if (isHovered) {
      return { y: -40, rotate: 0, scale: 1.05, zIndex: 50 };
    }

    return {
      y: baseY,
      rotate: baseRotation,
      scale: 1,
      zIndex: index === selectedIndex ? 40 : 30 - distanceFromCenter,
    };
  };

  const selectedTemplate = birthdayTemplates[selectedIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-5xl mx-auto py-12 px-4 flex flex-col items-center"
    >
      <button
        onClick={onBack}
        className="self-start mb-8 flex items-center gap-2 text-sm font-semibold text-soft-brown hover:text-ink transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Occasions
      </button>

      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
          Choose a <span className="text-coral">Masterpiece.</span>
        </h1>
        <p className="text-soft-brown font-medium max-w-lg mx-auto">
          6 handcrafted themes built specially for birthdays. Select the one that perfectly matches their vibe.
        </p>
      </div>

      {/* 3D Fan Grid */}
      <div className="relative w-full h-[350px] flex justify-center items-end pb-10 perspective-1000">
        {birthdayTemplates.map((template, idx) => {
          const isHovered = hoveredIndex === idx;
          const isSelected = selectedIndex === idx;
          const transform = calculateTransform(idx, isHovered, birthdayTemplates.length);

          return (
            <motion.div
              key={template.id}
              onClick={() => setSelectedIndex(idx)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                y: transform.y,
                rotate: transform.rotate,
                scale: transform.scale,
                zIndex: transform.zIndex,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`absolute bottom-10 w-44 h-60 md:w-52 md:h-72 rounded-2xl cursor-pointer shadow-xl border-4 ${
                isSelected ? 'border-coral' : 'border-white'
              } flex flex-col p-4 overflow-hidden origin-bottom transition-shadow hover:shadow-2xl`}
              style={{ backgroundColor: template.themeColor }}
            >
               {/* Card content preview based on theme color */}
               <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-xl p-3 flex flex-col justify-between border border-black/5">
                  <div className="text-4xl text-center pt-2 drop-shadow-sm">{template.sampleVisual}</div>
                  <div className="text-center space-y-1.5 mt-auto">
                     <div className="font-bold text-xs leading-tight" style={{ color: template.themeColor }}>{template.name}</div>
                     <div className="text-[9px] text-gray-500 font-medium leading-tight">{template.badgeText}</div>
                  </div>
               </div>

               {isSelected && (
                 <div className="absolute top-2 right-2 bg-coral text-white rounded-full p-1 shadow-md">
                   <Check className="w-3 h-3" />
                 </div>
               )}
            </motion.div>
          );
        })}
      </div>

      {/* Selected Template Details & Action */}
      <motion.div
        key={selectedTemplate.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-center max-w-2xl bg-paper p-6 rounded-2xl border border-warm-gray/20 paper-shadow-lg"
      >
        <h3 className="text-2xl font-bold text-ink mb-2">{selectedTemplate.name}</h3>
        <p className="text-sm text-soft-brown mb-6">{selectedTemplate.tagline}</p>

        <button
          onClick={() => onSelect(selectedTemplate.id as TemplateIdType)}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-ink text-white rounded-xl font-bold text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto"
        >
          Select Theme & Customize <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

    </motion.div>
  );
}
