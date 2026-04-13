"use client"

import { useState, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import type { Question, QuestionType } from "@/lib/types/quiz"
import { createQuestion } from "@/lib/quiz-helpers"
import { QuizHeader } from "@/components/quiz-builder/quiz-header"
import { QuestionList } from "@/components/quiz-builder/question-list"
import { QuestionToolbar } from "@/components/quiz-builder/question-toolbar"
import { AiChatPanel } from "@/components/quiz-builder/ai-chat-panel"

export default function CreateQuizPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollToBottom() {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }, 100)
  }

  function addQuestion(type: QuestionType) {
    setQuestions((prev) => [...prev, createQuestion(type)])
    scrollToBottom()
  }

  function updateQuestion(updated: Question) {
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)))
  }

  function deleteQuestion(id: string) {
    setQuestions((prev) => prev.filter((q) => q.id !== id))
  }

  function moveQuestion(id: string, direction: "up" | "down") {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.id === id)
      if (index === -1) return prev
      const swapIndex = direction === "up" ? index - 1 : index + 1
      if (swapIndex < 0 || swapIndex >= prev.length) return prev
      const next = [...prev]
      ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
      return next
    })
  }

  function acceptAiQuestion(question: Question) {
    setQuestions((prev) => [...prev, { ...question, source: "ai" }])
    scrollToBottom()
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-4">
      <div ref={scrollRef} className="mx-auto flex w-full max-w-2xl shrink-0 flex-col gap-6 overflow-y-auto pb-8">
        <QuizHeader
          title={title}
          description={description}
          questionCount={questions.length}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />

        <QuestionList
          questions={questions}
          onUpdate={updateQuestion}
          onDelete={deleteQuestion}
          onMoveUp={(id) => moveQuestion(id, "up")}
          onMoveDown={(id) => moveQuestion(id, "down")}
        />
      </div>

      <AnimatePresence>
        {aiPanelOpen && (
          <AiChatPanel
            onClose={() => setAiPanelOpen(false)}
            onAcceptQuestion={acceptAiQuestion}
          />
        )}
      </AnimatePresence>

      <QuestionToolbar
        onAddQuestion={addQuestion}
        onToggleAiPanel={() => setAiPanelOpen(!aiPanelOpen)}
        aiPanelOpen={aiPanelOpen}
      />
    </div>
  )
}
