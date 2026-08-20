"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  TEMPLATES,
  OCCASIONS,
  type WishData,
  type OccasionType,
  type TemplateIdType,
  type TemplateConfig,
} from "@/lib/config";
import { encodeData } from "@/lib/utils";
import {
  X,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Heart,
  Send,
  Wand2,
  Calendar,
  Gift,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTemplateId?: TemplateIdType;
  initialOccasion?: OccasionType;
}

export function CraftModal({
  isOpen,
  onClose,
  initialTemplateId = "carnival",
  initialOccasion = "birthday",
}: CraftModalProps) {
  const [mounted, setMounted] = useState(false);
  const [templateId, setTemplateId] = useState<TemplateIdType>(initialTemplateId);
  const [occasion, setOccasion] = useState<OccasionType>(initialOccasion);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({
    recipientName: "",
    senderName: "",
    message: "",
    age: "",
    nickname: "",
    anniversaryDate: "",
    yearsTogether: "",
    loveQuote: "",
    achievementTitle: "",
    institutionName: "",
    festivalName: "",
    giftBoxSurprise: "",
    gratitudeReason: "",
    memoryTags: "",
  });

  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialTemplateId) setTemplateId(initialTemplateId);
      if (initialOccasion) setOccasion(initialOccasion);
      setGeneratedUrl("");
      setCopied(false);
    }
  }, [isOpen, initialTemplateId, initialOccasion]);

  const selectedTemplate = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
  const selectedOccasionObj = OCCASIONS.find((o) => o.id === occasion) || OCCASIONS[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recipientName.trim() || !formData.senderName.trim() || !formData.message.trim()) {
      alert("Please fill in Recipient Name, Your Name, and your heartfelt Message!");
      return;
    }

    const payload: WishData = {
      recipientName: formData.recipientName.trim(),
      senderName: formData.senderName.trim(),
      occasion,
      templateId,
      message: formData.message.trim(),
      ...(formData.age && { age: formData.age }),
      ...(formData.nickname && { nickname: formData.nickname }),
      ...(formData.anniversaryDate && { anniversaryDate: formData.anniversaryDate }),
      ...(formData.yearsTogether && { yearsTogether: formData.yearsTogether }),
      ...(formData.loveQuote && { loveQuote: formData.loveQuote }),
      ...(formData.achievementTitle && { achievementTitle: formData.achievementTitle }),
      ...(formData.institutionName && { institutionName: formData.institutionName }),
      ...(formData.festivalName && { festivalName: formData.festivalName }),
      ...(formData.giftBoxSurprise && { giftBoxSurprise: formData.giftBoxSurprise }),
      ...(formData.gratitudeReason && { gratitudeReason: formData.gratitudeReason }),
      ...(formData.memoryTags && { memoryTags: formData.memoryTags }),
    };

    const encoded = encodeData(payload);
    const slug = formData.recipientName.trim().toLowerCase().replace(/\s+/g, "-");
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedUrl(`${origin}/to/${slug}?d=${encoded}`);
    setCopied(false);

    // Trigger celebration confetti
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#E8856C", "#B4A0D1", "#8DAE93", "#F5C6A8", "#7FBCD2"],
    });
  };

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 -z-10"
        />

        {/* ─── Stationery Letter-Writing Desk Modal ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", stiffness: 320, damping: 25 }}
          className="relative w-full max-w-2xl bg-[#FFFDF7] rounded-3xl border-2 border-warm-gray/20 paper-shadow-lg p-5 sm:p-8 max-h-[92vh] overflow-y-auto text-ink my-auto shadow-2xl"
        >
          {/* Top Washi Tape */}
          <div className="absolute -top-3 left-10 w-20 h-4 washi-tape rounded-sm rotate-[-2deg] pointer-events-none" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream hover:bg-white border border-warm-gray/20 flex items-center justify-center text-soft-brown hover:text-ink transition-colors shadow-2xs cursor-pointer z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="mb-6 pb-4 border-b border-dashed border-warm-gray/15 pr-10">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-coral/10 border border-coral/20 text-coral text-[10px] font-bold uppercase tracking-wider">
                {selectedOccasionObj.emoji} {selectedOccasionObj.label}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-lavender/15 border border-lavender/25 text-soft-brown text-[10px] font-bold">
                Theme: {selectedTemplate.name}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Personalize Your <span className="font-[family-name:var(--font-cursive)] text-coral text-3xl sm:text-4xl font-bold px-1">Keepsake</span>
            </h3>
            <p className="font-[family-name:var(--font-marker)] text-sm text-soft-brown mt-0.5">
              Fill in the sweet details and we'll craft your interactive webpage instantly ✦
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleGenerate} className="space-y-6">
            
            {/* Sender & Recipient Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-soft-brown">
                  Recipient Name (To) *
                </label>
                <input
                  type="text"
                  name="recipientName"
                  required
                  placeholder="e.g. Sophia, Marcus, Mom"
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream border border-warm-gray/20 focus:border-coral focus:bg-white outline-none text-sm text-ink font-medium placeholder:text-soft-brown/40 shadow-2xs transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-soft-brown">
                  Your Name (From) *
                </label>
                <input
                  type="text"
                  name="senderName"
                  required
                  placeholder="e.g. Alex, The Smith Family"
                  value={formData.senderName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream border border-warm-gray/20 focus:border-coral focus:bg-white outline-none text-sm text-ink font-medium placeholder:text-soft-brown/40 shadow-2xs transition-all"
                />
              </div>
            </div>

            {/* Dynamic Occasion-Specific Inputs */}
            {occasion === "birthday" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-cream/70 border border-warm-gray/15">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-soft-brown">
                    Turning Age (Optional)
                  </label>
                  <input
                    type="number"
                    name="age"
                    placeholder="e.g. 25"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-paper border border-warm-gray/20 text-sm text-ink outline-none focus:border-coral"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-soft-brown">
                    Special Nickname (Optional)
                  </label>
                  <input
                    type="text"
                    name="nickname"
                    placeholder="e.g. RockStar, Captain"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-paper border border-warm-gray/20 text-sm text-ink outline-none focus:border-coral"
                  />
                </div>
              </div>
            )}

            {occasion === "anniversary" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-rose-50/60 border border-rose-200/60">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-rose-800">
                    Years Together / Milestone
                  </label>
                  <input
                    type="text"
                    name="yearsTogether"
                    placeholder="e.g. 5 Years or 1st Anniversary"
                    value={formData.yearsTogether}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-paper border border-rose-200 text-sm text-ink outline-none focus:border-rose-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-rose-800">
                    Favorite Love Quote
                  </label>
                  <input
                    type="text"
                    name="loveQuote"
                    placeholder="e.g. You are my today and all of my tomorrows."
                    value={formData.loveQuote}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-paper border border-rose-200 text-sm text-ink outline-none focus:border-rose-400"
                  />
                </div>
              </div>
            )}

            {occasion === "success" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-800">
                    Achievement Title *
                  </label>
                  <input
                    type="text"
                    name="achievementTitle"
                    placeholder="e.g. Graduated B.Sc Computer Science"
                    value={formData.achievementTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-paper border border-amber-200 text-sm text-ink outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-800">
                    Institution / Company
                  </label>
                  <input
                    type="text"
                    name="institutionName"
                    placeholder="e.g. Stanford University / Google"
                    value={formData.institutionName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-paper border border-amber-200 text-sm text-ink outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            )}

            {occasion === "festive" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Festival Name
                  </label>
                  <input
                    type="text"
                    name="festivalName"
                    placeholder="e.g. Christmas, Diwali, New Year 2027"
                    value={formData.festivalName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-paper border border-emerald-200 text-sm text-ink outline-none focus:border-emerald-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Gift Box Surprise Note
                  </label>
                  <input
                    type="text"
                    name="giftBoxSurprise"
                    placeholder="e.g. Surprise trip ticket inside!"
                    value={formData.giftBoxSurprise}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-paper border border-emerald-200 text-sm text-ink outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            )}

            {occasion === "gratitude" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-teal-50/60 border border-teal-200/60">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-teal-800">
                    Reason for Gratitude
                  </label>
                  <input
                    type="text"
                    name="gratitudeReason"
                    placeholder="e.g. For 5 years of mentorship & friendship"
                    value={formData.gratitudeReason}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-paper border border-teal-200 text-sm text-ink outline-none focus:border-teal-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-teal-800">
                    Memory Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    name="memoryTags"
                    placeholder="e.g. Coffee Breaks, Hackathons, Cheers"
                    value={formData.memoryTags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl bg-paper border border-teal-200 text-sm text-ink outline-none focus:border-teal-400"
                  />
                </div>
              </div>
            )}

            {/* Heartfelt Message (Ruled Paper Letter Stationery) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-soft-brown">
                  Your Heartfelt Message *
                </label>
                <span className="font-[family-name:var(--font-cursive)] text-xs text-soft-brown/70 font-bold">
                  stationery note ♡
                </span>
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Write your personal wish message here... (e.g. Wishing you the happiest celebration filled with love, laughter, and unforgettable moments!)"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-2xl bg-cream border border-warm-gray/20 focus:border-coral focus:bg-white outline-none font-[family-name:var(--font-marker)] text-base text-ink placeholder:text-soft-brown/40 transition-all resize-none shadow-2xs"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base bg-ink hover:bg-ink/90 text-cream shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] cursor-pointer group"
            >
              <span>Seal & Generate Keepsake Link</span>
              <Sparkles className="w-4 h-4 text-coral animate-pulse group-hover:rotate-12 transition-transform" />
            </button>
          </form>

          {/* ─── Celebratory Live URL Mini Popup Box On Top ─── */}
          <AnimatePresence>
            {generatedUrl && (
              <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="relative w-full max-w-md bg-[#FFFDF7] rounded-3xl border-2 border-warm-gray/20 paper-shadow-lg p-6 sm:p-7 space-y-4 text-ink shadow-2xl"
                >
                  {/* Top Washi Tape */}
                  <div className="absolute -top-3 left-10 w-20 h-4 washi-tape rounded-sm rotate-[-2deg] pointer-events-none" />

                  <button
                    onClick={() => setGeneratedUrl("")}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream hover:bg-white border border-warm-gray/20 flex items-center justify-center text-soft-brown hover:text-ink transition-colors cursor-pointer shadow-2xs"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="text-center space-y-1 pt-1">
                    <div className="text-3xl select-none animate-bounce">🎉</div>
                    <h4 className="text-2xl font-extrabold text-ink">
                      Your Keepsake is <span className="font-[family-name:var(--font-cursive)] text-coral text-3xl font-bold">Live!</span>
                    </h4>
                    <p className="font-[family-name:var(--font-marker)] text-xs text-soft-brown">
                      Copy the link below and share the joy with your loved one ✦
                    </p>
                  </div>

                  <div className="p-4 bg-[#FFF9F0] rounded-2xl border-2 border-dashed border-coral/35 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-sage flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Ready to Share
                      </span>
                      <span className="bg-coral/10 text-coral px-2 py-0.5 rounded-full font-mono border border-coral/20">
                        LIVE URL
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={generatedUrl}
                        className="flex-1 bg-white border border-warm-gray/20 rounded-xl py-2 px-3 text-xs font-mono text-ink outline-none select-all shadow-inner"
                      />
                      <button
                        onClick={handleCopy}
                        className="px-3.5 py-2 bg-ink hover:bg-ink/90 text-cream rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm active:scale-95 cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-sage" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <a
                      href={generatedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-xl bg-coral hover:bg-coral/90 text-cream font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <span>Open Live Webpage</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => {
                        setGeneratedUrl("");
                        onClose();
                      }}
                      className="px-4 py-3 rounded-xl bg-paper hover:bg-white border border-warm-gray/20 text-soft-brown font-bold text-xs transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
