"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  RiCloseLine,
  RiSendPlaneLine,
  RiFileTextLine,
  RiImageLine,
  RiMicLine,
  RiSparklingLine,
} from "react-icons/ri"
import type { Question } from "@/lib/types/quiz"
import { createQuestion } from "@/lib/quiz-helpers"
import { Input } from "@/components/ui/input"
import { AiQuestionCard } from "./ai-question-card"

interface ChatMessage {
  id: string
  role: "user" | "ai"
  content?: string
  fileName?: string
  questions?: Question[]
}

const sampleQuestions: Question[] = [
  { ...createQuestion("mcq", "ai"), text: "Which keyword is used to declare a constant in JavaScript?", options: [{ id: "a1", text: "var" }, { id: "a2", text: "let" }, { id: "a3", text: "const" }, { id: "a4", text: "define" }], correctAnswers: ["a3"] },
  { ...createQuestion("true-false", "ai"), text: "JavaScript is a statically typed language.", options: [{ id: "b1", text: "True" }, { id: "b2", text: "False" }], correctAnswers: ["b2"] },
  { ...createQuestion("short-answer", "ai"), text: "What does DOM stand for?", correctAnswers: ["Document Object Model"] },
]

interface AiChatPanelProps {
  onClose: () => void
  onAcceptQuestion: (question: Question) => void
}

function AiChatPanel({ onClose, onAcceptQuestion }: AiChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "ai", content: "Upload a document or describe a topic and I'll generate quiz questions for you." },
  ])
  const [input, setInput] = useState("")
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)

  function sendMessage() {
    if (!input.trim()) return
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: input }
    const aiMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "ai",
      content: `Here are some questions based on "${input}":`,
      questions: sampleQuestions.map((q) => ({ ...q, id: crypto.randomUUID(), options: q.options.map((o) => ({ ...o, id: crypto.randomUUID() })) })),
    }
    setMessages((prev) => [...prev, userMsg, aiMsg])
    setInput("")
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", fileName: file.name }
    const aiMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "ai",
      content: `Analyzing "${file.name}"... Here are the generated questions:`,
      questions: sampleQuestions.map((q) => ({ ...q, id: crypto.randomUUID(), options: q.options.map((o) => ({ ...o, id: crypto.randomUUID() })) })),
    }
    setMessages((prev) => [...prev, userMsg, aiMsg])
    e.target.value = ""
  }

  function handleReject(questionId: string) {
    setRejectedIds((prev) => new Set(prev).add(questionId))
  }

  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: 420 }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
      className="sticky top-0 flex h-[calc(100vh-10rem)] shrink-0 flex-col overflow-hidden rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]"
    >
      <div className="flex items-center justify-between border-b-2 border-neo-black px-5 py-4">
        <div className="flex items-center gap-2">
          <RiSparklingLine className="size-5 text-primary" />
          <h2 className="text-lg font-bold">AI Assistant</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-8 items-center justify-center border-2 border-neo-black hover:bg-muted"
        >
          <RiCloseLine className="size-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "user" ? (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-xl border-2 border-neo-black bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                    {msg.fileName ? (
                      <span className="flex items-center gap-1.5">
                        <RiFileTextLine className="size-4" />
                        {msg.fileName}
                      </span>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {msg.content && (
                    <div className="max-w-[90%] rounded-xl border-2 border-neo-black bg-secondary px-3 py-2 text-sm font-medium">
                      {msg.content}
                    </div>
                  )}
                  {msg.questions?.map((q) =>
                    rejectedIds.has(q.id) ? null : (
                      <AiQuestionCard
                        key={q.id}
                        question={q}
                        onAccept={() => {
                          onAcceptQuestion(q)
                          setRejectedIds((prev) => new Set(prev).add(q.id))
                        }}
                        onReject={() => handleReject(q.id)}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-2 border-neo-black p-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.mp3,.wav"
          onChange={handleFileUpload}
          className="hidden"
        />
        <div className="mb-2 flex gap-1">
          <button
            type="button"
            title="Upload PDF"
            onClick={() => fileInputRef.current?.click()}
            className="flex size-8 items-center justify-center border-2 border-neo-black bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <RiFileTextLine className="size-4" />
          </button>
          <button
            type="button"
            title="Upload Image"
            onClick={() => fileInputRef.current?.click()}
            className="flex size-8 items-center justify-center border-2 border-neo-black bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <RiImageLine className="size-4" />
          </button>
          <button
            type="button"
            title="Upload Audio"
            onClick={() => fileInputRef.current?.click()}
            className="flex size-8 items-center justify-center border-2 border-neo-black bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <RiMicLine className="size-4" />
          </button>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Describe a topic or paste content..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1"
          />
          <button
            type="button"
            onClick={sendMessage}
            className="flex size-10 items-center justify-center border-2 border-neo-black bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_#1B1B1B] hover:shadow-[1px_1px_0px_0px_#1B1B1B] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          >
            <RiSendPlaneLine className="size-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export { AiChatPanel }
