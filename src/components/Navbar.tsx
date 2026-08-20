"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpenText,
  Palette,
  Wand2,
  LogIn,
  PlusCircle,
  Menu,
  X,
  Sparkles,
  Heart,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { LoginModal } from "@/components/LoginModal";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const customEvent = new CustomEvent("wishcraft-nav-back", { cancelable: true });
      const notPrevented = window.dispatchEvent(customEvent);
      if (!notPrevented) {
        // Event was intercepted by active sub-view (e.g. Birthday selector returned to Occasions)
        return;
      }
    }
    // Default fallback
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const navItems = [
    {
      href: "/#story",
      label: "Our Story",
      icon: BookOpenText,
      color: "text-coral",
      bgColor: "bg-coral/10",
    },
    {
      href: "/#templates",
      label: "5 Themes",
      icon: Palette,
      color: "text-lavender",
      bgColor: "bg-lavender/10",
    },
    {
      href: "/#how",
      label: "How It Works",
      icon: Wand2,
      color: "text-sky",
      bgColor: "bg-sky/10",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-cream/95 backdrop-blur-md transition-all">
        {/* Main Nav Content Bar */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 h-15 flex items-center justify-between gap-4">
          
          {/* ─── Logo & Back Section ─── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Universal Back Pill on Far Left Corner */}
            {!isHome && (
              <button
                onClick={handleBackClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper hover:bg-white border border-warm-gray/20 text-soft-brown hover:text-ink text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-coral" />
                <span>Back</span>
              </button>
            )}

            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative w-8 h-8 rounded-xl bg-coral/10 border border-coral/25 flex items-center justify-center text-coral group-hover:scale-105 transition-transform shadow-xs">
                <Mail className="w-4 h-4" />
                <Heart className="w-2.5 h-2.5 absolute -top-1 -right-1 text-coral fill-coral animate-bounce" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-lg sm:text-xl text-ink tracking-tight group-hover:text-coral transition-colors">
                  WishCraft
                </span>
                <span className="hidden sm:inline font-[family-name:var(--font-cursive)] text-sm text-soft-brown/70 font-bold">
                  keepsakes ✦
                </span>
              </div>
            </Link>
          </div>

          {/* ─── Center Nav with Lucide Icons (Shown on Home or standard routes) ─── */}
          {isHome ? (
            <nav className="hidden md:flex items-center gap-1.5 bg-paper/70 px-2 py-1 rounded-full border border-warm-gray/10">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isHovered = hoveredIndex === index;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative px-3.5 py-1.5 rounded-full text-xs font-bold text-soft-brown hover:text-ink transition-all flex items-center gap-2"
                  >
                    {isHovered && (
                      <motion.div
                        layoutId="navPillHover"
                        className={`absolute inset-0 rounded-full ${item.bgColor} border border-warm-gray/15`}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                    <span className={`relative z-10 p-1 rounded-md ${item.bgColor} ${item.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </nav>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <span className="font-[family-name:var(--font-cursive)] text-sm text-coral font-bold bg-[#FFF3ED] px-3 py-0.5 rounded-full border border-coral/15">
                interactive keepsake studio ✦
              </span>
            </div>
          )}

          {/* ─── Actions ─── */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-paper hover:bg-white border border-warm-gray/20 text-soft-brown hover:text-ink font-semibold text-xs transition-all shadow-xs active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5 text-coral" />
              <span>Sign In</span>
            </button>

            {isHome && (
              <Link
                href="/create"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-ink hover:bg-ink/90 text-cream font-bold text-xs shadow-sm transition-all active:scale-95 group"
              >
                <PlusCircle className="w-3.5 h-3.5 text-cream group-hover:rotate-90 transition-transform duration-300" />
                <span>Create Wish</span>
                <Sparkles className="w-3 h-3 text-coral animate-pulse" />
              </Link>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-soft-brown hover:bg-paper hover:text-ink transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* ─── Creative Wavy Bottom Border (Seamless Full-Width SVG) ─── */}
        <div className="w-full h-2 overflow-hidden leading-none select-none pointer-events-none -mb-[1px]">
          <svg
            className="w-full h-full text-warm-gray/20"
            viewBox="0 0 1200 8"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 3 Q 25 7, 50 3 T 100 3 T 150 3 T 200 3 T 250 3 T 300 3 T 350 3 T 400 3 T 450 3 T 500 3 T 550 3 T 600 3 T 650 3 T 700 3 T 750 3 T 800 3 T 850 3 T 900 3 T 950 3 T 1000 3 T 1050 3 T 1100 3 T 1150 3 T 1200 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-paper border-b border-warm-gray/10 px-4 py-3 space-y-2 overflow-hidden"
            >
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-bold text-soft-brown hover:bg-cream hover:text-ink transition-all"
              >
                <ArrowLeft className="w-4 h-4 text-coral" />
                <span>Home Page</span>
              </Link>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-bold text-soft-brown hover:bg-cream hover:text-ink transition-all"
                  >
                    <span className={`p-1.5 rounded-lg ${item.bgColor} ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span>{item.label}</span>
                  </a>
                );
              })}
              <div className="pt-2 border-t border-warm-gray/10">
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-coral rounded-xl bg-coral/10 hover:bg-coral/15 transition-colors"
                >
                  <LogIn className="w-4 h-4" /> Sign In with Google
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
