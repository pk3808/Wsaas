import type { Metadata } from "next";
import { DM_Sans, Caveat, Playfair_Display, Dancing_Script, Patrick_Hand } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwritten",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400", "500", "600", "700"],
});

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  variable: "--font-marker",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "WishCraft — Create Beautiful Digital Wishing Pages",
  description:
    "Turn birthdays, anniversaries, graduations & holidays into unforgettable, interactive digital keepsake pages your loved ones will treasure forever.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${caveat.variable} ${playfair.variable} ${dancingScript.variable} ${patrickHand.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}