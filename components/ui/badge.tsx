import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border-2 border-neo-black px-2 py-0.5 text-xs font-bold",
  {
    variants: {
      variant: {
        default: "bg-secondary text-foreground",
        primary: "bg-primary text-primary-foreground",
        success: "bg-success text-neo-black",
        warning: "bg-warning text-neo-black",
        destructive: "bg-destructive text-white",
        muted: "bg-muted text-muted-foreground",
        archived: "bg-neo-black text-white",
        outline: "border-border bg-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  )
}

export { Badge, badgeVariants }
