import { Sparkles, Gift, Heart, ArrowRight, ShieldCheck, MessageSquare, Zap } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative pt-20 pb-16 bg-slate-950 text-white overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 shadow-xl">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>The #1 Micro SaaS for Dedicated Celebration Pages</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none">
          Turn Special Moments into <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Unforgettable Web Pages
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Pick from 5 dedicated interactive templates for birthdays, anniversaries, graduations, holidays, and gratitude notes. Complete with Google auth login & live visitor guestbook.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#create"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-extrabold text-base shadow-xl hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Build Your Wish Page <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#templates"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            Explore 5 Templates
          </a>
        </div>

        {/* Feature Pill Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-2">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">5 High-Quality Themes</h3>
            <p className="text-xs text-slate-400 mt-1">Birthday, Romance, Success, Holidays & Warmth.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 w-fit mb-2">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Visitor Guestbook</h3>
            <p className="text-xs text-slate-400 mt-1">Visitors can leave live comments & emoji wishes.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Dynamic Form Inputs</h3>
            <p className="text-xs text-slate-400 mt-1">Form fields change based on the chosen occasion.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white">Google OAuth Login</h3>
            <p className="text-xs text-slate-400 mt-1">1-click Google Sign-in for user dashboard access.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
