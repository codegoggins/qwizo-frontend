"use client";

import { AnimatePresence } from "framer-motion";
import { RiFileListLine } from "react-icons/ri";
import type { Question } from "@/lib/types/quiz";
import { QuestionCard } from "./question-card";

interface QuestionListProps {
  questions: Question[];
  onUpdate: (q: Question) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

function QuestionList({
  questions,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: QuestionListProps) {
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border py-20 text-center">
        <RiFileListLine className="size-10 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">
          Add your first question using the toolbar or AI assistant.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <AnimatePresence mode="popLayout">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i}
            isFirst={i === 0}
            isLast={i === questions.length - 1}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export { QuestionList };
