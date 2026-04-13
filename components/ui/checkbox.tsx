"use client"

import type { ComponentProps } from "react"
import { RiCheckLine } from "react-icons/ri"

import { cn } from "@/lib/utils"

function Checkbox({
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
      role="checkbox"
      aria-checked={checked}
      data-slot="checkbox"
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center border-2 border-neo-black shadow-[2px_2px_0px_0px_#1B1B1B] transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary text-primary-foreground" : "bg-background",
        className
      )}
      {...props}
    >
      {checked && <RiCheckLine className="size-3.5 stroke-1" />}
    </button>
  )
}

export { Checkbox }
