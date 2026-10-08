import { JsonLd } from "@/components/common/json-ld"
import { AboutPage } from "@/features/profile/components/about-page"
import { pageMetadata } from "@/lib/page-metadata"
import { aboutGraph } from "@/lib/structured-data"

export const metadata = pageMetadata({
  title: "About",
  description:
    "Naveen Kumar is a Product Designer based in Chennai, India, at Shenll Technology Solutions since 2022. Experience, specialisms, education, and how to get in touch.",
  path: "/about/",
  type: "profile",
  image: "about.png",
})

export default function Page() {
  return (
    <>
      <JsonLd data={aboutGraph()} />
      <AboutPage />
    </>
  )
}
