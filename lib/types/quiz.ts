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

export interface AiHistoryEntry {
  id: string
  prompt: string
  timestamp: string
  questionsGenerated: number
  questionsAccepted: number
}

export interface MediaDocument {
  id: string
  name: string
  type: "pdf" | "image" | "audio"
  size: string
  uploadedAt: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  status: "draft" | "published" | "archived"
  questions: Question[]
  aiHistory: AiHistoryEntry[]
  documents: MediaDocument[]
  createdAt: string
  updatedAt: string
}
