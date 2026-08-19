import type { Metadata } from "next";
import { DM_Sans, Caveat } from "next/font/google";
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
      <body className={`${dmSans.variable} ${caveat.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}