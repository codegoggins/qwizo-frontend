"use client"

import { motion } from "framer-motion"
import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiDeleteBinLine,
  RiAddLine,
  RiSparklingLine,
} from "react-icons/ri"
import type { Question } from "@/lib/types/quiz"
import { addOptionToQuestion } from "@/lib/quiz-helpers"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const typeLabels: Record<string, { label: string; color: string }> = {
  mcq: { label: "MCQ", color: "#E56498" },
  "multiple-select": { label: "Multi Select", color: "#C184FD" },
  "true-false": { label: "True / False", color: "#21D3ED" },
  "short-answer": { label: "Short Answer", color: "#92CC30" },
  descriptive: { label: "Descriptive", color: "#FFB32F" },
}

interface QuestionCardProps {
  question: Question
  index: number
  isFirst: boolean
  isLast: boolean
  onUpdate: (q: Question) => void
  onDelete: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
}

function QuestionCard({ question, index, isFirst, isLast, onUpdate, onDelete, onMoveUp, onMoveDown }: QuestionCardProps) {
  const typeInfo = typeLabels[question.type]

  function updateText(text: string) {
    onUpdate({ ...question, text })
  }

  function updateOptionText(optionId: string, text: string) {
    onUpdate({
      ...question,
      options: question.options.map((o) => (o.id === optionId ? { ...o, text } : o)),
    })
  }

  function toggleCorrectAnswer(optionId: string) {
    if (question.type === "mcq" || question.type === "true-false") {
      onUpdate({ ...question, correctAnswers: [optionId] })
    } else {
      const exists = question.correctAnswers.includes(optionId)
      onUpdate({
        ...question,
        correctAnswers: exists
          ? question.correctAnswers.filter((id) => id !== optionId)
          : [...question.correctAnswers, optionId],
      })
    }
  }

  function removeOption(optionId: string) {
    onUpdate({
      ...question,
      options: question.options.filter((o) => o.id !== optionId),
      correctAnswers: question.correctAnswers.filter((id) => id !== optionId),
    })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border-2 border-neo-black bg-background p-5 shadow-[4px_4px_0px_0px_#1B1B1B]"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md border-2 border-neo-black bg-secondary text-xs font-bold">
            {index + 1}
          </span>
          <Badge className="text-white" style={{ backgroundColor: typeInfo.color }}>
            {typeInfo.label}
          </Badge>
          {question.source === "ai" && (
            <Badge variant="default">
              <RiSparklingLine className="size-3" />
              AI
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => onMoveUp(question.id)}
            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <RiArrowUpLine className="size-4" />
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={() => onMoveDown(question.id)}
            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30"
          >
            <RiArrowDownLine className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(question.id)}
            className="p-1 text-muted-foreground hover:text-destructive"
          >
            <RiDeleteBinLine className="size-4" />
          </button>
        </div>
      </div>

      <textarea
        placeholder="Enter your question..."
        value={question.text}
        onChange={(e) => updateText(e.target.value)}
        rows={2}
        className="mb-4 w-full resize-none border-2 border-neo-black bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow placeholder:text-muted-foreground focus:shadow-[2px_2px_0px_0px_#1B1B1B] focus:outline-none"
      />

      {(question.type === "mcq" || question.type === "multiple-select" || question.type === "true-false") && (
        <div className="flex flex-col gap-2">
          {question.options.map((option, i) => {
            const isCorrect = question.correctAnswers.includes(option.id)
            const isRadio = question.type === "mcq" || question.type === "true-false"
            const isEditable = question.type !== "true-false"

            return (
              <div key={option.id} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleCorrectAnswer(option.id)}
                  className={`flex size-5 shrink-0 items-center justify-center border-2 border-neo-black shadow-[2px_2px_0px_0px_#1B1B1B] ${isRadio ? "rounded-full" : ""} ${isCorrect ? "bg-success" : "bg-background"}`}
                >
                  {isCorrect && <span className={`block ${isRadio ? "size-2 rounded-full" : "size-2.5"} bg-neo-black`} />}
                </button>
                {isEditable ? (
                  <Input
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    value={option.text}
                    onChange={(e) => updateOptionText(option.id, e.target.value)}
                    className="flex-1"
                  />
                ) : (
                  <span className="flex-1 px-3 py-2 text-sm font-medium">{option.text}</span>
                )}
                {isEditable && question.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(option.id)}
                    className="p-1 text-muted-foreground hover:text-destructive"
                  >
                    <RiDeleteBinLine className="size-3.5" />
                  </button>
                )}
              </div>
            )
          })}
          {(question.type === "mcq" || question.type === "multiple-select") && question.options.length < 8 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 self-start gap-1"
              onClick={() => onUpdate(addOptionToQuestion(question))}
            >
              <RiAddLine className="size-3.5" />
              Add Option
            </Button>
          )}
        </div>
      )}

      {question.type === "short-answer" && (
        <Input
          placeholder="Expected answer"
          value={question.correctAnswers[0] || ""}
          onChange={(e) => onUpdate({ ...question, correctAnswers: [e.target.value] })}
        />
      )}

      {question.type === "descriptive" && (
        <div className="rounded-md border-2 border-dashed border-border px-3 py-4 text-center text-xs text-muted-foreground">
          Descriptive — graded manually or by AI
        </div>
      )}
    </motion.div>
  )
}

export { QuestionCard }
