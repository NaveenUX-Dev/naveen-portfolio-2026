import type { NavItem } from "@/types/global"

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  {
    label: "Resume",
    href: "https://docs.google.com/document/d/1stesH5dcl3F-kuM1nEeQeptB9mb_Qik5/edit",
    external: true,
  },
  { label: "Contact", href: "/#contact" },
]
