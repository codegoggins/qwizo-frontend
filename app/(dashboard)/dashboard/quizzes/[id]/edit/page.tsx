"use client";

import { useState, useRef, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowLeftSLine } from "react-icons/ri";
import type { Question, QuestionType } from "@/lib/types/quiz";
import { createQuestion } from "@/lib/quiz-helpers";
import { sampleQuizzes } from "@/lib/sample-quiz";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { QuestionList } from "@/components/quiz-builder/question-list";
import { EditToolbar } from "@/components/quiz-builder/edit-toolbar";
import { AiChatPanel } from "@/components/quiz-builder/ai-chat-panel";
import { QuizInfoPanel } from "@/components/quiz-builder/quiz-info-panel";

export default function EditQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const quiz = sampleQuizzes[id];

  const [title, setTitle] = useState(quiz?.title ?? "");
  const [description, setDescription] = useState(quiz?.description ?? "");
  const [questions, setQuestions] = useState<Question[]>(quiz?.questions ?? []);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [infoPanelOpen, setInfoPanelOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  }

  function addQuestion(type: QuestionType) {
    setQuestions((prev) => [...prev, createQuestion(type)]);
    scrollToBottom();
  }

  function updateQuestion(updated: Question) {
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
  }

  function deleteQuestion(qid: string) {
    setQuestions((prev) => prev.filter((q) => q.id !== qid));
  }

  function moveQuestion(qid: string, direction: "up" | "down") {
    setQuestions((prev) => {
      const index = prev.findIndex((q) => q.id === qid);
      if (index === -1) return prev;
      const swapIndex = direction === "up" ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
      return next;
    });
  }

  function acceptAiQuestion(question: Question) {
    setQuestions((prev) => [...prev, { ...question, source: "ai" }]);
    scrollToBottom();
  }

  function togglePanel(panel: "ai" | "info") {
    if (panel === "ai") {
      setAiPanelOpen((prev) => !prev);
      setInfoPanelOpen(false);
    } else {
      setInfoPanelOpen((prev) => !prev);
      setAiPanelOpen(false);
    }
  }

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-lg font-bold">Quiz not found</p>
        <Link href="/dashboard/quizzes">
          <Button variant="outline">Back to quizzes</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-4">
      <div ref={scrollRef} className="mx-auto flex w-full max-w-2xl shrink-0 flex-col gap-6 overflow-y-auto pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4 p-4"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/quizzes"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <RiArrowLeftSLine className="size-4" />
              Back to quizzes
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="default" className="px-2.5 py-1">
                {questions.length} {questions.length === 1 ? "question" : "questions"}
              </Badge>
              <Button variant="outline" size="sm">Save Draft</Button>
              <Button variant="success" size="sm">Update</Button>
            </div>
          </div>

          <div className="rounded-xl border-2 border-neo-black bg-background p-4 shadow-[4px_4px_0px_0px_#1B1B1B]">
            <Input
              placeholder="Quiz title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-3 border-0 bg-transparent text-2xl font-extrabold tracking-tight shadow-none placeholder:text-muted-foreground focus:shadow-none"
            />
            <textarea
              placeholder="Add a description for your quiz..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full resize-none border-2 border-neo-black bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow placeholder:text-muted-foreground focus:shadow-[2px_2px_0px_0px_#1B1B1B] focus:outline-none"
            />
          </div>
        </motion.div>

        <QuestionList
          questions={questions}
          onUpdate={updateQuestion}
          onDelete={deleteQuestion}
          onMoveUp={(qid) => moveQuestion(qid, "up")}
          onMoveDown={(qid) => moveQuestion(qid, "down")}
        />
      </div>

      <AnimatePresence mode="wait">
        {aiPanelOpen && (
          <AiChatPanel
            key="ai"
            onClose={() => setAiPanelOpen(false)}
            onAcceptQuestion={acceptAiQuestion}
          />
        )}
        {infoPanelOpen && (
          <QuizInfoPanel
            key="info"
            onClose={() => setInfoPanelOpen(false)}
            questions={questions}
            aiHistory={quiz.aiHistory}
            documents={quiz.documents}
            status={quiz.status}
            createdAt={quiz.createdAt}
            updatedAt={quiz.updatedAt}
          />
        )}
      </AnimatePresence>

      <EditToolbar
        onAddQuestion={addQuestion}
        onToggleAiPanel={() => togglePanel("ai")}
        onToggleInfoPanel={() => togglePanel("info")}
        aiPanelOpen={aiPanelOpen}
        infoPanelOpen={infoPanelOpen}
      />
    </div>
  );
}
