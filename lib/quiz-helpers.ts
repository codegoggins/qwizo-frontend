import type { Question, QuestionType, Option } from "@/lib/types/quiz"

function uid(): string {
  return crypto.randomUUID()
}

function createOption(text = ""): Option {
  return { id: uid(), text }
}

export function createQuestion(type: QuestionType, source: "manual" | "ai" = "manual"): Question {
  const base = { id: uid(), type, text: "", correctAnswers: [] as string[], source }

  switch (type) {
    case "mcq":
    case "multiple-select":
      return { ...base, options: [createOption(), createOption(), createOption(), createOption()] }
    case "true-false":
      return { ...base, options: [createOption("True"), createOption("False")] }
    case "short-answer":
    case "descriptive":
      return { ...base, options: [] }
  }
}

export function addOptionToQuestion(question: Question): Question {
  return { ...question, options: [...question.options, createOption()] }
}
