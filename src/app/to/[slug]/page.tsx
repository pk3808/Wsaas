import { DynamicWishClient } from "@/components/DynamicWishClient";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;
  const name = slug.replace(/-/g, ' ');
  const capitalizedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return {
    title: `A Special Wish for ${capitalizedName}`,
    description: `Someone has sent a special message to ${capitalizedName}. Open to see the surprise!`,
  };
}

export default async function DynamicWishPage(props: Props) {
  const params = await props.params;
  return <DynamicWishClient slug={params.slug} />;
}