"use client"

import { motion } from "framer-motion"
import {
  RiListCheck2,
  RiCheckboxMultipleLine,
  RiToggleLine,
  RiInputMethodLine,
  RiFileTextLine,
  RiSparklingLine,
} from "react-icons/ri"
import type { QuestionType } from "@/lib/types/quiz"
import { cn } from "@/lib/utils"

const tools: { type: QuestionType; icon: typeof RiListCheck2; label: string; color: string }[] = [
  { type: "mcq", icon: RiListCheck2, label: "MCQ", color: "#E56498" },
  { type: "multiple-select", icon: RiCheckboxMultipleLine, label: "Multi Select", color: "#C184FD" },
  { type: "true-false", icon: RiToggleLine, label: "True / False", color: "#21D3ED" },
  { type: "short-answer", icon: RiInputMethodLine, label: "Short Answer", color: "#92CC30" },
  { type: "descriptive", icon: RiFileTextLine, label: "Descriptive", color: "#FFB32F" },
]

interface QuestionToolbarProps {
  onAddQuestion: (type: QuestionType) => void
  onToggleAiPanel: () => void
  aiPanelOpen: boolean
}

function QuestionToolbar({ onAddQuestion, onToggleAiPanel, aiPanelOpen }: QuestionToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="sticky top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 self-start rounded-xl border-2 border-neo-black bg-background p-2 shadow-[4px_4px_0px_0px_#1B1B1B]"
    >
      {tools.map((tool) => (
        <button
          key={tool.type}
          type="button"
          title={tool.label}
          onClick={() => onAddQuestion(tool.type)}
          className="group relative flex size-10 items-center justify-center border-2 border-neo-black bg-background transition-all hover:bg-primary hover:shadow-[2px_2px_0px_0px_#1B1B1B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <tool.icon className="size-5 transition-colors group-hover:text-primary-foreground" />
          <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-md border-2 border-neo-black bg-neo-black px-2 py-1 text-xs font-bold text-white group-hover:block">
            {tool.label}
          </span>
        </button>
      ))}

      <div className="mx-1 border-t-2 border-neo-black" />

      <button
        type="button"
        title="AI Assistant"
        onClick={onToggleAiPanel}
        className={cn(
          "flex size-10 items-center justify-center border-2 border-neo-black transition-all hover:shadow-[2px_2px_0px_0px_#1B1B1B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
          aiPanelOpen ? "bg-primary text-primary-foreground" : "bg-background"
        )}
      >
        <RiSparklingLine className="size-5" />
      </button>
    </motion.div>
  )
}

export { QuestionToolbar }
