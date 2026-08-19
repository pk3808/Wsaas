"use client";

import { useState, useEffect } from "react";
import { OCCASIONS, THEMES, type WishData } from "@/lib/config";
import { encodeData } from "@/lib/utils";
import { Sparkles, Copy, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CreateWishForm() {
  const [formData, setFormData] = useState<WishData>({
    recipientName: "",
    senderName: "",
    occasion: "birthday",
    theme: "pastel",
    age: "",
    message: "",
  });

  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recipientName || !formData.senderName || !formData.message) {
      alert("Please fill in all required fields!");
      return;
    }

    const encoded = encodeData(formData);
    const slug = formData.recipientName.trim().toLowerCase().replace(/\s+/g, '-');
    setGeneratedUrl(`${baseUrl}/to/${slug}?d=${encoded}`);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-6 h-6 text-indigo-500" />
          <h2 className="text-2xl font-bold text-slate-800">Create a Wish Page</h2>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="occasion" className="block text-sm font-medium text-slate-700">Occasion</label>
              <select
                id="occasion"
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 bg-white"
              >
                {OCCASIONS.map((occ) => (
                  <option key={occ.id} value={occ.id}>{occ.emoji} {occ.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="theme" className="block text-sm font-medium text-slate-700">Visual Theme</label>
              <select
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 bg-white"
              >
                {THEMES.map((theme) => (
                  <option key={theme.id} value={theme.id}>{theme.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="recipientName" className="block text-sm font-medium text-slate-700">To (Recipient Name) *</label>
              <input
                id="recipientName"
                name="recipientName"
                type="text"
                required
                placeholder="e.g. Alex"
                value={formData.recipientName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="senderName" className="block text-sm font-medium text-slate-700">From (Your Name) *</label>
              <input
                id="senderName"
                name="senderName"
                type="text"
                required
                placeholder="e.g. Sam"
                value={formData.senderName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          <AnimatePresence>
            {formData.occasion === 'birthday' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label htmlFor="age" className="block text-sm font-medium text-slate-700">Turning Age (Optional)</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="e.g. 25"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">Your Special Message *</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Write something heartfelt..."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-slate-800 placeholder:text-slate-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Generate Wish Link
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <AnimatePresence>
          {generatedUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200"
            >
              <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Your Unique Link is Ready!</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedUrl}
                  className="flex-1 bg-white border border-slate-300 rounded-lg py-2 px-3 text-sm text-slate-600 outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors shrink-0"
                  title="Copy link"
                >
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <div className="mt-4 flex justify-end">
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:underline flex items-center gap-1"
                >
                  Preview Page <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}