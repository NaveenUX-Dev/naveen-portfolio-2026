export interface Project {
  slug: string
  title: string
  description: string
  /** Short line rendered inside the card's visual frame. */
  statement: string
  year?: string
  role?: string
  industries: string[]
  /** Path under /public/images/projects. Optional until real covers exist. */
  coverImage?: string
  /** Describes the cover; required whenever `coverImage` is set. */
  coverAlt?: string
  /** Evidence label shown on the cover, e.g. "UI concept · sample data". */
  coverLabel?: string
  /** Token names driving the card's placeholder frame gradient. */
  accent: "blue" | "amber" | "peach" | "olive"
  featured: boolean
}
