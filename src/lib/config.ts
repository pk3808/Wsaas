export const OCCASIONS = [
  { id: "birthday", label: "Birthday", emoji: "🎂" },
  { id: "anniversary", label: "Anniversary", emoji: "💍" },
  { id: "friendship", label: "Friendship Day", emoji: "👯" },
  { id: "congratulations", label: "Congratulations", emoji: "🎉" },
  { id: "thank-you", label: "Thank You", emoji: "🙏" },
  { id: "custom", label: "Custom / Other", emoji: "✨" },
];

export const THEMES = [
  {
    id: "pastel",
    label: "Pastel Dream",
    colors: {
      bg: "bg-pink-100",
      card: "bg-white",
      text: "text-slate-800",
      accent: "text-pink-500",
      border: "border-pink-200",
      pattern: "bg-[radial-gradient(#fecdd3_1px,transparent_1px)] [background-size:16px_16px]"
    }
  },
  {
    id: "minimalist",
    label: "Clean & Minimalist",
    colors: {
      bg: "bg-slate-50",
      card: "bg-white",
      text: "text-slate-900",
      accent: "text-slate-900",
      border: "border-slate-200",
      pattern: ""
    }
  },
  {
    id: "elegant",
    label: "Elegant Dark",
    colors: {
      bg: "bg-slate-900",
      card: "bg-slate-800",
      text: "text-amber-50",
      accent: "text-amber-400",
      border: "border-slate-700",
      pattern: "bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:20px_20px] opacity-20"
    }
  },
  {
    id: "neon",
    label: "Cyber Neon",
    colors: {
      bg: "bg-black",
      card: "bg-zinc-900",
      text: "text-white",
      accent: "text-cyan-400",
      border: "border-cyan-900",
      pattern: "bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:24px_24px]"
    }
  },
];

export type OccasionType = typeof OCCASIONS[number]["id"];
export type ThemeType = typeof THEMES[number]["id"];

export interface WishData {
  recipientName: string;
  senderName: string;
  occasion: OccasionType;
  theme: ThemeType;
  age?: string;
  message: string;
}