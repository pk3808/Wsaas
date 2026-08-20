import { Navbar } from "@/components/Navbar";
import { CreationStudio } from "@/components/CreationStudio";
import { Footer } from "@/components/Footer";

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 pt-3 sm:pt-4 pb-12 px-4 relative overflow-hidden">
        {/* Dot grid paper texture background */}
        <div className="absolute inset-0 bg-dotgrid opacity-35 pointer-events-none" />

        {/* Notebook red margin line */}
        <div className="absolute top-0 left-16 w-px h-full bg-coral/8 hidden xl:block pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <CreationStudio />
        </div>
      </main>

      <Footer />
    </div>
  );
}
