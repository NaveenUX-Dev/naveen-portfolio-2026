import type { LucideIcon } from "lucide-react"

export interface NavItem {
  label: string
  href: string
  /** Opens in a new tab, e.g. a document hosted elsewhere. */
  external?: boolean
  /** Hidden in the header on small screens (the logo already links home). */
  hideOnMobile?: boolean
}

export interface SocialLink {
  label: string
  href: string
  icon: LucideIcon
}
