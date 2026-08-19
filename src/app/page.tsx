import { CreateWishForm } from "@/components/CreateWishForm";
import { Sparkles, Heart, Gift } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 py-16 relative z-10 flex-1 flex flex-col items-center justify-center">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gift className="w-10 h-10 text-indigo-600" />
            <Heart className="w-8 h-8 text-pink-500" />
            <Sparkles className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Make Their Day <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
              Unforgettable
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Create beautiful, personalized web pages for birthdays, anniversaries, and special moments in just seconds. Share the unique link to surprise them!
          </p>
        </div>

        <div className="w-full">
          <CreateWishForm />
        </div>

      </div>

      <footer className="py-6 text-center text-slate-500 text-sm relative z-10">
        <p>Built with Next.js & Tailwind CSS. Spreading joy, one pixel at a time.</p>
      </footer>
    </main>
  );
}