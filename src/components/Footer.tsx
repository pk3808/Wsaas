import Link from "next/link";
import { Gift, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-paper border-t border-warm-gray/10 text-soft-brown py-10 text-sm relative z-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-coral/10 border border-coral/15 flex items-center justify-center">
            <Gift className="w-4 h-4 text-coral" />
          </div>
          <div>
            <p className="font-bold text-ink text-sm">WishCraft</p>
            <p className="text-[10px] text-soft-brown/60">
              Digital keepsakes, handcrafted with love.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs font-semibold text-soft-brown/70">
          <a href="#templates" className="hover:text-ink transition-colors">
            5 Templates
          </a>
          <Link href="/create" className="hover:text-ink transition-colors">
            Page Builder
          </Link>
          <Link href="/login" className="hover:text-ink transition-colors">
            Sign In
          </Link>
        </div>

        {/* Credit */}
        <div className="text-[11px] text-soft-brown/50 flex items-center gap-1">
          Made with{" "}
          <Heart className="w-3 h-3 text-coral fill-coral" /> for joy &
          celebrations.
        </div>
      </div>
    </footer>
  );
}
