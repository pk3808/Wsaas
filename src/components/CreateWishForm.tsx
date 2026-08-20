"use client";

import { useState } from "react";
import { OCCASIONS, TEMPLATES, type WishData, type OccasionType, type TemplateIdType } from "@/lib/config";
import { encodeData } from "@/lib/utils";
import { Sparkles, Copy, Check, ArrowRight, ExternalLink, Wand2, Heart, Gift, Camera, Star, Edit3, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

/* ─── Doodles for the builder ─── */
function DoodleHeart({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 36" fill="none"><path d="M20 35 C 14 28, 1 20, 1 12 C 1 5, 7 1, 13 1 C 16 1, 19 3, 20 6 C 21 3, 24 1, 27 1 C 33 1, 39 5, 39 12 C 39 20, 26 28, 20 35Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
}
function DoodleSparkle({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2 L14 9 L12 7 L10 9Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M12 22 L14 15 L12 17 L10 15Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M2 12 L9 10 L7 12 L9 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M22 12 L15 10 L17 12 L15 14Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>);
}

export function CreateWishForm() {
  const [occasion, setOccasion] = useState<OccasionType>("birthday");
  const [templateId, setTemplateId] = useState<TemplateIdType>("carnival");

  const [formData, setFormData] = useState<{
    recipientName: string;
    senderName: string;
    message: string;
    age: string;
    nickname: string;
    anniversaryDate: string;
    yearsTogether: string;
    loveQuote: string;
    achievementTitle: string;
    institutionName: string;
    festivalName: string;
    giftBoxSurprise: string;
    gratitudeReason: string;
    memoryTags: string;
  }>({
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

  const handleOccasionChange = (occId: OccasionType) => {
    setOccasion(occId);
    const occ = OCCASIONS.find((o) => o.id === occId);
    if (occ && occ.defaultTemplate) {
      setTemplateId(occ.defaultTemplate as TemplateIdType);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recipientName || !formData.senderName || !formData.message) {
      alert("Please fill in Recipient Name, Your Name, and Special Message!");
      return;
    }

    const payload: WishData = {
      recipientName: formData.recipientName,
      senderName: formData.senderName,
      occasion,
      templateId,
      message: formData.message,
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
    setGeneratedUrl(`${origin}/to/${slug}#d=${encoded}`);
    setCopied(false);

    // Celebration confetti burst
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#E8856C", "#B4A0D1", "#8DAE93", "#F5C6A8", "#7FBCD2"],
    });
  };

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="create" className="w-full max-w-4xl mx-auto bg-paper rounded-3xl border-2 border-warm-gray/15 paper-shadow-lg p-6 sm:p-10 relative text-ink overflow-hidden">
      
      {/* Washi tape strips in corners */}
      <div className="absolute -top-3 left-12 w-24 h-5 washi-tape rounded-sm rotate-[-2deg] hidden sm:block pointer-events-none" />
      <div className="absolute -top-3 right-16 w-20 h-5 bg-lavender/30 border border-lavender/25 rounded-sm rotate-[3deg] hidden sm:block pointer-events-none" />

      {/* Floating doodles */}
      <DoodleHeart className="absolute top-8 right-6 w-7 h-7 text-coral/20 rotate-12 hidden md:block" />
      <DoodleSparkle className="absolute bottom-12 left-6 w-6 h-6 text-lavender/30 hidden md:block" />

      {/* ─── Header Section ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-warm-gray/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-coral/10 border border-coral/20 text-coral text-[10px] font-bold uppercase tracking-wider">
              Keepsake Workshop
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
            Craft a <span className="font-[family-name:var(--font-cursive)] text-coral text-4xl sm:text-5xl font-bold px-1">Heartfelt Page</span>
          </h2>
          <p className="font-[family-name:var(--font-marker)] text-base sm:text-lg text-soft-brown mt-1">
            <span className="bg-[#FFF3ED] px-2 py-0.5 rounded-[3px]">
              Fill in the sweet memories below — your live interactive link generates instantly!
            </span>
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-coral/10 border border-coral/25 flex items-center justify-center text-coral shadow-xs">
            <Edit3 className="w-5 h-5" />
          </div>
          <span className="font-[family-name:var(--font-cursive)] text-xs text-soft-brown/70 font-bold">
            free & instant ✦
          </span>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="space-y-8 relative z-10">
        
        {/* ─── Step 1: Select Occasion ─── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-soft-brown flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-coral/10 text-coral flex items-center justify-center text-[11px] font-bold">1</span>
              Choose the Celebration
            </label>
            <span className="font-[family-name:var(--font-cursive)] text-xs text-coral font-bold hidden sm:inline">
              adapts form inputs automatically ↓
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {OCCASIONS.map((occ) => {
              const isSelected = occasion === occ.id;
              return (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => handleOccasionChange(occ.id as OccasionType)}
                  className={`p-3.5 rounded-2xl text-left transition-all flex flex-col gap-2 relative cursor-pointer ${
                    isSelected
                      ? "bg-[#FFF3ED] border-2 border-coral text-ink shadow-sm scale-[1.02]"
                      : "bg-cream/70 border border-warm-gray/15 text-soft-brown hover:bg-cream hover:text-ink hover:border-warm-gray/30"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-coral animate-ping" />
                  )}
                  <span className="text-2xl">{occ.emoji}</span>
                  <span className="text-xs font-bold leading-tight">{occ.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Step 2: Choose Template ─── */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-soft-brown flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-lavender/15 text-lavender flex items-center justify-center text-[11px] font-bold">2</span>
            Pick an Art Theme
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {TEMPLATES.map((tmpl) => {
              const isSelected = templateId === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => setTemplateId(tmpl.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-28 cursor-pointer ${
                    isSelected
                      ? "bg-paper border-2 border-ink text-ink paper-shadow ring-2 ring-coral/30 scale-[1.01]"
                      : "bg-cream/50 border-warm-gray/15 text-soft-brown hover:bg-cream hover:text-ink hover:border-warm-gray/30"
                  }`}
                >
                  <div className="relative z-10">
                    <span className="text-[10px] uppercase font-bold text-coral block tracking-wider">
                      {tmpl.badgeText.split(" ")[0]}
                    </span>
                    <h4 className="text-xs font-extrabold text-ink mt-0.5">{tmpl.name}</h4>
                  </div>
                  <div className="relative z-10 text-[10px] text-soft-brown/80 line-clamp-2">
                    {tmpl.tagline}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Step 3: Dynamic Occasion Form Fields ─── */}
        <div className="space-y-6 pt-6 border-t border-warm-gray/10">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-soft-brown flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky/15 text-sky flex items-center justify-center text-[11px] font-bold">3</span>
              Personal Details & Message ({OCCASIONS.find(o => o.id === occasion)?.emoji} {OCCASIONS.find(o => o.id === occasion)?.label})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-soft-brown">
                Recipient Name (To) *
              </label>
              <input
                type="text"
                name="recipientName"
                required
                placeholder="e.g. Sophia, Marcus, Mom"
                value={formData.recipientName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-cream border border-warm-gray/20 focus:border-coral focus:bg-white outline-none text-sm text-ink font-medium placeholder:text-soft-brown/40 transition-all shadow-2xs"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-soft-brown">
                Your Name (From) *
              </label>
              <input
                type="text"
                name="senderName"
                required
                placeholder="e.g. Alex, The Smith Family"
                value={formData.senderName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-cream border border-warm-gray/20 focus:border-coral focus:bg-white outline-none text-sm text-ink font-medium placeholder:text-soft-brown/40 transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Conditional Occasion Specific Fields */}
          <AnimatePresence mode="wait">
            {occasion === "birthday" && (
              <motion.div
                key="birthday-fields"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-cream/70 border border-warm-gray/15"
              >
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-soft-brown">Turning Age (Optional)</label>
                  <input
                    type="number"
                    name="age"
                    placeholder="e.g. 25"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-paper border border-warm-gray/20 text-sm text-ink outline-none focus:border-coral"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-soft-brown">Special Nickname (Optional)</label>
                  <input
                    type="text"
                    name="nickname"
                    placeholder="e.g. RockStar, Captain"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-paper border border-warm-gray/20 text-sm text-ink outline-none focus:border-coral"
                  />
                </div>
              </motion.div>
            )}

            {occasion === "anniversary" && (
              <motion.div
                key="anniversary-fields"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-rose-50/50 border border-rose-200/50"
              >
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-rose-800">Years Together / Milestone</label>
                  <input
                    type="text"
                    name="yearsTogether"
                    placeholder="e.g. 5 Years or 1st Anniversary"
                    value={formData.yearsTogether}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-paper border border-rose-200 text-sm text-ink outline-none focus:border-rose-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-rose-800">Favorite Love Quote (Optional)</label>
                  <input
                    type="text"
                    name="loveQuote"
                    placeholder="e.g. You are my today and all of my tomorrows."
                    value={formData.loveQuote}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-paper border border-rose-200 text-sm text-ink outline-none focus:border-rose-400"
                  />
                </div>
              </motion.div>
            )}

            {occasion === "success" && (
              <motion.div
                key="success-fields"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50"
              >
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-amber-800">Achievement Title *</label>
                  <input
                    type="text"
                    name="achievementTitle"
                    placeholder="e.g. Graduated B.Sc Computer Science / Promoted to VP"
                    value={formData.achievementTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-paper border border-amber-200 text-sm text-ink outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-amber-800">Institution / Company (Optional)</label>
                  <input
                    type="text"
                    name="institutionName"
                    placeholder="e.g. Stanford University / Google"
                    value={formData.institutionName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-paper border border-amber-200 text-sm text-ink outline-none focus:border-amber-400"
                  />
                </div>
              </motion.div>
            )}

            {occasion === "festive" && (
              <motion.div
                key="festive-fields"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/50"
              >
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-emerald-800">Festival Name</label>
                  <input
                    type="text"
                    name="festivalName"
                    placeholder="e.g. New Year 2027, Diwali, Christmas"
                    value={formData.festivalName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-paper border border-emerald-200 text-sm text-ink outline-none focus:border-emerald-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-emerald-800">Gift Box Surprise Note (Unboxing Text)</label>
                  <input
                    type="text"
                    name="giftBoxSurprise"
                    placeholder="e.g. Surprise trip ticket inside!"
                    value={formData.giftBoxSurprise}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-paper border border-emerald-200 text-sm text-ink outline-none focus:border-emerald-400"
                  />
                </div>
              </motion.div>
            )}

            {occasion === "gratitude" && (
              <motion.div
                key="gratitude-fields"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-teal-50/50 border border-teal-200/50"
              >
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-teal-800">Reason for Gratitude / Farewell</label>
                  <input
                    type="text"
                    name="gratitudeReason"
                    placeholder="e.g. For 5 years of amazing mentorship"
                    value={formData.gratitudeReason}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-paper border border-teal-200 text-sm text-ink outline-none focus:border-teal-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-teal-800">Memory Tags (Comma Separated)</label>
                  <input
                    type="text"
                    name="memoryTags"
                    placeholder="e.g. Coffee Breaks, Hackathons, Mentorship"
                    value={formData.memoryTags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-paper border border-teal-200 text-sm text-ink outline-none focus:border-teal-400"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Message Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase text-soft-brown">
                Your Heartfelt Message *
              </label>
              <span className="font-[family-name:var(--font-cursive)] text-xs text-soft-brown/60">
                write from the heart ♡
              </span>
            </div>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Write your main wish message here... (e.g. Wishing you a year full of joy, happiness, and unforgettable moments!)"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-cream border border-warm-gray/20 focus:border-coral focus:bg-white outline-none text-sm text-ink font-medium placeholder:text-soft-brown/40 transition-all resize-none shadow-2xs font-[family-name:var(--font-marker)] text-base"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-bold text-base bg-ink hover:bg-ink/90 text-cream shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] group cursor-pointer"
          >
            <span>Generate Wishing Web Page</span>
            <Sparkles className="w-5 h-5 text-coral animate-pulse group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </form>

      {/* Generated Link Display (Golden Keepsake Voucher) */}
      <AnimatePresence>
        {generatedUrl && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-[#FFFDF7] rounded-2xl border-2 border-dashed border-coral/40 space-y-4 paper-shadow"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sage flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4 text-sage" /> Web Page Link Created Successfully!
              </h4>
              <span className="text-[10px] bg-coral/10 text-coral px-3 py-1 rounded-full font-bold border border-coral/20">
                {TEMPLATES.find((t) => t.id === templateId)?.name}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedUrl}
                className="flex-1 bg-cream border border-warm-gray/20 rounded-xl py-2.5 px-4 text-xs font-mono text-ink outline-none select-all"
              />
              <button
                onClick={handleCopy}
                className="px-5 py-2.5 bg-ink hover:bg-ink/90 text-cream rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shrink-0 shadow-sm active:scale-95 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-sage" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-warm-gray/10">
              <span className="text-soft-brown/70 font-medium">Share via WhatsApp, iMessage, or Instagram</span>
              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:text-coral/80 font-bold flex items-center gap-1 hover:underline"
              >
                <span>Open Live Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}