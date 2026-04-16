"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiTimeLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";
import { sampleQuizzes } from "@/lib/sample-quiz";
import { sampleArenaQuizzes } from "@/lib/sample-arena";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from "@/components/ui/modal";

export default function QuizPlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const arenaQuiz = sampleArenaQuizzes.find((q) => q.id === id);
  const quiz = sampleQuizzes["1"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [exitOpen, setExitOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!arenaQuiz) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-lg font-bold">Quiz not found</p>
        <Link href="/arena">
          <Button variant="outline">Back to arena</Button>
        </Link>
      </div>
    );
  }

  const question = quiz.questions[currentIndex];
  const total = quiz.questions.length;
  const progress = ((currentIndex + 1) / total) * 100;
  const selected = selectedAnswers[question.id] || [];
  const answeredCount = Object.keys(selectedAnswers).filter((k) => selectedAnswers[k].length > 0).length;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const lowTime = timeLeft < 60;

  function selectAnswer(optionId: string) {
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
    router.push(`/arena/${id}/result`);
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <button
          type="button"
          onClick={() => setExitOpen(true)}
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <RiArrowLeftSLine className="size-4" />
          Exit Quiz
        </button>
        <div className="flex items-center gap-3">
          <Badge variant="default" className="px-3 py-1">
            {answeredCount} / {total} answered
          </Badge>
          <Badge
            variant={lowTime ? "destructive" : "warning"}
            className="gap-1.5 px-3 py-1"
          >
            <motion.div
              animate={lowTime ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <RiTimeLine className="size-3.5" />
            </motion.div>
            {timeString}
          </Badge>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full border-2 border-neo-black">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-xs font-bold">
            {currentIndex + 1} / {total}
          </span>
        </div>
      </motion.div>

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
              value={selected[0] || ""}
              onChange={(e) => setSelectedAnswers((prev) => ({ ...prev, [question.id]: [e.target.value] }))}
              className="w-full resize-none border-2 border-neo-black bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow placeholder:text-muted-foreground focus:shadow-[2px_2px_0px_0px_#1B1B1B] focus:outline-none"
            />
          )}

          {question.type === "descriptive" && (
            <textarea
              placeholder="Write your detailed answer..."
              rows={5}
              value={selected[0] || ""}
              onChange={(e) => setSelectedAnswers((prev) => ({ ...prev, [question.id]: [e.target.value] }))}
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

        <div className="flex flex-wrap justify-center gap-1">
          {quiz.questions.map((q, i) => (
            <button
              key={q.id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`size-3 rounded-full border border-neo-black transition-colors ${
                i === currentIndex
                  ? "bg-primary"
                  : selectedAnswers[q.id] && selectedAnswers[q.id].length > 0
                    ? "bg-success"
                    : "bg-muted"
              }`}
            />
          ))}
        </div>

        {currentIndex === total - 1 ? (
          <Button variant="success" onClick={handleSubmit} className="gap-1">
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

      <Modal open={exitOpen} onClose={() => setExitOpen(false)}>
        <ModalHeader onClose={() => setExitOpen(false)}>
          <ModalTitle>Exit Quiz?</ModalTitle>
          <ModalDescription>Your progress will be lost.</ModalDescription>
        </ModalHeader>
        <ModalContent>
          <p className="text-sm font-medium">
            You&apos;ve answered {answeredCount} out of {total} questions. Are you sure you want to exit?
          </p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setExitOpen(false)}>Keep Going</Button>
          <Button variant="destructive" className="gap-1" onClick={() => router.push("/arena")}>
            <RiCloseLine className="size-4" />
            Exit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
