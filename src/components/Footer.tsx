import Link from "next/link";
import { Gift, Heart } from "lucide-react";

/* doodles */
function DoodleHeart({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 36" fill="none"><path d="M20 35 C 14 28, 1 20, 1 12 C 1 5, 7 1, 13 1 C 16 1, 19 3, 20 6 C 21 3, 24 1, 27 1 C 33 1, 39 5, 39 12 C 39 20, 26 28, 20 35Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
}
function DoodleStar({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 40" fill="none"><path d="M20 3 L24 15 L37 15 L27 23 L30 36 L20 28 L10 36 L13 23 L3 15 L16 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function DoodleFlower({ className }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" />
    {[0,60,120,180,240,300].map((angle) => (
      <ellipse key={angle} cx="20" cy="10" rx="4" ry="7" stroke="currentColor" strokeWidth="1" transform={`rotate(${angle} 20 20)`} />
    ))}
  </svg>);
}

export function Footer() {
  return (
    <footer className="w-full bg-paper border-t border-warm-gray/10 text-soft-brown py-10 text-sm relative z-10 overflow-hidden">
      {/* Doodle scatter */}
      <DoodleHeart className="absolute top-4 left-[10%] w-5 h-5 text-coral/10 rotate-12 hidden md:block" />
      <DoodleStar className="absolute bottom-4 right-[12%] w-5 h-5 text-lavender/10 -rotate-6 hidden md:block" />
      <DoodleFlower className="absolute top-6 right-[30%] w-6 h-6 text-sage/8 hidden lg:block" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Divider doodle line */}
        <div className="flex items-center justify-center gap-3 mb-8 text-warm-gray/12">
          <DoodleStar className="w-4 h-4" />
          <svg className="w-24 h-1" viewBox="0 0 96 4" fill="none"><path d="M2 2 C 20 0, 40 4, 60 1 C 80 3, 94 1, 94 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <DoodleHeart className="w-4 h-4" />
          <svg className="w-24 h-1" viewBox="0 0 96 4" fill="none"><path d="M2 2 C 20 4, 40 0, 60 3 C 80 1, 94 3, 94 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          <DoodleFlower className="w-4 h-4" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-coral/10 border border-coral/15 flex items-center justify-center">
              <Gift className="w-4 h-4 text-coral" />
            </div>
            <div>
              <p className="font-bold text-ink text-sm">WishCraft</p>
              <p className="text-[10px] text-soft-brown/60">Digital keepsakes, handcrafted with love.</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs font-semibold text-soft-brown/70">
            <a href="#templates" className="hover:text-ink transition-colors">5 Templates</a>
            <Link href="/create" className="hover:text-ink transition-colors">Page Builder</Link>
            <Link href="/login" className="hover:text-ink transition-colors">Sign In</Link>
          </div>

          {/* Credit with handwritten accent */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="text-[11px] text-soft-brown/50 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-coral fill-coral" /> for joy & celebrations.
            </div>
            <p className="font-[family-name:var(--font-handwritten)] text-xs text-soft-brown/30">
              — spreading smiles, one page at a time ✦
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
