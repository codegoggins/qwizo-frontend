"use client"

import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Switch({
  className,
  checked,
  onCheckedChange,
  disabled,
  ...props
}: ComponentProps<"button"> & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-slot="switch"
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-neo-black shadow-[3px_3px_0px_0px_#1B1B1B] transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-muted",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block size-5 rounded-full border-2 border-neo-black bg-white transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  )
}

export { Switch }
