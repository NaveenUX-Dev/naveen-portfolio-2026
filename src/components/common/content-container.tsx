import { cn } from "@/lib/utils"

export function ContentContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("container-page", className)} {...props} />
}
