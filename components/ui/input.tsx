import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full border-2 border-neo-black bg-background px-3 py-2 text-sm font-medium text-foreground shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow placeholder:text-muted-foreground focus:shadow-[2px_2px_0px_0px_#1B1B1B] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
