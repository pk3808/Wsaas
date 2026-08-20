"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TEMPLATES, type TemplateIdType } from "@/lib/config";
import { ArrowRight, ChevronLeft, Check, Eye } from "lucide-react";

interface BirthdayTemplateSelectorProps {
  onSelect: (templateId: TemplateIdType) => void;
  onBack: () => void;
}

export function BirthdayTemplateSelector({ onSelect, onBack }: BirthdayTemplateSelectorProps) {
  const birthdayTemplates = TEMPLATES.filter(t => t.defaultOccasion === "birthday");
  const [selectedIndex, setSelectedIndex] = useState<number>(Math.floor(birthdayTemplates.length / 2));

  // Layout calculations for the dynamic focus carousel
  const calculateTransform = (index: number) => {
    const diff = index - selectedIndex;
    const absDiff = Math.abs(diff);

    // Centered item
    if (diff === 0) {
      return { x: 0, scale: 1, zIndex: 40, opacity: 1, rotateY: 0 };
    }

    // Items to the sides
    const direction = diff > 0 ? 1 : -1;
    // We adjust xOffset slightly for smaller screens
    const xOffset = direction * (120 + (absDiff - 1) * 70);

    return {
      x: xOffset,
      scale: Math.max(0.65, 1 - absDiff * 0.15),
      zIndex: 30 - absDiff,
      opacity: Math.max(0.3, 1 - absDiff * 0.3),
      rotateY: direction * -15 // Slight tilt towards center
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

      {/* Dynamic Focus Carousel */}
      <div className="relative w-full h-[400px] flex justify-center items-center perspective-1000 overflow-hidden mb-8">
        {birthdayTemplates.map((template, idx) => {
          const isSelected = selectedIndex === idx;
          const transform = calculateTransform(idx);

          return (
            <motion.div
              key={template.id}
              onClick={() => setSelectedIndex(idx)}
              animate={{
                x: transform.x,
                scale: transform.scale,
                zIndex: transform.zIndex,
                opacity: transform.opacity,
                rotateY: transform.rotateY,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`absolute w-56 h-80 md:w-64 md:h-96 rounded-2xl cursor-pointer shadow-xl border-4 ${
                isSelected ? 'border-coral shadow-coral/20 shadow-2xl' : 'border-white'
              } flex flex-col p-4 overflow-hidden origin-center transition-shadow`}
              style={{ backgroundColor: template.themeColor }}
            >
               {/* Card content preview based on theme color */}
               <div className="flex-1 bg-white/95 backdrop-blur-sm rounded-xl p-4 flex flex-col justify-between border border-black/5 relative">
                  <div className="text-6xl text-center pt-4 drop-shadow-sm">{template.sampleVisual}</div>

                  <div className="text-center space-y-1.5 mt-auto pb-4">
                     <div className="font-bold text-sm md:text-base leading-tight" style={{ color: template.themeColor }}>{template.name}</div>
                     <div className="text-[10px] md:text-xs text-gray-500 font-medium leading-tight">{template.badgeText}</div>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-coral text-white rounded-full p-1 shadow-md">
                      <Check className="w-4 h-4" />
                    </div>
                  )}

                  {isSelected && (
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         alert(`Preview mode for ${template.name} is coming soon!`);
                       }}
                       className="absolute bottom-2 right-2 bg-paper border border-warm-gray/20 hover:border-warm-gray/40 text-ink rounded-full p-2 shadow-sm transition-all z-50 group flex items-center justify-center bg-white"
                       title="Preview Theme"
                     >
                       <Eye className="w-4 h-4 text-soft-brown group-hover:text-ink group-hover:scale-110 transition-transform" />
                     </button>
                  )}
               </div>
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
