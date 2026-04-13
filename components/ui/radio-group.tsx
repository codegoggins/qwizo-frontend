"use client"

import { createContext, useContext, type ComponentProps } from "react"

import { cn } from "@/lib/utils"

interface RadioGroupContextValue {
  value: string
  onValueChange: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

function useRadioGroup() {
  const context = useContext(RadioGroupContext)
  if (!context) throw new Error("RadioGroupItem must be used within <RadioGroup>")
  return context
}

function RadioGroup({
  value,
  onValueChange,
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  value: string
  onValueChange: (value: string) => void
}) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div
        data-slot="radio-group"
        role="radiogroup"
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

function RadioGroupItem({
  value,
  className,
  disabled,
  ...props
}: ComponentProps<"button"> & { value: string }) {
  const { value: selected, onValueChange } = useRadioGroup()
  const isSelected = selected === value

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      data-slot="radio-group-item"
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-neo-black shadow-[2px_2px_0px_0px_#1B1B1B] transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        isSelected ? "bg-primary" : "bg-background",
        className
      )}
      {...props}
    >
      {isSelected && (
        <span className="block size-2 rounded-full bg-white" />
      )}
    </button>
  )
}

export { RadioGroup, RadioGroupItem }
