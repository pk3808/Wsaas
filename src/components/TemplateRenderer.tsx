"use client";

import { type WishData } from "@/lib/config";
import { CelebrationCarnivalTemplate } from "@/components/templates/CelebrationCarnivalTemplate";
import { EternalRomanceTemplate } from "@/components/templates/EternalRomanceTemplate";
import { TriumphGoldTemplate } from "@/components/templates/TriumphGoldTemplate";
import { FestiveMagicTemplate } from "@/components/templates/FestiveMagicTemplate";
import { WarmHeartTemplate } from "@/components/templates/WarmHeartTemplate";

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

  switch (templateId) {
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
}
