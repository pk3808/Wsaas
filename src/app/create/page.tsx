import { Navbar } from "@/components/Navbar";
import { CreateWishForm } from "@/components/CreateWishForm";
import { Footer } from "@/components/Footer";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1 py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto max-w-4xl mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Storytelling Home
          </Link>
        </div>

        <div className="container mx-auto">
          <CreateWishForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
