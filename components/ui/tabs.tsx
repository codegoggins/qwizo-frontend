"use client"

import { createContext, useContext, type ComponentProps } from "react"

import { cn } from "@/lib/utils"

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) throw new Error("Tabs components must be used within <Tabs>")
  return context
}

function Tabs({
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
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div data-slot="tabs" className={cn("flex flex-col gap-0", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabsList({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="tabs-list"
      className={cn("flex border-2 border-neo-black shadow-[4px_4px_0px_0px_#1B1B1B]", className)}
      {...props}
    />
  )
}

function TabsTrigger({
  value,
  className,
  ...props
}: ComponentProps<"button"> & { value: string }) {
  const { value: selected, onValueChange } = useTabs()
  const isActive = selected === value

  return (
    <button
      type="button"
      data-slot="tabs-trigger"
      data-state={isActive ? "active" : "inactive"}
      onClick={() => onValueChange(value)}
      className={cn(
        "flex-1 px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-background text-foreground hover:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  value,
  className,
  ...props
}: ComponentProps<"div"> & { value: string }) {
  const { value: selected } = useTabs()
  if (selected !== value) return null

  return (
    <div
      data-slot="tabs-content"
      className={cn("border-2 border-t-0 border-neo-black p-4", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
