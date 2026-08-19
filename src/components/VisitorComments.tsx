"use client";

import { useState, useEffect } from "react";
import { type VisitorComment } from "@/lib/config";
import { MessageSquare, Heart, Send, Sparkles, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VisitorCommentsProps {
  slug: string;
  recipientName: string;
}

const DEFAULT_COMMENTS: VisitorComment[] = [
  {
    id: "1",
    authorName: "Sarah M.",
    message: "Wishing you the absolute best today! Have an incredible celebration! 🎉❤️",
    emoji: "🎉",
    timestamp: "2 hours ago",
    likes: 5,
  },
  {
    id: "2",
    authorName: "David K.",
    message: "So happy for you! Sending lots of love and positivity your way!",
    emoji: "✨",
    timestamp: "5 hours ago",
    likes: 3,
  },
];

export function VisitorComments({ slug, recipientName }: VisitorCommentsProps) {
  const [comments, setComments] = useState<VisitorComment[]>(DEFAULT_COMMENTS);
  const [authorName, setAuthorName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("❤️");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storageKey = `comments_${slug}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setComments(JSON.parse(saved));
      }
    } catch {
      // fallback to default
    }
  }, [storageKey]);

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
    }, 400);
  };

  const handleLike = (id: string) => {
    const updated = comments.map((c) =>
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    );
    saveComments(updated);
  };

  const EMOJI_OPTIONS = ["❤️", "🎉", "🎂", "✨", "🥂", "💖", "🥳"];

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl text-slate-800 dark:text-white">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 rounded-2xl text-indigo-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Visitor Guestbook</h3>
            <p className="text-xs text-slate-400">
              Leave a wish or warm note for <span className="font-semibold text-indigo-400 capitalize">{recipientName}</span>
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
          {comments.length} {comments.length === 1 ? "Wish" : "Wishes"}
        </span>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">Your Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3.5 opacity-50" />
              <input
                type="text"
                required
                placeholder="e.g. Alex Smith"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 focus:border-indigo-400 outline-none text-sm placeholder:opacity-40 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">Reaction Emoji</label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform ${
                    selectedEmoji === emoji
                      ? "bg-indigo-500/40 border-2 border-indigo-400 scale-110"
                      : "bg-white/5 border border-white/10 hover:bg-white/15 opacity-70"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-80">Your Message</label>
          <textarea
            required
            rows={3}
            placeholder={`Write your heartfelt note for ${recipientName}...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-indigo-400 outline-none text-sm placeholder:opacity-40 transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 rounded-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
        >
          {isSubmitting ? (
            <Sparkles className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Post Wish <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Comment List */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center text-xs font-bold text-white uppercase shadow-md">
                    {comment.authorName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold capitalize">{comment.authorName}</h4>
                    <p className="text-[10px] opacity-50">{comment.timestamp}</p>
                  </div>
                </div>
                <span className="text-xl">{comment.emoji}</span>
              </div>
              <p className="text-sm opacity-90 pl-10 leading-relaxed">{comment.message}</p>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  <span>{comment.likes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
