import { ogCards } from "@/lib/og/cards"
import { renderOgImage } from "@/lib/og/render"

// Static export: every card is rendered at build time into out/og/<file>.
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(ogCards()).map((image) => ({ image }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ image: string }> },
) {
  const { image } = await params
  const { kicker, title, subtitle, footer } = ogCards()[image]
  return renderOgImage({ kicker, title, subtitle, footer })
}
