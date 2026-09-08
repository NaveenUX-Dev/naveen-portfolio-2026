import { Dribbble, Github, Linkedin } from "lucide-react"
import type { SocialLink } from "@/types/global"

export const siteConfig = {
  name: "Naveen Kumar",
  shortName: "Naveen",
  role: "Senior Product Designer",
  url: "https://naveen2026-portfolio.web.app",
  email: "snaveenkumar.design@gmail.com",

  /** The whole introduction. One greeting, one role, one paragraph. */
  greeting: "Hi, I'm Naveen,",
  intro:
    "I design the systems people depend on — public infrastructure, connected care, workforce platforms and mental health. I start at the constraint, build the system before the screens, and stay in it through the build so the design ships intact.",

  /** Shown in metadata; the plain-language version of the above. */
  summary:
    "Senior Product Designer working on public infrastructure, connected care, workforce platforms and mental health.",

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
