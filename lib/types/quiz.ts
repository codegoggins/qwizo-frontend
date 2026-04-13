export type QuestionType = "mcq" | "multiple-select" | "true-false" | "short-answer" | "descriptive"

export interface Option {
  id: string
  text: string
}

export interface Question {
  id: string
  type: QuestionType
  text: string
  options: Option[]
  correctAnswers: string[]
  source: "manual" | "ai"
}
