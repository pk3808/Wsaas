import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encodeData(data: any): string {
  try {
    const jsonString = JSON.stringify(data)
    return btoa(encodeURIComponent(jsonString))
  } catch (error) {
    console.error("Failed to encode data", error)
    return ""
  }
}

export function decodeData(encodedData: string): any {
  try {
    const jsonString = decodeURIComponent(atob(encodedData))
    return JSON.parse(jsonString)
  } catch (error) {
    console.error("Failed to decode data", error)
    return null
  }
}