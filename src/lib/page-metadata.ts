import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { absoluteUrl } from "@/config/site-url"
import { ogCards, ogImagePath } from "@/lib/og/cards"
import { ogSize } from "@/lib/og/render"

interface PageMetadataInput {
  /** Used as-is in the <title> when `absolute`, else run through the template. */
  title: string
  absolute?: boolean
  description: string
  /** Site path, e.g. "/about/". */
  path: string
  type?: "website" | "article" | "profile"
  /** The page's social card in /og, e.g. "work-hrms.png". */
  image: string
}

/** Canonical, Open Graph and Twitter metadata, including the social card. */
export function pageMetadata({
  title,
  absolute = false,
  description,
  path,
  type = "website",
  image,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path)
  const socialTitle = absolute ? title : `${title} — ${siteConfig.name}`
  const card = ogCards()[image]
  if (!card) throw new Error(`No social card named "${image}" in lib/og/cards.ts`)
  const socialImage = {
    url: absoluteUrl(ogImagePath(image)),
    ...ogSize,
    alt: card.alt,
    type: "image/png",
  }

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: socialTitle,
      description,
      siteName: siteConfig.name,
      locale: "en_US",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  }
}
