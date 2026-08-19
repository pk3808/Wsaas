import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeData(data: unknown): string {
  try {
    const jsonString = JSON.stringify(data)
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
    return JSON.parse(decodedString)
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