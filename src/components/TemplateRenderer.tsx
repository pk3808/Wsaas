"use client";

import { type WishData } from "@/lib/config";
import { CelebrationCarnivalTemplate } from "@/components/templates/CelebrationCarnivalTemplate";
import { EternalRomanceTemplate } from "@/components/templates/EternalRomanceTemplate";
import { TriumphGoldTemplate } from "@/components/templates/TriumphGoldTemplate";
import { FestiveMagicTemplate } from "@/components/templates/FestiveMagicTemplate";
import { WarmHeartTemplate } from "@/components/templates/WarmHeartTemplate";
import { VintageScrapbook } from "@/components/templates/birthday/VintageScrapbook";
import { NeonNightclub } from "@/components/templates/birthday/NeonNightclub";
import { StarryNight } from "@/components/templates/birthday/StarryNight";
import { RetroArcade } from "@/components/templates/birthday/RetroArcade";
import { FloralGarden } from "@/components/templates/birthday/FloralGarden";

import { VisitorComments } from "@/components/VisitorComments";

interface TemplateRendererProps {
  data: WishData;
  slug: string;
}

export function TemplateRenderer({ data, slug }: TemplateRendererProps) {
  const templateId = data.templateId || (
    data.occasion === "anniversary" ? "romance" :
    data.occasion === "success" ? "triumph" :
    data.occasion === "festive" ? "festive" :
    data.occasion === "gratitude" ? "warmheart" : "carnival"
  );

  const renderTemplate = () => {
    switch (templateId) {
      case "vintage-scrapbook":
        return <VintageScrapbook data={data} slug={slug} />;
      case "neon-nightclub":
        return <NeonNightclub data={data} slug={slug} />;
      case "starry-night":
        return <StarryNight data={data} slug={slug} />;
      case "retro-arcade":
        return <RetroArcade data={data} slug={slug} />;
      case "floral-garden":
        return <FloralGarden data={data} slug={slug} />;
      case "romance":
        return <EternalRomanceTemplate data={data} slug={slug} />;
      case "triumph":
        return <TriumphGoldTemplate data={data} slug={slug} />;
      case "festive":
        return <FestiveMagicTemplate data={data} slug={slug} />;
      case "warmheart":
        return <WarmHeartTemplate data={data} slug={slug} />;
      case "carnival":
      default:
        return <CelebrationCarnivalTemplate data={data} slug={slug} />;
    }
  };

  return (
    <>
      {renderTemplate()}
      {/* Universal Floating Thank You Note & Remark Desk */}
      <VisitorComments slug={slug} recipientName={data.recipientName} senderName={data.senderName} />
    </>
  );
}
