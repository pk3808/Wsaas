import { Navbar } from "@/components/Navbar";
import { StoryHero } from "@/components/landing/StoryHero";
import { SketchbookStory } from "@/components/landing/SketchbookStory";
import { TemplateShowcase } from "@/components/TemplateShowcase";
import { ExploreCTA } from "@/components/landing/ExploreCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <StoryHero />
        <SketchbookStory />
        <TemplateShowcase />
        <ExploreCTA />
      </main>
      <Footer />
    </div>
  );
}