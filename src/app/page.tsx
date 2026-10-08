import { JsonLd } from "@/components/common/json-ld"
import { HeroSection } from "@/features/hero/components/hero-section"
import { FeaturedWork } from "@/features/portfolio/components/featured-work"
import { ProfileSummary } from "@/features/profile/components/profile-summary"
import { pageMetadata } from "@/lib/page-metadata"
import { homeGraph } from "@/lib/structured-data"

export const metadata = pageMetadata({
  title: "Naveen Kumar — Product Designer",
  absolute: true,
  description:
    "Naveen Kumar is a Product Designer in Chennai, India, designing enterprise SaaS, AI-powered products and design systems. Case studies: Shenll HRMS, Dopamint and Megathil.",
  path: "/",
  image: "home.png",
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <HeroSection />
      <FeaturedWork />
      <ProfileSummary />
    </>
  )
}
