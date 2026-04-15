"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface QuizHeaderProps {
  title: string;
  description: string;
  questionCount: number;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

function QuizHeader({
  title,
  description,
  questionCount,
  onTitleChange,
  onDescriptionChange,
}: QuizHeaderProps) {
  return (
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
            {questionCount} {questionCount === 1 ? "question" : "questions"}
          </Badge>
          <Button variant="outline" size="sm">
            Save Draft
          </Button>
          <Button variant="success" size="sm">
            Publish
          </Button>
        </div>
      </div>

      <div className="rounded-xl border-2 border-neo-black bg-background p-4 shadow-[4px_4px_0px_0px_#1B1B1B]">
        <Input
          placeholder="Quiz title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="mb-3 border-0 bg-transparent text-2xl font-extrabold tracking-tight shadow-none placeholder:text-muted-foreground focus:shadow-none"
        />
        <textarea
          placeholder="Add a description for your quiz..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={2}
          className="w-full resize-none border-2 border-neo-black bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow placeholder:text-muted-foreground focus:shadow-[2px_2px_0px_0px_#1B1B1B] focus:outline-none"
        />
      </div>
    </motion.div>
  );
}

export { QuizHeader };
