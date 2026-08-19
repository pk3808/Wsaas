"use client";

import { useState } from "react";
import Link from "next/link";
import { Gift, PlusCircle, LogIn, Menu, X } from "lucide-react";
import { LoginModal } from "@/components/LoginModal";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-cream/90 backdrop-blur-md border-b border-warm-gray/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-coral/15 border border-coral/25 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Gift className="w-5 h-5 text-coral" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-ink tracking-tight leading-none">
                WishCraft
              </span>
              <span className="text-[10px] text-soft-brown font-semibold tracking-wider uppercase">
                Digital Keepsakes
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-soft-brown">
            <a href="#story" className="hover:text-coral transition-colors">
              Our Story
            </a>
            <a href="#templates" className="hover:text-coral transition-colors">
              5 Themes
            </a>
            <a href="#how" className="hover:text-coral transition-colors">
              How It Works
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-paper border border-warm-gray/15 text-soft-brown font-semibold text-xs hover:border-coral/30 transition-all"
            >
              <LogIn className="w-3.5 h-3.5 text-coral" />
              <span>Sign In</span>
            </button>
            <Link
              href="/create"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ink text-cream font-bold text-xs hover:bg-ink/90 transition-all active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Wish</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-soft-brown"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-paper border-t border-warm-gray/10 px-4 py-4 space-y-3 overflow-hidden"
            >
              <a href="#story" onClick={() => setMobileOpen(false)} className="block text-sm font-semibold text-soft-brown hover:text-coral">Our Story</a>
              <a href="#templates" onClick={() => setMobileOpen(false)} className="block text-sm font-semibold text-soft-brown hover:text-coral">5 Themes</a>
              <a href="#how" onClick={() => setMobileOpen(false)} className="block text-sm font-semibold text-soft-brown hover:text-coral">How It Works</a>
              <button onClick={() => { setIsLoginOpen(true); setMobileOpen(false); }} className="block text-sm font-semibold text-coral">Sign In with Google</button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
