import type { Metadata } from "next"
import { ContentContainer } from "@/components/common/content-container"
import { ButtonLink } from "@/components/ui/button"

// Next.js adds <meta name="robots" content="noindex"> to not-found pages.
export const metadata: Metadata = {
  title: "Page not found",
}

export default function NotFound() {
  return (
    <ContentContainer className="flex min-h-[60svh] flex-col items-start justify-center gap-3 py-12">
      <h1 className="text-4xl sm:text-5xl">Page not found.</h1>
      <p className="max-w-[42ch] text-text-secondary">
        That page has moved or never existed. The work is still here.
      </p>
      <ButtonLink href="/" className="mt-2">
        Back to home
      </ButtonLink>
    </ContentContainer>
  )
}
