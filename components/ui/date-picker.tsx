"use client"

import { useState, useEffect, useRef, type RefObject } from "react"
import { RiArrowLeftSLine, RiArrowRightSLine, RiCalendarLine } from "react-icons/ri"

import { cn } from "@/lib/utils"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function padZero(n: number) {
  return n.toString().padStart(2, "0")
}

function getDropdownPosition(ref: RefObject<HTMLDivElement | null>) {
  if (!ref.current) return "bottom" as const
  const rect = ref.current.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  const dropdownHeight = 380
  return spaceBelow < dropdownHeight && spaceAbove > spaceBelow ? "top" as const : "bottom" as const
}

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  showHours?: boolean
  showMinutes?: boolean
  showSeconds?: boolean
  className?: string
}

function DatePicker({
  value,
  onChange,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  className,
}: DatePickerProps) {
  const showTime = showHours || showMinutes || showSeconds
  const now = value || new Date()
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<"calendar" | "year" | "month">("calendar")
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [hour, setHour] = useState(now.getHours())
  const [minute, setMinute] = useState(now.getMinutes())
  const [second, setSecond] = useState(now.getSeconds())
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<"bottom" | "top">("bottom")

  function toggleOpen() {
    if (!open) {
      setPosition(getDropdownPosition(ref))
    }
    setOpen(!open)
  }

  const selectedDay = value?.getDate() ?? null
  const selectedMonth = value?.getMonth() ?? null
  const selectedYear = value?.getFullYear() ?? null

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function selectDate(day: number) {
    const next = new Date(viewYear, viewMonth, day, hour, minute, second)
    onChange?.(next)
  }

  function updateTime(h: number, m: number, s: number) {
    setHour(h)
    setMinute(m)
    setSecond(s)
    if (value) {
      const next = new Date(value)
      next.setHours(h, m, s)
      onChange?.(next)
    }
  }

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const yearStart = Math.floor(viewYear / 12) * 12
  const years = Array.from({ length: 12 }, (_, i) => yearStart + i)

  const displayParts: string[] = []
  if (value) {
    displayParts.push(`${MONTHS[value.getMonth()].slice(0, 3)} ${value.getDate()}, ${value.getFullYear()}`)
    if (showTime) {
      const timeParts: string[] = []
      if (showHours) timeParts.push(padZero(value.getHours()))
      if (showMinutes) timeParts.push(padZero(value.getMinutes()))
      if (showSeconds) timeParts.push(padZero(value.getSeconds()))
      displayParts.push(timeParts.join(":"))
    }
  }
  const displayText = displayParts.length > 0 ? displayParts.join(" ") : "Pick a date"

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={toggleOpen}
        className={cn(
          "flex h-10 w-full items-center gap-2 border-2 border-neo-black bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow hover:shadow-[2px_2px_0px_0px_#1B1B1B]",
          !value && "text-muted-foreground"
        )}
      >
        <RiCalendarLine className="size-4" />
        {displayText}
      </button>

      {open && (
        <div
          className={cn(
            "absolute z-50 flex border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]",
            position === "bottom" ? "top-full mt-1" : "bottom-full mb-1",
            showTime ? "w-auto" : "w-70"
          )}
        >
          <div className={cn(showTime ? "w-70" : "flex-1")}>
            <CalendarHeader
              view={view}
              viewYear={viewYear}
              viewMonth={viewMonth}
              yearStart={yearStart}
              onPrev={() => {
                if (view === "year") setViewYear(viewYear - 12)
                else prevMonth()
              }}
              onNext={() => {
                if (view === "year") setViewYear(viewYear + 12)
                else nextMonth()
              }}
              onToggleView={() => setView(view === "calendar" ? "year" : "calendar")}
            />

            {view === "year" && (
              <YearGrid
                years={years}
                selectedYear={selectedYear}
                onSelect={(y) => {
                  setViewYear(y)
                  setView("month")
                }}
              />
            )}

            {view === "month" && (
              <MonthGrid
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                viewYear={viewYear}
                onSelect={(m) => {
                  setViewMonth(m)
                  setView("calendar")
                }}
              />
            )}

            {view === "calendar" && (
              <DayGrid
                daysInMonth={daysInMonth}
                firstDay={firstDay}
                selectedDay={selectedDay}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                viewMonth={viewMonth}
                viewYear={viewYear}
                onSelect={selectDate}
              />
            )}
          </div>

          {showTime && (
            <TimePanel
              hour={hour}
              minute={minute}
              second={second}
              showHours={showHours}
              showMinutes={showMinutes}
              showSeconds={showSeconds}
              onChange={updateTime}
            />
          )}
        </div>
      )}
    </div>
  )
}

function CalendarHeader({
  view,
  viewYear,
  viewMonth,
  yearStart,
  onPrev,
  onNext,
  onToggleView,
}: {
  view: "calendar" | "year" | "month"
  viewYear: number
  viewMonth: number
  yearStart: number
  onPrev: () => void
  onNext: () => void
  onToggleView: () => void
}) {
  const label =
    view === "year"
      ? `${yearStart} – ${yearStart + 11}`
      : view === "month"
        ? `${viewYear}`
        : `${MONTHS[viewMonth]} ${viewYear}`

  return (
    <div className="flex items-center justify-between border-b-2 border-neo-black px-2 py-2">
      <button
        type="button"
        onClick={onPrev}
        className="flex size-8 items-center justify-center border-2 border-neo-black bg-background font-bold hover:bg-muted"
      >
        <RiArrowLeftSLine className="size-4" />
      </button>
      <button
        type="button"
        onClick={onToggleView}
        className="text-sm font-bold uppercase tracking-wide hover:text-primary"
      >
        {label}
      </button>
      <button
        type="button"
        onClick={onNext}
        className="flex size-8 items-center justify-center border-2 border-neo-black bg-background font-bold hover:bg-muted"
      >
        <RiArrowRightSLine className="size-4" />
      </button>
    </div>
  )
}

function YearGrid({
  years,
  selectedYear,
  onSelect,
}: {
  years: number[]
  selectedYear: number | null
  onSelect: (year: number) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-1 p-2">
      {years.map((y) => (
        <button
          key={y}
          type="button"
          onClick={() => onSelect(y)}
          className={cn(
            "py-2 text-sm font-bold transition-colors hover:bg-primary hover:text-primary-foreground",
            y === selectedYear && "bg-primary text-primary-foreground"
          )}
        >
          {y}
        </button>
      ))}
    </div>
  )
}

function MonthGrid({
  selectedMonth,
  selectedYear,
  viewYear,
  onSelect,
}: {
  selectedMonth: number | null
  selectedYear: number | null
  viewYear: number
  onSelect: (month: number) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-1 p-2">
      {MONTHS.map((m, i) => (
        <button
          key={m}
          type="button"
          onClick={() => onSelect(i)}
          className={cn(
            "py-2 text-sm font-bold transition-colors hover:bg-primary hover:text-primary-foreground",
            i === selectedMonth && viewYear === selectedYear && "bg-primary text-primary-foreground"
          )}
        >
          {m.slice(0, 3)}
        </button>
      ))}
    </div>
  )
}

function DayGrid({
  daysInMonth,
  firstDay,
  selectedDay,
  selectedMonth,
  selectedYear,
  viewMonth,
  viewYear,
  onSelect,
}: {
  daysInMonth: number
  firstDay: number
  selectedDay: number | null
  selectedMonth: number | null
  selectedYear: number | null
  viewMonth: number
  viewYear: number
  onSelect: (day: number) => void
}) {
  const isSelected = (day: number) =>
    day === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear

  return (
    <div className="p-2">
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d} className="py-1 text-center text-xs font-bold text-muted-foreground">
            {d}
          </div>
        ))}
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelect(day)}
              className={cn(
                "py-1.5 text-center text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground",
                isSelected(day) && "bg-primary text-primary-foreground"
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TimePanel({
  hour,
  minute,
  second,
  showHours,
  showMinutes,
  showSeconds,
  onChange,
}: {
  hour: number
  minute: number
  second: number
  showHours: boolean
  showMinutes: boolean
  showSeconds: boolean
  onChange: (h: number, m: number, s: number) => void
}) {
  return (
    <div className="flex border-l-2 border-neo-black">
      {showHours && (
        <TimeScrollList
          label="HH"
          value={hour}
          max={23}
          onSelect={(h) => onChange(h, minute, second)}
        />
      )}
      {showMinutes && (
        <TimeScrollList
          label="MM"
          value={minute}
          max={59}
          onSelect={(m) => onChange(hour, m, second)}
        />
      )}
      {showSeconds && (
        <TimeScrollList
          label="SS"
          value={second}
          max={59}
          onSelect={(s) => onChange(hour, minute, s)}
        />
      )}
    </div>
  )
}

function TimeScrollList({
  label,
  value,
  max,
  onSelect,
}: {
  label: string
  value: number
  max: number
  onSelect: (val: number) => void
}) {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current) return
    const activeItem = listRef.current.querySelector("[data-active='true']")
    if (activeItem) {
      activeItem.scrollIntoView({ block: "center", behavior: "auto" })
    }
  }, [value])

  return (
    <div className="flex w-12 flex-col">
      <div className="border-b-2 border-neo-black py-1 text-center text-[10px] font-bold uppercase text-muted-foreground">
        {label}
      </div>
      <div ref={listRef} className="h-67.5 overflow-y-auto scrollbar-thin">
        {Array.from({ length: max + 1 }, (_, i) => (
          <button
            key={i}
            type="button"
            data-active={i === value}
            onClick={() => onSelect(i)}
            className={cn(
              "flex w-full items-center justify-center py-1.5 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground",
              i === value && "bg-primary text-primary-foreground"
            )}
          >
            {padZero(i)}
          </button>
        ))}
      </div>
    </div>
  )
}

export { DatePicker }
