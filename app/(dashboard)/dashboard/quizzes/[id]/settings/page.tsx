"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  RiArrowLeftSLine,
  RiDeleteBinLine,
  RiShareLine,
  RiFileCopyLine,
  RiCheckLine,
} from "react-icons/ri";
import { sampleQuizzes } from "@/lib/sample-quiz";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from "@/components/ui/modal";
import { DatePicker } from "@/components/ui/date-picker";

const visibilityOptions = [
  { value: "public", label: "Public — anyone with the link" },
  { value: "private", label: "Private — only you" },
  { value: "unlisted", label: "Unlisted — link only, not searchable" },
];

const expiryOptions = [
  { value: "never", label: "Never expires" },
  { value: "1h", label: "1 hour" },
  { value: "24h", label: "24 hours" },
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "custom", label: "Custom date" },
];

const categoryOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "python", label: "Python" },
  { value: "system-design", label: "System Design" },
  { value: "css", label: "CSS" },
  { value: "general", label: "General" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function QuizSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const quiz = sampleQuizzes[id];

  const [title, setTitle] = useState(quiz?.title ?? "");
  const [description, setDescription] = useState(quiz?.description ?? "");
  const [category, setCategory] = useState("javascript");
  const [visibility, setVisibility] = useState("public");
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [shuffleOptions, setShuffleOptions] = useState(false);
  const [showAnswers, setShowAnswers] = useState(true);
  const [allowRetake, setAllowRetake] = useState(true);
  const [maxAttempts, setMaxAttempts] = useState("3");
  const [enableTimeLimit, setEnableTimeLimit] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState("30");
  const [totalTime, setTotalTime] = useState("15");
  const [passingScore, setPassingScore] = useState("60");
  const [scheduleAttempts, setScheduleAttempts] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkExpiry, setLinkExpiry] = useState("never");

  const shareLink = `https://qwizo.app/quiz/${id}`;

  function copyLink() {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <Link
            href="/dashboard/quizzes"
            className="mb-2 flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <RiArrowLeftSLine className="size-4" />
            Back to quizzes
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">Quiz Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">{quiz.title}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/quizzes">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button>Save Settings</Button>
        </div>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <h2 className="mb-4 text-lg font-bold">Title</h2>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <h2 className="mb-4 text-lg font-bold">Category</h2>
          <Select options={categoryOptions} value={category} onValueChange={setCategory} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
      >
        <h2 className="mb-4 text-lg font-bold">Description</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full resize-none border-2 border-neo-black bg-background px-3 py-2 text-sm font-medium shadow-[4px_4px_0px_0px_#1B1B1B] transition-shadow placeholder:text-muted-foreground focus:shadow-[2px_2px_0px_0px_#1B1B1B] focus:outline-none"
        />
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <h2 className="mb-4 text-lg font-bold">Visibility</h2>
          <Select options={visibilityOptions} value={visibility} onValueChange={setVisibility} />
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <h2 className="mb-4 text-lg font-bold">Passing Score</h2>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min="0"
              max="100"
              value={passingScore}
              onChange={(e) => setPassingScore(e.target.value)}
              className="max-w-32"
            />
            <span className="text-sm font-semibold text-muted-foreground">%</span>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <h2 className="mb-4 text-lg font-bold">Link Validity</h2>
          <Select options={expiryOptions} value={linkExpiry} onValueChange={setLinkExpiry} />
          <p className="mt-2 text-xs text-muted-foreground">
            {linkExpiry === "never" ? "The quiz link will remain active indefinitely." : `The link will expire after ${expiryOptions.find((o) => o.value === linkExpiry)?.label?.toLowerCase()}.`}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-between rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
        >
          <div>
            <h2 className="mb-2 text-lg font-bold">Share Quiz</h2>
            <p className="text-xs text-muted-foreground">
              {visibility === "private"
                ? "Quiz is private. Change visibility to share."
                : "Share this quiz with participants."}
            </p>
          </div>
          <Button
            className="mt-4 w-full gap-2"
            disabled={visibility === "private"}
            onClick={() => setShareOpen(true)}
          >
            <RiShareLine className="size-4" />
            Share Quiz
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
      >
        <h2 className="mb-5 text-lg font-bold">Behavior</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <ToggleRow label="Shuffle questions" description="Randomize question order for each attempt" checked={shuffleQuestions} onChange={setShuffleQuestions} />
          <ToggleRow label="Shuffle options" description="Randomize option order within each question" checked={shuffleOptions} onChange={setShuffleOptions} />
          <ToggleRow label="Show correct answers" description="Display answers after submission" checked={showAnswers} onChange={setShowAnswers} />
          <ToggleRow label="Allow retake" description="Let participants take the quiz again" checked={allowRetake} onChange={setAllowRetake} />
        </div>
        {allowRetake && (
          <div className="mt-5 flex flex-col gap-1.5 border-t-2 border-border pt-5">
            <label className="text-sm font-semibold">Max attempts per participant</label>
            <Input
              type="number"
              min="1"
              max="99"
              value={maxAttempts}
              onChange={(e) => setMaxAttempts(e.target.value)}
              className="max-w-32"
            />
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
      >
        <h2 className="mb-5 text-lg font-bold">Timing</h2>
        <ToggleRow label="Enable time limit" description="Set a time constraint for the quiz" checked={enableTimeLimit} onChange={setEnableTimeLimit} />
        {enableTimeLimit && (
          <div className="mt-5 grid gap-4 border-t-2 border-border pt-5 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold">Time per question</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="5"
                  max="300"
                  value={timePerQuestion}
                  onChange={(e) => setTimePerQuestion(e.target.value)}
                  className="max-w-32"
                />
                <span className="text-sm text-muted-foreground">seconds</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold">Total quiz time</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  max="180"
                  value={totalTime}
                  onChange={(e) => setTotalTime(e.target.value)}
                  className="max-w-32"
                />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="rounded-xl border-2 border-neo-black bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
      >
        <h2 className="mb-5 text-lg font-bold">Scheduling</h2>
        <ToggleRow
          label="Schedule quiz availability"
          description="Set when participants can start and stop attempting"
          checked={scheduleAttempts}
          onChange={setScheduleAttempts}
        />
        {scheduleAttempts && (
          <div className="mt-5 grid gap-4 border-t-2 border-border pt-5 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold">Opens at</label>
              <DatePicker value={startDate} onChange={setStartDate} showSeconds={false} />
              <p className="text-xs text-muted-foreground">
                Participants can start attempting from this time.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold">Closes at</label>
              <DatePicker value={endDate} onChange={setEndDate} showSeconds={false} />
              <p className="text-xs text-muted-foreground">
                Quiz will stop accepting attempts after this time. Leaderboard freezes.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="rounded-xl border-2 border-destructive bg-background p-6 shadow-[4px_4px_0px_0px_#1B1B1B]"
      >
        <h2 className="mb-2 text-lg font-bold text-destructive">Danger Zone</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Permanently delete this quiz and all associated data including attempts, leaderboard, and analytics.
        </p>
        <Button variant="destructive" className="gap-2" onClick={() => setDeleteOpen(true)}>
          <RiDeleteBinLine className="size-4" />
          Delete Quiz
        </Button>
      </motion.div>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <ModalHeader onClose={() => setDeleteOpen(false)}>
          <ModalTitle>Delete Quiz</ModalTitle>
          <ModalDescription>This action cannot be undone.</ModalDescription>
        </ModalHeader>
        <ModalContent>
          <p className="text-sm font-medium">
            Are you sure you want to delete &quot;{quiz.title}&quot;? All attempts, leaderboard data, and analytics will be permanently removed.
          </p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => setDeleteOpen(false)}>Delete</Button>
        </ModalFooter>
      </Modal>

      <Modal open={shareOpen} onClose={() => { setShareOpen(false); setCopied(false); }}>
        <ModalHeader onClose={() => { setShareOpen(false); setCopied(false); }}>
          <ModalTitle>Share Quiz</ModalTitle>
          <ModalDescription>
            {visibility === "public" ? "Anyone with this link can take the quiz." : "Only people with the link can access this quiz."}
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input value={shareLink} readOnly className="flex-1" />
              <Button variant="outline" className="shrink-0 gap-1.5" onClick={copyLink}>
                {copied ? <RiCheckLine className="size-4 text-success" /> : <RiFileCopyLine className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold">Link expires</label>
              <Select options={expiryOptions} value={linkExpiry} onValueChange={setLinkExpiry} />
            </div>
            <div className="rounded-lg border-2 border-border bg-secondary p-3 text-xs text-muted-foreground">
              <p><span className="font-semibold text-foreground">Visibility:</span> {visibilityOptions.find((o) => o.value === visibility)?.label}</p>
              <p className="mt-1"><span className="font-semibold text-foreground">Expires:</span> {expiryOptions.find((o) => o.value === linkExpiry)?.label}</p>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => { setShareOpen(false); setCopied(false); }}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border-2 border-border p-4">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
