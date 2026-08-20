"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { type VisitorComment } from "@/lib/config";
import { Heart, Send, Sparkles, User, X, PlusCircle, MessageCircleHeart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface VisitorCommentsProps {
  slug: string;
  recipientName: string;
  senderName?: string;
}

export function VisitorComments({ slug, recipientName, senderName = "the sender" }: VisitorCommentsProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<VisitorComment[]>([]);
  const [authorName, setAuthorName] = useState(recipientName || "");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("❤️");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWriteForm, setShowWriteForm] = useState(true);

  const storageKey = `comments_${slug}`;

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setComments(JSON.parse(saved));
      } else {
        // Sample initial thank you note
        setComments([
          {
            id: "1",
            authorName: recipientName || "Recipient",
            message: `Thank you so much ${senderName}! This beautiful keepsake made my day so special! ❤️✨`,
            emoji: "🥹",
            timestamp: "Just now",
            likes: 3,
          },
        ]);
      }
    } catch {
      // fallback
    }
  }, [storageKey, recipientName, senderName]);

  const saveComments = (newComments: VisitorComment[]) => {
    setComments(newComments);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newComments));
    } catch {
      // safe fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const newComment: VisitorComment = {
      id: Date.now().toString(),
      authorName: authorName.trim(),
      message: message.trim(),
      emoji: selectedEmoji,
      timestamp: "Just now",
      likes: 1,
    };

    setTimeout(() => {
      saveComments([newComment, ...comments]);
      setMessage("");
      setIsSubmitting(false);
      setShowWriteForm(false);

      // Trigger celebration confetti
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E8856C", "#B4A0D1", "#8DAE93", "#F5C6A8", "#7FBCD2"],
      });
    }, 400);
  };

  const handleLike = (id: string) => {
    const updated = comments.map((c) =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    );
    saveComments(updated);
  };

  const EMOJI_OPTIONS = ["❤️", "🥰", "🥹", "💖", "✨", "💐", "🥂", "🎉", "🤗"];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
          
          {/* Backdrop click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 -z-10"
          />

          {/* Thank You Note Stationery Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 25 }}
            className="relative w-full max-w-xl bg-[#FFFDF7] rounded-3xl border-2 border-warm-gray/20 paper-shadow-lg p-6 sm:p-8 max-h-[88vh] flex flex-col text-ink shadow-2xl"
          >
            {/* Top Washi Tape */}
            <div className="absolute -top-3 left-10 w-24 h-4 washi-tape rounded-sm rotate-[-2deg] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream hover:bg-white border border-warm-gray/20 flex items-center justify-center text-soft-brown hover:text-ink transition-colors shadow-2xs cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-dashed border-warm-gray/15 pr-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 shadow-xs">
                  <MessageCircleHeart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                    Thank You <span className="font-[family-name:var(--font-cursive)] text-coral text-2xl sm:text-3xl font-bold">Notes</span>
                  </h3>
                  <p className="text-xs text-soft-brown font-medium">
                    Send a heartfelt response to <span className="capitalize font-bold text-ink">{senderName}</span>
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold px-3 py-1 bg-cream rounded-full border border-warm-gray/20 text-soft-brown hidden sm:inline-block">
                {comments.length} {comments.length === 1 ? "Note" : "Notes"}
              </span>
            </div>

            {/* Action Bar: Write Note vs View Feed */}
            <div className="py-3 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold text-soft-brown">
                {showWriteForm ? "Write a thank you note:" : "Sweet remarks & notes:"}
              </span>

              <button
                onClick={() => setShowWriteForm(!showWriteForm)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral/10 hover:bg-coral/20 text-coral border border-coral/25 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              >
                {showWriteForm ? (
                  <span>View All Notes</span>
                ) : (
                  <>
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Write Note</span>
                  </>
                )}
              </button>
            </div>

            {/* Scrollable Content: Form OR Notes List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 my-2">
              
              {showWriteForm ? (
                /* ─── Thank You Note Form ─── */
                <form onSubmit={handleSubmit} className="p-4 sm:p-5 rounded-2xl bg-cream/70 border border-warm-gray/15 space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-soft-brown">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-soft-brown/50" />
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-paper border border-warm-gray/20 focus:border-coral outline-none text-sm text-ink font-medium shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-soft-brown">
                      Reaction Mood
                    </label>
                    <div className="flex items-center gap-2 overflow-x-auto py-1.5 px-0.5">
                      {EMOJI_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setSelectedEmoji(emoji)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all cursor-pointer shrink-0 ${
                            selectedEmoji === emoji
                              ? "bg-rose-50 border-2 border-rose-500 ring-2 ring-rose-400/30 shadow-xs"
                              : "bg-paper border border-warm-gray/20 hover:border-warm-gray/40 hover:bg-white"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-soft-brown">
                      Your Thank You Remark *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={`Tell ${senderName} how much this keepsake meant to you... (e.g. Thank you so much! This is the most thoughtful gift ever!)`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-paper border border-warm-gray/20 focus:border-coral outline-none text-sm text-ink placeholder:text-soft-brown/40 resize-none font-[family-name:var(--font-marker)] text-base shadow-inner"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 px-5 rounded-xl font-bold bg-ink hover:bg-ink/90 text-cream shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 text-xs sm:text-sm"
                    >
                      {isSubmitting ? (
                        <Sparkles className="w-4 h-4 animate-spin text-coral" />
                      ) : (
                        <>
                          <span>Send Thank You Note</span>
                          <Send className="w-3.5 h-3.5 text-coral" />
                        </>
                      )}
                    </button>
                    {comments.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowWriteForm(false)}
                        className="px-4 py-3 rounded-xl bg-paper hover:bg-white border border-warm-gray/20 text-soft-brown font-bold text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                /* ─── Notes Feed ─── */
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-paper border border-warm-gray/15 hover:border-warm-gray/30 transition-all flex flex-col gap-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center text-xs font-bold capitalize shadow-xs">
                            {comment.authorName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-ink capitalize">
                              {comment.authorName}
                            </h4>
                            <p className="text-[10px] text-soft-brown font-mono">{comment.timestamp}</p>
                          </div>
                        </div>
                        <span className="text-xl select-none">{comment.emoji}</span>
                      </div>

                      <p className="font-[family-name:var(--font-marker)] text-sm text-ink/90 pl-10 leading-relaxed">
                        {comment.message}
                      </p>

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleLike(comment.id)}
                          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-cream hover:bg-rose-50 border border-warm-gray/15 hover:border-rose-200 text-soft-brown hover:text-rose-600 transition-colors cursor-pointer shadow-2xs"
                        >
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ─── Floating Discrete Thank You Note Pill on Bottom Right ─── */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="px-4 py-2.5 rounded-full bg-paper/95 hover:bg-white text-ink border-2 border-warm-gray/20 hover:border-coral paper-shadow-lg flex items-center gap-2 text-xs sm:text-sm font-bold backdrop-blur-md shadow-xl transition-all cursor-pointer group"
        >
          <div className="relative">
            <MessageCircleHeart className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
            <Heart className="w-2.5 h-2.5 absolute -top-1 -right-1 text-rose-500 fill-rose-500 animate-ping opacity-60" />
          </div>
          <span>Send a Thank You Note</span>
          {comments.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-mono text-[10px] font-bold border border-rose-200">
              {comments.length}
            </span>
          )}
        </motion.button>
      </div>

      {/* ─── Modal rendered into document.body ─── */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
}
