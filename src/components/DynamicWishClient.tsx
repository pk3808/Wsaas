"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { decodeData } from "@/lib/utils";
import { type WishData } from "@/lib/config";
import { TemplateRenderer } from "@/components/TemplateRenderer";

function DynamicWishClientContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<WishData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const d = searchParams.get("d");
    if (d) {
      const decoded = decodeData(d);
      if (decoded && (decoded as WishData).recipientName) {
        setData(decoded as WishData);
        return;
      }
    }

    // Fallback demo wish data for direct link testing
    const formattedName = slug
      ? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : "Friend";

    setData({
      recipientName: formattedName,
      senderName: "Your Well-Wisher",
      occasion: "birthday",
      templateId: "carnival",
      age: "25",
      message: "May your year ahead be packed with endless adventures, laughter, success, and pure joy! Wishing you the happiest day ever!",
    });
  }, [searchParams, slug]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl">
          <h2 className="text-2xl font-bold text-rose-400 mb-2">Link Expired or Invalid</h2>
          <p className="text-slate-400">We couldn't decode this wish page payload.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <TemplateRenderer data={data} slug={slug} />;
}

export function DynamicWishClient({ slug }: { slug: string }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DynamicWishClientContent slug={slug} />
    </Suspense>
  );
}