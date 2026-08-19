"use client";

import { useState } from "react";
import { OCCASIONS, TEMPLATES, type WishData, type OccasionType, type TemplateIdType } from "@/lib/config";
import { encodeData } from "@/lib/utils";
import { Sparkles, Copy, Check, ArrowRight, ExternalLink, Calendar, Heart, Award, Gift, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    setGeneratedUrl(`${origin}/to/${slug}?d=${encoded}`);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="create" className="w-full max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl text-white">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-2xl text-white shadow-lg">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Create Wishing Web Page</h2>
          <p className="text-xs text-slate-400">Select occasion, choose template, fill dynamic details & copy your link.</p>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="space-y-8">
        {/* Step 1: Select Occasion */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Step 1: Select Occasion
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {OCCASIONS.map((occ) => (
              <button
                key={occ.id}
                type="button"
                onClick={() => handleOccasionChange(occ.id as OccasionType)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col gap-2 ${
                  occasion === occ.id
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10 scale-[1.02]"
                    : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span className="text-2xl">{occ.emoji}</span>
                <span className="text-xs font-bold leading-tight">{occ.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Choose Template */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Step 2: Choose Web Page Template
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setTemplateId(tmpl.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-28 ${
                  templateId === tmpl.id
                    ? "border-pink-500 text-white shadow-xl ring-2 ring-pink-500/40"
                    : "border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tmpl.previewGradient} opacity-20`} />
                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-bold text-pink-400 block tracking-wider">{tmpl.badgeText.split(" ")[0]}</span>
                  <h4 className="text-xs font-extrabold text-white mt-1">{tmpl.name}</h4>
                </div>
                <div className="relative z-10 text-[10px] text-slate-400 truncate">
                  {tmpl.tagline.slice(0, 30)}...
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Dynamic Occasion Form Fields */}
        <div className="space-y-6 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              Step 3: Dynamic Occasion Details ({OCCASIONS.find(o => o.id === occasion)?.emoji} {OCCASIONS.find(o => o.id === occasion)?.label})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase text-slate-300">Recipient Name (To) *</label>
              <input
                type="text"
                name="recipientName"
                required
                placeholder="e.g. Sophia, Marcus, Mom"
                value={formData.recipientName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none text-sm text-white placeholder:text-slate-600 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase text-slate-300">Your Name (From) *</label>
              <input
                type="text"
                name="senderName"
                required
                placeholder="e.g. Alex, The Smith Family"
                value={formData.senderName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none text-sm text-white placeholder:text-slate-600 transition-all"
              />
            </div>
          </div>

          {/* Conditional Inputs based on Occasion */}
          <AnimatePresence mode="wait">
            {occasion === "birthday" && (
              <motion.div
                key="birthday-fields"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800"
              >
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-slate-300">Turning Age (Optional)</label>
                  <input
                    type="number"
                    name="age"
                    placeholder="e.g. 25"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-slate-300">Special Nickname (Optional)</label>
                  <input
                    type="text"
                    name="nickname"
                    placeholder="e.g. RockStar, Captain"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white outline-none"
                  />
                </div>
              </motion.div>
            )}

            {occasion === "anniversary" && (
              <motion.div
                key="anniversary-fields"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-rose-950/20 border border-rose-900/30"
              >
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-rose-300">Years Together / Milestone</label>
                  <input
                    type="text"
                    name="yearsTogether"
                    placeholder="e.g. 5 Years or 1st Anniversary"
                    value={formData.yearsTogether}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-rose-300">Favorite Love Quote (Optional)</label>
                  <input
                    type="text"
                    name="loveQuote"
                    placeholder="e.g. You are my today and all of my tomorrows."
                    value={formData.loveQuote}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white outline-none"
                  />
                </div>
              </motion.div>
            )}

            {occasion === "success" && (
              <motion.div
                key="success-fields"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-amber-950/20 border border-amber-900/30"
              >
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-amber-300">Achievement Title *</label>
                  <input
                    type="text"
                    name="achievementTitle"
                    placeholder="e.g. Graduated B.Sc Computer Science / Promoted to VP"
                    value={formData.achievementTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-amber-300">Institution / Company (Optional)</label>
                  <input
                    type="text"
                    name="institutionName"
                    placeholder="e.g. Stanford University / Google"
                    value={formData.institutionName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white outline-none"
                  />
                </div>
              </motion.div>
            )}

            {occasion === "festive" && (
              <motion.div
                key="festive-fields"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/30"
              >
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-emerald-300">Festival Name</label>
                  <input
                    type="text"
                    name="festivalName"
                    placeholder="e.g. New Year 2027, Diwali, Christmas"
                    value={formData.festivalName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-emerald-300">Gift Box Surprise Note (Unboxing Text)</label>
                  <input
                    type="text"
                    name="giftBoxSurprise"
                    placeholder="e.g. Surprise trip ticket inside!"
                    value={formData.giftBoxSurprise}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white outline-none"
                  />
                </div>
              </motion.div>
            )}

            {occasion === "gratitude" && (
              <motion.div
                key="gratitude-fields"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-teal-950/20 border border-teal-900/30"
              >
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-teal-300">Reason for Gratitude / Farewell</label>
                  <input
                    type="text"
                    name="gratitudeReason"
                    placeholder="e.g. For 5 years of amazing mentorship"
                    value={formData.gratitudeReason}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase text-teal-300">Memory Tags (Comma Separated)</label>
                  <input
                    type="text"
                    name="memoryTags"
                    placeholder="e.g. Coffee Breaks, Hackathons, Mentorship"
                    value={formData.memoryTags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white outline-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase text-slate-300">Your Heartfelt Message *</label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Write your main wish message here..."
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-indigo-500 outline-none text-sm text-white placeholder:text-slate-600 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            Generate Wishing Link <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Generated Link Display Modal/Box */}
      <AnimatePresence>
        {generatedUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-slate-950 rounded-2xl border border-indigo-500/40 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Web Page Link Generated Successfully!
              </h4>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full font-bold">
                {TEMPLATES.find((t) => t.id === templateId)?.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedUrl}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-xs font-mono text-indigo-300 outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-900">
              <span className="text-slate-500">Share via WhatsApp, iMessage, or Socials</span>
              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1 hover:underline"
              >
                Open Live Preview <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}