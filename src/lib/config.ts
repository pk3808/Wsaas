export interface TemplateConfig {
  id: "carnival" | "romance" | "triumph" | "festive" | "warmheart" | "vintage-scrapbook" | "neon-nightclub" | "starry-night" | "retro-arcade" | "floral-garden" | "golden-thread" | "midnight-bokeh" | "wax-seal" | "floating-lanterns" | "vintage-filmstrip" | "celestial-lovers";
  name: string;
  tagline: string;
  defaultOccasion: OccasionType;
  badgeText: string;
  themeColor: string;
  accentColor: string;
  bgTone: string;
  features: string[];
  sampleVisual: string;
}

export const TEMPLATES: TemplateConfig[] = [
  // ─── NEW ROMANCE & ANNIVERSARY TEMPLATES ───
  {
    id: "golden-thread",
    name: "The Golden Thread",
    tagline: "Elegant ivory parchment with an animated tracing golden thread.",
    defaultOccasion: "anniversary",
    badgeText: "Artistic & Meaningful 🧵",
    themeColor: "#B8860B", // Dark Goldenrod
    accentColor: "#FDF5E6", // Old Lace
    bgTone: "bg-[#FDF5E6] border-[#B8860B]/20 text-[#B8860B]",
    features: ["Animated Thread", "Polaroid Drops", "Calligraphy Typography"],
    sampleVisual: "🧵",
  },
  {
    id: "midnight-bokeh",
    name: "Midnight Bokeh",
    tagline: "Sophisticated deep navy night with softly drifting glowing orbs.",
    defaultOccasion: "anniversary",
    badgeText: "Cinematic & Sophisticated 🌃",
    themeColor: "#FFD700", // Gold
    accentColor: "#0B1021", // Deep Navy
    bgTone: "bg-[#0B1021] border-[#FFD700]/20 text-[#FFD700]",
    features: ["Canvas Bokeh Engine", "Glow Effects", "Elegant Serif Fonts"],
    sampleVisual: "🌃",
  },
  {
    id: "wax-seal",
    name: "The Wax Seal Letter",
    tagline: "Intimate velvet romance with an interactive unfolding envelope.",
    defaultOccasion: "anniversary",
    badgeText: "Intimate & Classic 💌",
    themeColor: "#800020", // Burgundy
    accentColor: "#FFF8DC", // Cornsilk
    bgTone: "bg-[#800020] border-[#FFF8DC]/20 text-[#FFF8DC]",
    features: ["Interactive Wax Seal", "Letter Unfolding", "Velvet Textures"],
    sampleVisual: "💌",
  },
  {
    id: "floating-lanterns",
    name: "Floating Lanterns",
    tagline: "Dreamy twilight sky with warmly glowing interactive lanterns.",
    defaultOccasion: "anniversary",
    badgeText: "Dreamy & Warm 🏮",
    themeColor: "#FF8C00", // Dark Orange
    accentColor: "#483D8B", // Dark Slate Blue
    bgTone: "bg-gradient-to-t from-[#FF8C00]/20 to-[#483D8B]/80 border-[#FF8C00]/20 text-white",
    features: ["CSS/Canvas Lanterns", "Sparkle Confetti", "Twilight Gradient"],
    sampleVisual: "🏮",
  },
  {
    id: "vintage-filmstrip",
    name: "Vintage Filmstrip",
    tagline: "Nostalgic Hollywood romance sliding cinematic memories.",
    defaultOccasion: "anniversary",
    badgeText: "Classic & Nostalgic 🎞️",
    themeColor: "#8B4513", // Saddle Brown
    accentColor: "#F5DEB3", // Wheat
    bgTone: "bg-[#F5DEB3] border-[#8B4513]/20 text-[#8B4513]",
    features: ["Sliding Carousel", "Sepia Tones", "Countdown Animation"],
    sampleVisual: "🎞️",
  },
  {
    id: "celestial-lovers",
    name: "Celestial Lovers",
    tagline: "Cosmic interactive space where stars trace your love story.",
    defaultOccasion: "anniversary",
    badgeText: "Cosmic & Ethereal ✨",
    themeColor: "#E0FFFF", // Light Cyan
    accentColor: "#000000", // Black
    bgTone: "bg-black border-[#E0FFFF]/20 text-[#E0FFFF]",
    features: ["Interactive Star Map", "Constellation Lines", "Ethereal Glow"],
    sampleVisual: "✨",
  },
  // ─── NEW BIRTHDAY TEMPLATES ───
  {
    id: "vintage-scrapbook",
    name: "Vintage Scrapbook",
    tagline: "Nostalgic handmade memory book with polaroids & washi tape.",
    defaultOccasion: "birthday",
    badgeText: "Nostalgic & Personal 📸",
    themeColor: "#D4A373",
    accentColor: "#FAEDCD",
    bgTone: "bg-amber-900/10 border-amber-900/20 text-amber-900",
    features: ["Polaroid Drops", "Handwritten SVG Drawings", "Sticky Note Guestbook"],
    sampleVisual: "📸",
  },
  {
    id: "neon-nightclub",
    name: "Neon Nightclub",
    tagline: "High-energy vibrant party with pulsing neon lights.",
    defaultOccasion: "birthday",
    badgeText: "Energetic & Modern 🪩",
    themeColor: "#EC4899",
    accentColor: "#FBCFE8",
    bgTone: "bg-pink-500/10 border-pink-500/20 text-pink-500",
    features: ["Pulsating Glow", "Neon Sign Text", "Geometric Confetti"],
    sampleVisual: "🪩",
  },
  {
    id: "starry-night",
    name: "Magical Starry Night",
    tagline: "Elegant, dreamy midnight sky with twinkling gold stars.",
    defaultOccasion: "birthday",
    badgeText: "Elegant & Dreamy 🌟",
    themeColor: "#3B82F6",
    accentColor: "#BFDBFE",
    bgTone: "bg-blue-500/10 border-blue-500/20 text-blue-500",
    features: ["Twinkling Stars", "Shooting Star Interactions", "Glowing Auroras"],
    sampleVisual: "🌟",
  },
  {
    id: "retro-arcade",
    name: "Retro Arcade",
    tagline: "Playful 8-bit nostalgia with arcade fonts and pixel art.",
    defaultOccasion: "birthday",
    badgeText: "Playful & Geeky 👾",
    themeColor: "#EF4444",
    accentColor: "#FECACA",
    bgTone: "bg-red-500/10 border-red-500/20 text-red-500",
    features: ["Pixelated Canvas", "Terminal Typing Text", "High Score Guestbook"],
    sampleVisual: "👾",
  },
  {
    id: "floral-garden",
    name: "Floral Garden",
    tagline: "Sophisticated serene nature vibes with soft cherry blossoms.",
    defaultOccasion: "birthday",
    badgeText: "Beautiful & Serene 🌸",
    themeColor: "#10B981",
    accentColor: "#D1FAE5",
    bgTone: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
    features: ["Swaying Leaves", "Falling Petals", "Botanical Frames"],
    sampleVisual: "🌸",
  },
  // ─── EXISTING GENERAL TEMPLATES ───
  {
    id: "carnival",
    name: "Celebration Carnival",
    tagline: "Vibrant party vibes with interactive cake candles, party poppers & joy bursts.",
    defaultOccasion: "birthday",
    badgeText: "Most Popular for Birthdays 🎂",
    themeColor: "#E8856C",
    accentColor: "#F5C6A8",
    bgTone: "bg-coral/10 border-coral/25 text-coral",
    features: ["Interactive 3D Cake & Candle", "Confetti Cannon Button", "Live Guestbook Wishes"],
    sampleVisual: "🎂",
  },
  {
    id: "romance",
    name: "Eternal Romance",
    tagline: "Romantic rose gold parchment, floating hearts, love lock & days together counter.",
    defaultOccasion: "anniversary",
    badgeText: "Best for Couples & Valentine 💍",
    themeColor: "#E11D48",
    accentColor: "#FDA4AF",
    bgTone: "bg-rose-50 border-rose-200 text-rose-600",
    features: ["Love Quote Stationery", "Milestone Days Counter", "Sweet Polaroid Memories"],
    sampleVisual: "💖",
  },
  {
    id: "triumph",
    name: "Triumph Gold",
    tagline: "Prestigious champagne & obsidian theme for graduations, promotions & milestones.",
    defaultOccasion: "success",
    badgeText: "Prestige & Success 🎉",
    themeColor: "#D97706",
    accentColor: "#FDE68A",
    bgTone: "bg-amber-50 border-amber-200 text-amber-700",
    features: ["Laurel Wreath Seal", "Institution / Company Badge", "Live Cheers Guestbook"],
    sampleVisual: "🎓",
  },
  {
    id: "festive",
    name: "Festive Magic",
    tagline: "Cozy winter glow with falling festive snow & surprise gift unboxing reveal.",
    defaultOccasion: "festive",
    badgeText: "Holidays & Festivals 🎄",
    themeColor: "#059669",
    accentColor: "#A7F3D0",
    bgTone: "bg-emerald-50 border-emerald-200 text-emerald-700",
    features: ["Gift Box Tap-to-Open", "Festive Particle Snow", "Warm Holiday Letter"],
    sampleVisual: "🎁",
  },
  {
    id: "warmheart",
    name: "Warm Heart",
    tagline: "Soft botanical watercolor, taped Polaroid memory frames & heartfelt thank-yous.",
    defaultOccasion: "gratitude",
    badgeText: "Gratitude & Farewell 💐",
    themeColor: "#0D9488",
    accentColor: "#99F6E4",
    bgTone: "bg-teal-50 border-teal-200 text-teal-700",
    features: ["Polaroid Memories", "Memory Hashtag Chips", "Gratitude Guestbook"],
    sampleVisual: "💐",
  },
];

export const OCCASIONS = [
  { id: "all", label: "All Celebrations", emoji: "✨", defaultTemplate: "carnival" },
  { id: "birthday", label: "Birthday", emoji: "🎂", defaultTemplate: "carnival" },
  { id: "anniversary", label: "Romance & Anniversary", emoji: "💍", defaultTemplate: "romance" },
  { id: "success", label: "Graduation & Success", emoji: "🎉", defaultTemplate: "triumph" },
  { id: "festive", label: "Holidays & Festivals", emoji: "🎄", defaultTemplate: "festive" },
  { id: "gratitude", label: "Gratitude & Farewell", emoji: "💐", defaultTemplate: "warmheart" },
] as const;

export type OccasionType = "birthday" | "anniversary" | "success" | "festive" | "gratitude";
export type FilterOccasionType = typeof OCCASIONS[number]["id"];
export type TemplateIdType = typeof TEMPLATES[number]["id"];
export type RelationshipType = "friend" | "partner" | "family" | "colleague";

export interface WishData {
  recipientName: string;
  senderName: string;
  occasion: OccasionType;
  templateId: TemplateIdType;
  message: string;

  // Occasion dynamic fields
  relationship?: RelationshipType;
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

  // Celebration Carnival Dynamic Fields (JSON stringified arrays)
  carnivalWishes?: string;
  carnivalHiddenMessages?: string;
  carnivalMemories?: string;
  carnivalFortunes?: string;
  carnivalGuestMessages?: string;

  // Retro Arcade Dynamic Fields (JSON stringified arrays)
  arcadeMemories?: string;
  arcadePowerups?: string;
  arcadeSecrets?: string;

  // Starry Night Dynamic Fields (JSON stringified arrays)
  starryWishes?: string;
  starryMemories?: string;
  starryLetters?: string;
  starrySecrets?: string;

  // Neon Nightclub Dynamic Fields (JSON stringified arrays)
  neonMemories?: string;
  neonWishes?: string;
  neonSigns?: string;
  neonVIPMessage?: string;

  // Vintage Scrapbook Dynamic Fields (JSON stringified arrays)
  scrapbookMemories?: string;
  scrapbookNotes?: string;
  scrapbookBucketList?: string;
  scrapbookEnvelopes?: string;

  // Golden Thread Dynamic Fields (JSON stringified arrays)
  goldenThreadMemories?: string;
  goldenThreadNotes?: string;

  // Midnight Bokeh Dynamic Fields (JSON stringified arrays)
  bokehReasons?: string;
  bokehWishes?: string;

  // Wax Seal Letter Dynamic Fields (JSON stringified arrays)
  waxSealLetterContent?: string;
  waxSealPS?: string;

  // Floating Lanterns Dynamic Fields (JSON stringified arrays)
  lanternWishes?: string;
  lanternMemories?: string;

  // Vintage Filmstrip Dynamic Fields (JSON stringified arrays)
  filmstripFrames?: string;
  filmstripQuotes?: string;

  // Celestial Lovers Dynamic Fields (JSON stringified arrays)
  celestialConstellations?: string;
  celestialMessages?: string;
}

export interface VisitorComment {
  id: string;
  authorName: string;
  message: string;
  emoji: string;
  timestamp: string;
  likes: number;
}