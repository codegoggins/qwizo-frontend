import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wide border-2 border-neo-black transition-all select-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_#1B1B1B] hover:shadow-[2px_2px_0px_0px_#1B1B1B] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[4px_4px_0px_0px_#1B1B1B] hover:shadow-[2px_2px_0px_0px_#1B1B1B] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        outline:
          "bg-background text-foreground shadow-[4px_4px_0px_0px_#1B1B1B] hover:shadow-[2px_2px_0px_0px_#1B1B1B] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        destructive:
          "bg-destructive text-white shadow-[4px_4px_0px_0px_#1B1B1B] hover:shadow-[2px_2px_0px_0px_#1B1B1B] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        success:
          "bg-success text-neo-black shadow-[4px_4px_0px_0px_#1B1B1B] hover:shadow-[2px_2px_0px_0px_#1B1B1B] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        warning:
          "bg-warning text-neo-black shadow-[4px_4px_0px_0px_#1B1B1B] hover:shadow-[2px_2px_0px_0px_#1B1B1B] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        ghost:
          "border-transparent hover:bg-muted hover:text-foreground",
        link:
          "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
