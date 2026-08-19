export interface TemplateConfig {
  id: "carnival" | "romance" | "triumph" | "festive" | "warmheart";
  name: string;
  tagline: string;
  defaultOccasion: string;
  previewGradient: string;
  badgeText: string;
  colors: {
    bg: string;
    card: string;
    text: string;
    accent: string;
    border: string;
    button: string;
  };
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "carnival",
    name: "Celebration Carnival",
    tagline: "Vibrant party vibes with confetti bursts & cake candles",
    defaultOccasion: "birthday",
    previewGradient: "from-indigo-500 via-purple-500 to-pink-500",
    badgeText: "Most Popular for Birthdays 🎂",
    colors: {
      bg: "bg-slate-900",
      card: "bg-slate-800/90 backdrop-blur-xl",
      text: "text-white",
      accent: "text-amber-400",
      border: "border-purple-500/30",
      button: "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white",
    },
  },
  {
    id: "romance",
    name: "Eternal Romance",
    tagline: "Romantic rose gold glow, floating hearts & days together counter",
    defaultOccasion: "anniversary",
    previewGradient: "from-rose-600 via-pink-600 to-red-500",
    badgeText: "Best for Couples & Valentine 💍",
    colors: {
      bg: "bg-zinc-950",
      card: "bg-zinc-900/90 backdrop-blur-xl",
      text: "text-rose-50",
      accent: "text-rose-400",
      border: "border-rose-500/30",
      button: "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white",
    },
  },
  {
    id: "triumph",
    name: "Triumph Gold",
    tagline: "Sleek obsidian gold theme for graduations & big milestones",
    defaultOccasion: "success",
    previewGradient: "from-amber-700 via-yellow-600 to-zinc-900",
    badgeText: "Prestige & Success 🎉",
    colors: {
      bg: "bg-black",
      card: "bg-neutral-900/90 backdrop-blur-xl",
      text: "text-amber-100",
      accent: "text-amber-400",
      border: "border-amber-500/30",
      button: "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold",
    },
  },
  {
    id: "festive",
    name: "Festive Magic",
    tagline: "Cozy winter glow with falling snow & present unboxing reveal",
    defaultOccasion: "festive",
    previewGradient: "from-emerald-700 via-teal-700 to-red-700",
    badgeText: "Holidays & Festivals 🎄",
    colors: {
      bg: "bg-emerald-950",
      card: "bg-emerald-900/90 backdrop-blur-xl",
      text: "text-emerald-50",
      accent: "text-yellow-300",
      border: "border-emerald-500/30",
      button: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white",
    },
  },
  {
    id: "warmheart",
    name: "Warm Heart",
    tagline: "Soft pastel glassmorphism with handwritten warmth & hugs",
    defaultOccasion: "gratitude",
    previewGradient: "from-teal-400 via-cyan-400 to-sky-500",
    badgeText: "Gratitude & Farewell 💐",
    colors: {
      bg: "bg-slate-50",
      card: "bg-white/90 backdrop-blur-xl",
      text: "text-slate-800",
      accent: "text-teal-600",
      border: "border-teal-200",
      button: "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white",
    },
  },
];

export const OCCASIONS = [
  { id: "birthday", label: "Birthday", emoji: "🎂", defaultTemplate: "carnival" },
  { id: "anniversary", label: "Anniversary & Romance", emoji: "💍", defaultTemplate: "romance" },
  { id: "success", label: "Graduation & Success", emoji: "🎉", defaultTemplate: "triumph" },
  { id: "festive", label: "Holidays & Festivals", emoji: "🎄", defaultTemplate: "festive" },
  { id: "gratitude", label: "Gratitude & Farewell", emoji: "💐", defaultTemplate: "warmheart" },
];

export type OccasionType = typeof OCCASIONS[number]["id"];
export type TemplateIdType = typeof TEMPLATES[number]["id"];

export interface WishData {
  recipientName: string;
  senderName: string;
  occasion: OccasionType;
  templateId: TemplateIdType;
  message: string;

  // Occasion dynamic fields
  age?: string;
  nickname?: string;
  candleText?: string;
  anniversaryDate?: string;
  yearsTogether?: string;
  loveQuote?: string;
  achievementTitle?: string;
  institutionName?: string;
  festivalName?: string;
  giftBoxSurprise?: string;
  gratitudeReason?: string;
  memoryTags?: string;
}

export interface VisitorComment {
  id: string;
  authorName: string;
  message: string;
  emoji: string;
  timestamp: string;
  likes: number;
}