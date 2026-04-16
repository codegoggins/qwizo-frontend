"use client";

import { useState } from "react";
import { RiCheckLine, RiGroupLine, RiQuestionLine, RiTimeLine, RiCalendarLine } from "react-icons/ri";
import type { ArenaQuiz } from "@/lib/types/arena";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from "@/components/ui/modal";

interface EnrollModalProps {
  quiz: ArenaQuiz;
  open: boolean;
  onClose: () => void;
}

function EnrollModal({ quiz, open, onClose }: EnrollModalProps) {
  const [enrolled, setEnrolled] = useState(false);

  function handleEnroll() {
    setEnrolled(true);
    setTimeout(() => {
      setEnrolled(false);
      onClose();
    }, 1500);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <ModalTitle>Enroll in Quiz</ModalTitle>
        <ModalDescription>Get notified when the quiz goes live.</ModalDescription>
      </ModalHeader>
      <ModalContent>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-bold">{quiz.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{quiz.description}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {quiz.tags.map((tag) => (
              <Badge key={tag} variant="default">{tag}</Badge>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-neo-black bg-secondary p-3">
              <RiGroupLine className="size-4" />
              <span className="mt-1 text-sm font-extrabold">{quiz.enrolled.toLocaleString()}</span>
              <span className="text-[9px] font-semibold text-muted-foreground">ENROLLED</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-neo-black bg-secondary p-3">
              <RiQuestionLine className="size-4" />
              <span className="mt-1 text-sm font-extrabold">{quiz.questions}</span>
              <span className="text-[9px] font-semibold text-muted-foreground">QUESTIONS</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-neo-black bg-secondary p-3">
              <RiTimeLine className="size-4" />
              <span className="mt-1 text-sm font-extrabold">{quiz.duration}</span>
              <span className="text-[9px] font-semibold text-muted-foreground">DURATION</span>
            </div>
          </div>

          {quiz.startsAt && (
            <div className="flex items-center gap-2 rounded-lg border-2 border-border bg-secondary p-3 text-sm">
              <RiCalendarLine className="size-4 text-warning" />
              <span className="font-semibold">Starts:</span>
              <span>{quiz.startsAt}</span>
            </div>
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={enrolled}>Cancel</Button>
        <Button variant={enrolled ? "success" : "default"} onClick={handleEnroll} className="gap-1.5" disabled={enrolled}>
          {enrolled ? (
            <>
              <RiCheckLine className="size-4" />
              Enrolled!
            </>
          ) : (
            "Confirm Enrollment"
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export { EnrollModal };
