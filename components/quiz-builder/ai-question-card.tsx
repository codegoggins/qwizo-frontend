"use client"

import { RiCheckLine, RiCloseLine, RiSparklingLine } from "react-icons/ri"
import type { Question } from "@/lib/types/quiz"
import { Button } from "@/components/ui/button"

const typeLabels: Record<string, string> = {
  mcq: "MCQ",
  "multiple-select": "Multi Select",
  "true-false": "True / False",
  "short-answer": "Short Answer",
  descriptive: "Descriptive",
}

interface AiQuestionCardProps {
  question: Question
  onAccept: () => void
  onReject: () => void
}

function AiQuestionCard({ question, onAccept, onReject }: AiQuestionCardProps) {
  return (
    <div className="rounded-xl border-2 border-neo-black bg-secondary p-3">
      <div className="mb-2 flex items-center gap-2">
        <RiSparklingLine className="size-3.5 text-primary" />
        <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
          {typeLabels[question.type]}
        </span>
      </div>
      <p className="mb-2 text-sm font-semibold">{question.text}</p>
      {question.options.length > 0 && (
        <div className="mb-3 flex flex-col gap-1">
          {question.options.map((opt) => {
            const isCorrect = question.correctAnswers.includes(opt.id)
            return (
              <div
                key={opt.id}
                className={`rounded-md px-2 py-1 text-xs font-medium ${isCorrect ? "bg-success/20 text-foreground" : "text-muted-foreground"}`}
              >
                {isCorrect && "✓ "}{opt.text}
              </div>
            )
          })}
        </div>
      )}
      <div className="flex gap-2">
        <Button size="sm" variant="success" className="flex-1 gap-1" onClick={onAccept}>
          <RiCheckLine className="size-3.5" />
          Add
        </Button>
        <Button size="sm" variant="destructive" className="flex-1 gap-1" onClick={onReject}>
          <RiCloseLine className="size-3.5" />
          Skip
        </Button>
      </div>
    </div>
  )
}

export { AiQuestionCard }
