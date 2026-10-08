import { Dribbble, Github, Linkedin } from "lucide-react"
import type { SocialLink } from "@/types/global"

export const siteConfig = {
  name: "Naveen Kumar",
  shortName: "Naveen",
  role: "Product Designer",
  email: "snaveenkumar.design@gmail.com",

  /** The home hero: a greeting, one headline, one supporting line. */
  greeting: "Hi, I’m Naveen Kumar",
  headline:
    "Product Designer building AI-powered SaaS products, agentic experiences, and scalable enterprise workflows.",
  intro:
    "A product designer who blends engineering thinking, UX, and AI to simplify complex workflows and build products people can actually understand.",

  /** Shown in metadata; the plain-language version of the above. */
  summary:
    "Product Designer building AI-powered SaaS products, agentic experiences, and scalable enterprise workflows.",

  contactPrompt: "Always up for a conversation.",
} as const

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/naveen-productdesign/",
    icon: Linkedin,
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/Naveenkumar-designs",
    icon: Dribbble,
  },
  { label: "GitHub", href: "https://github.com/NaveenUX-Dev", icon: Github },
]
