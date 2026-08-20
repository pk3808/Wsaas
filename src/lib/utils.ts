import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Short key map to minimize payload size
const KEY_MAP: Record<string, string> = {
  recipientName: "r",
  senderName: "s",
  occasion: "o",
  templateId: "t",
  message: "m",
  age: "a",
  nickname: "n",
  candleText: "ct",
  anniversaryDate: "ad",
  yearsTogether: "yt",
  loveQuote: "lq",
  achievementTitle: "at",
  institutionName: "in",
  festivalName: "fn",
  giftBoxSurprise: "gb",
  gratitudeReason: "gr",
  memoryTags: "mt",
};

const REVERSE_KEY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(KEY_MAP).map(([k, v]) => [v, k])
);

function shortenKeys(data: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== "" && value !== null) {
      result[KEY_MAP[key] || key] = value;
    }
  }
  return result;
}

function expandKeys(data: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    result[REVERSE_KEY_MAP[key] || key] = value;
  }
  return result;
}

export function encodeData(data: unknown): string {
  try {
    const shortened = shortenKeys(data as Record<string, unknown>);
    const jsonString = JSON.stringify(shortened);
    // UTF-8 friendly base64 encoding
    return btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16))
    }))
  } catch (error) {
    console.error("Failed to encode data", error)
    return ""
  }
}

export function decodeData(encodedData: string): unknown {
  try {
    const decodedString = decodeURIComponent(
      Array.from(atob(encodedData))
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    const parsed = JSON.parse(decodedString);
    // Support both old (full keys) and new (short keys) formats
    if (parsed && typeof parsed === "object") {
      const hasShortKeys = Object.keys(parsed).some((k) => k.length <= 2 && REVERSE_KEY_MAP[k]);
      if (hasShortKeys) {
        return expandKeys(parsed as Record<string, unknown>);
      }
    }
    return parsed;
  } catch (error) {
    console.error("Failed to decode data", error)
    return null
  }
}

export function calculateDaysBetween(startDateStr?: string): number {
  if (!startDateStr) return 365;
  const start = new Date(startDateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return isNaN(diffDays) ? 365 : diffDays;
}