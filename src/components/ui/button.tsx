import Link from "next/link"
import { cn } from "@/lib/utils"

type Variant = "primary" | "secondary" | "ghost"
type Size = "sm" | "md"

const base =
  "inline-flex items-center justify-center gap-1 rounded-full font-sans " +
  "font-medium whitespace-nowrap transition-standard focus-ring " +
  "disabled:pointer-events-none disabled:opacity-50"

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-olive-strong text-text-inverse hover:bg-accent-olive " +
    "dark:text-background shadow-sm",
  secondary:
    "bg-surface-elevated text-text-primary border border-border-subtle " +
    "hover:border-border-strong hover:bg-surface",
  ghost: "text-text-secondary hover:text-text-primary",
}

const sizes: Record<Size, string> = {
  sm: "h-5 px-2 text-sm",
  md: "h-6 px-3 text-sm sm:text-base",
}

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: Variant
  size?: Size
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
}

interface ButtonLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  variant?: Variant
  size?: Size
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
}
