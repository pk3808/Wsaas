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
    const xOffset = direction * (140 + (absDiff - 1) * 80);

    return {
      x: xOffset,
      scale: Math.max(0.72, 1 - absDiff * 0.12),
      zIndex: 30 - absDiff,
      opacity: Math.max(0.85, 1 - absDiff * 0.08),
      rotateY: direction * -12 // Slight tilt towards center
    };
  };

  const selectedTemplate = birthdayTemplates[selectedIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-5xl mx-auto pt-1 pb-8 px-4 flex flex-col items-center"
    >
      <div className="text-center mb-6 space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.12]">
          Choose a{" "}
          <span className="font-[family-name:var(--font-cursive)] text-coral text-4xl sm:text-5xl md:text-6xl font-bold px-1.5 inline-block -rotate-2">
            Masterpiece.
          </span>
        </h1>
        <p className="font-[family-name:var(--font-marker)] text-sm sm:text-base text-soft-brown max-w-xl mx-auto leading-relaxed">
          <span className="bg-[#FFF3ED] text-ink px-2.5 py-0.5 rounded-[4px] shadow-2xs">
            6 handcrafted themes built specially for birthdays. Select the one that perfectly matches their vibe ✦
          </span>
        </p>
      </div>

      {/* Dynamic Focus Carousel */}
      <div className="relative w-full h-[460px] flex justify-center items-center perspective-1000 my-4 py-4">
        {birthdayTemplates.map((template, idx) => {
          const isSelected = selectedIndex === idx;
          const transform = calculateTransform(idx);

          return (
            <motion.div
              key={template.id}
              onClick={() => {
                if (isSelected) {
                  onSelect(template.id as TemplateIdType);
                } else {
                  setSelectedIndex(idx);
                }
              }}
              animate={{
                x: transform.x,
                scale: transform.scale,
                zIndex: transform.zIndex,
                opacity: transform.opacity,
                rotateY: transform.rotateY,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className={`absolute w-64 h-[390px] sm:w-72 sm:h-[410px] rounded-[28px] cursor-pointer transition-all flex flex-col p-5 justify-between ${
                isSelected
                  ? "bg-[#FFFDF9] border-2 border-coral shadow-2xl shadow-coral/20 ring-4 ring-coral/10 scale-[1.02]"
                  : "bg-[#FFFDF7] border-2 shadow-xl hover:shadow-2xl"
              }`}
              style={{
                borderColor: isSelected ? undefined : `${template.themeColor}55`,
              }}
            >
              {/* Top Row: Badge & Check Icon */}
              <div className="flex items-center justify-between">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono border"
                  style={{
                    backgroundColor: `${template.themeColor}18`,
                    borderColor: `${template.themeColor}40`,
                    color: template.themeColor,
                  }}
                >
                  {template.badgeText || "Birthday Theme"}
                </span>

                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-coral text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <span className="text-[10px] font-mono text-soft-brown font-bold bg-cream px-2 py-0.5 rounded-full border border-warm-gray/15">
                    #{idx + 1}
                  </span>
                )}
              </div>

              {/* Visual Centerpiece */}
              <div className="my-auto py-2 flex flex-col items-center text-center space-y-3">
                <div className="text-6xl sm:text-7xl select-none filter drop-shadow-sm transform hover:scale-105 transition-transform duration-300">
                  {template.sampleVisual}
                </div>

                <div className="space-y-1">
                  <h3
                    className="font-extrabold text-lg sm:text-xl text-ink leading-tight"
                    style={{ color: isSelected ? undefined : template.themeColor }}
                  >
                    {template.name}
                  </h3>
                  <p className="text-xs text-soft-brown font-medium line-clamp-2 leading-relaxed px-1">
                    {template.tagline}
                  </p>
                </div>
              </div>

              {/* Action Area: Buttons on active card */}
              <div className="pt-2">
                {isSelected ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(template.id as TemplateIdType);
                      }}
                      className="flex-1 py-3 px-3 rounded-2xl bg-coral hover:bg-coral/90 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer group/btn"
                    >
                      <span>Select & Continue</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`/to/alex?d=preview`, "_blank");
                      }}
                      className="w-11 h-11 rounded-2xl bg-cream hover:bg-white border border-warm-gray/20 text-soft-brown hover:text-coral flex items-center justify-center shadow-xs hover:shadow-sm active:scale-95 transition-all cursor-pointer shrink-0"
                      title="Live Preview Theme"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="py-2 text-[11px] text-soft-brown/70 font-semibold text-center uppercase tracking-wider">
                    Tap to preview
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

    </motion.div>
  );
}
