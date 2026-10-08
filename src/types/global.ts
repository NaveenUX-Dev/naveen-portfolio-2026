import type { LucideIcon } from "lucide-react"

export interface NavItem {
  label: string
  href: string
  /** Opens in a new tab, e.g. a document hosted elsewhere. */
  external?: boolean
}

export interface SocialLink {
  label: string
  href: string
  icon: LucideIcon
}
