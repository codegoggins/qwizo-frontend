"use client"

import { useState, useEffect, useRef } from "react"
import { RiArrowDownSLine, RiCheckLine } from "react-icons/ri"

import { cn } from "@/lib/utils"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

function Select({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  className,
  disabled,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-10 w-full items-center justify-between border-2 border-neo-black bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow hover:shadow-[2px_2px_0px_0px_#1B1B1B] disabled:cursor-not-allowed disabled:opacity-50",
          !selectedOption && "text-muted-foreground"
        )}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <RiArrowDownSLine
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange?.(option.value)
                setOpen(false)
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground"
            >
              {option.label}
              {value === option.value && <RiCheckLine className="size-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { Select }
export type { SelectOption, SelectProps }
