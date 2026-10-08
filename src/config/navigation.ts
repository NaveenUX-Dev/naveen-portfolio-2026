import type { NavItem } from "@/types/global"

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/", hideOnMobile: true },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  {
    label: "Resume",
    href: "https://docs.google.com/document/d/1stesH5dcl3F-kuM1nEeQeptB9mb_Qik5/edit",
    external: true,
  },
  { label: "Contact", href: "/#contact" },
]
