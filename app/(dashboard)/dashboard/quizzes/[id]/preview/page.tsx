"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiTimeLine,
  RiCheckLine,
  RiEditLine,
  RiSettingsLine,
} from "react-icons/ri";
import { sampleQuizzes } from "@/lib/sample-quiz";
import { Button } from "@/components/ui/button";

export default function QuizPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const quiz = sampleQuizzes[id];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);

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

  const question = quiz.questions[currentIndex];
  const total = quiz.questions.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const selected = selectedAnswers[question.id] || [];

  function selectAnswer(optionId: string) {
    if (submitted) return;
    if (question.type === "mcq" || question.type === "true-false") {
      setSelectedAnswers((prev) => ({ ...prev, [question.id]: [optionId] }));
    } else {
      setSelectedAnswers((prev) => {
        const current = prev[question.id] || [];
        return {
          ...prev,
          [question.id]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      });
    }
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function getScore() {
    let correct = 0;
    quiz.questions.forEach((q) => {
      const answers = selectedAnswers[q.id] || [];
      if (
        q.correctAnswers.length === answers.length &&
        q.correctAnswers.every((a) => answers.includes(a))
      ) {
        correct++;
      }
    });
    return correct;
  }

  if (submitted) {
    const score = getScore();
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 rounded-xl border-2 border-neo-black bg-background p-10 shadow-[6px_6px_0px_0px_#1B1B1B]"
        >
          <div
            className={`flex size-28 items-center justify-center rounded-full border-4 border-neo-black text-4xl font-extrabold ${
              percentage >= 60 ? "bg-success" : "bg-warning"
            }`}
          >
            {percentage}%
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight">
              {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good job!" : "Keep practicing!"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              You scored {score} out of {total} questions correctly.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={`/dashboard/quizzes/${id}/edit`}>
              <Button variant="outline" className="gap-2">
                <RiEditLine className="size-4" />
                Edit Quiz
              </Button>
            </Link>
            <Button onClick={() => { setSubmitted(false); setCurrentIndex(0); setSelectedAnswers({}); }}>
              Retake
            </Button>
          </div>
        </motion.div>

        <div className="w-full rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]">
          <div className="border-b-2 border-neo-black px-5 py-4">
            <h2 className="text-lg font-bold">Answer Review</h2>
          </div>
          <div className="flex flex-col">
            {quiz.questions.map((q, i) => {
              const userAnswers = selectedAnswers[q.id] || [];
              const isCorrect =
                q.correctAnswers.length === userAnswers.length &&
                q.correctAnswers.every((a) => userAnswers.includes(a));

              return (
                <div key={q.id} className="flex items-start gap-3 border-b border-border px-5 py-4 last:border-0">
                  <span
                    className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-neo-black text-xs font-bold ${
                      isCorrect ? "bg-success text-neo-black" : "bg-destructive text-white"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{q.text}</p>
                    {q.options.length > 0 && (
                      <div className="mt-1 flex flex-col gap-0.5 text-xs">
                        {q.options.map((opt) => {
                          const isUserPick = userAnswers.includes(opt.id);
                          const isRight = q.correctAnswers.includes(opt.id);
                          return (
                            <span
                              key={opt.id}
                              className={
                                isRight
                                  ? "font-semibold text-success"
                                  : isUserPick
                                    ? "font-semibold text-destructive line-through"
                                    : "text-muted-foreground"
                              }
                            >
                              {isRight && "✓ "}{isUserPick && !isRight && "✗ "}{opt.text}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/dashboard/quizzes"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <RiArrowLeftSLine className="size-4" />
            Back to quizzes
          </Link>
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/quizzes/${id}/settings`}>
              <Button variant="ghost" size="sm" className="gap-1">
                <RiSettingsLine className="size-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]">
          <h1 className="text-2xl font-extrabold tracking-tight">{quiz.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{quiz.description}</p>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <RiTimeLine className="size-3.5" />
              No time limit
            </span>
            <span>{total} questions</span>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="h-2.5 overflow-hidden rounded-full border-2 border-neo-black">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
        <span className="text-xs font-bold">
          {currentIndex + 1} / {total}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <p className="mb-6 text-lg font-bold">{question.text}</p>

          {(question.type === "mcq" || question.type === "true-false" || question.type === "multiple-select") && (
            <div className="flex flex-col gap-3">
              {question.options.map((opt) => {
                const isSelected = selected.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectAnswer(opt.id)}
                    className={`flex items-center gap-3 rounded-lg border-2 border-neo-black px-4 py-3 text-left text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_#1B1B1B]"
                        : "bg-background hover:bg-muted shadow-[3px_3px_0px_0px_#1B1B1B] hover:shadow-[2px_2px_0px_0px_#1B1B1B]"
                    }`}
                  >
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center border-2 border-neo-black ${
                        question.type === "multiple-select" ? "" : "rounded-full"
                      } ${isSelected ? "bg-white" : "bg-background"}`}
                    >
                      {isSelected && <RiCheckLine className="size-3 text-neo-black" />}
                    </span>
                    {opt.text}
                  </button>
                );
              })}
            </div>
          )}

          {question.type === "short-answer" && (
            <textarea
              placeholder="Type your answer..."
              rows={2}
              className="w-full resize-none border-2 border-neo-black bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow placeholder:text-muted-foreground focus:shadow-[2px_2px_0px_0px_#1B1B1B] focus:outline-none"
            />
          )}

          {question.type === "descriptive" && (
            <textarea
              placeholder="Write your detailed answer..."
              rows={5}
              className="w-full resize-none border-2 border-neo-black bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow placeholder:text-muted-foreground focus:shadow-[2px_2px_0px_0px_#1B1B1B] focus:outline-none"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
          className="gap-1"
        >
          <RiArrowLeftSLine className="size-4" />
          Previous
        </Button>

        <div className="flex gap-1">
          {quiz.questions.map((q, i) => (
            <button
              key={q.id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`size-3 rounded-full border border-neo-black transition-colors ${
                i === currentIndex
                  ? "bg-primary"
                  : selectedAnswers[q.id]
                    ? "bg-success"
                    : "bg-muted"
              }`}
            />
          ))}
        </div>

        {currentIndex === total - 1 ? (
          <Button onClick={handleSubmit} className="gap-1">
            <RiCheckLine className="size-4" />
            Submit
          </Button>
        ) : (
          <Button onClick={() => setCurrentIndex((i) => i + 1)} className="gap-1">
            Next
            <RiArrowRightSLine className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
