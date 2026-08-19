import { Navbar } from "@/components/Navbar";
import { CreateWishForm } from "@/components/CreateWishForm";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 py-10 px-4 relative overflow-hidden">
        {/* Dot grid paper texture background */}
        <div className="absolute inset-0 bg-dotgrid opacity-35 pointer-events-none" />

        {/* Notebook red margin line */}
        <div className="absolute top-0 left-16 w-px h-full bg-coral/8 hidden xl:block pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 space-y-6">
          {/* Back to Home Button */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-soft-brown hover:text-coral transition-colors px-3 py-1.5 rounded-full bg-paper border border-warm-gray/15 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Story</span>
            </Link>

            <span className="font-[family-name:var(--font-cursive)] text-base text-coral font-bold hidden sm:inline-block">
              crafting memories in 60s ✦
            </span>
          </div>

          {/* Form Component */}
          <CreateWishForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
