"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  RiSearchLine,
  RiFireLine,
  RiTimeLine,
  RiGroupLine,
  RiSparklingLine,
} from "react-icons/ri";
import { sampleArenaQuizzes } from "@/lib/sample-arena";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FeaturedQuizCard } from "@/components/arena/featured-quiz-card";
import { QuizCard } from "@/components/arena/quiz-card";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } },
};

const filterChips = ["All", "Live Now", "Starting Soon", "Open Anytime", "Ended"] as const;
type FilterChip = (typeof filterChips)[number];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "ending", label: "Ending Soon" },
  { value: "difficulty", label: "Difficulty" },
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "system-design", label: "System Design" },
  { value: "css", label: "CSS" },
  { value: "databases", label: "Databases" },
];

export default function ArenaPage() {
  const [search, setSearch] = useState("");
  const [activeChip, setActiveChip] = useState<FilterChip>("All");
  const [sort, setSort] = useState("popular");
  const [category, setCategory] = useState("all");

  const featured = sampleArenaQuizzes.find((q) => q.featured);
  const quizzes = sampleArenaQuizzes.filter((q) => !q.featured);

  const filtered = useMemo(() => {
    return quizzes.filter((q) => {
      const matchesSearch =
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.description.toLowerCase().includes(search.toLowerCase()) ||
        q.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesChip =
        activeChip === "All" ||
        (activeChip === "Live Now" && q.status === "live") ||
        (activeChip === "Starting Soon" && q.status === "upcoming") ||
        (activeChip === "Open Anytime" && q.status === "open-anytime") ||
        (activeChip === "Ended" && q.status === "ended");

      const matchesCategory =
        category === "all" || q.topic.toLowerCase().replace(/\s+/g, "-") === category;

      return matchesSearch && matchesChip && matchesCategory;
    });
  }, [search, activeChip, sort, category, quizzes]);

  const liveCount = quizzes.filter((q) => q.status === "live").length;
  const upcomingCount = quizzes.filter((q) => q.status === "upcoming").length;
  const totalEnrolled = quizzes.reduce((sum, q) => sum + q.enrolled, 0);

  const arenaStats = [
    { label: "Live Now", value: liveCount.toString(), icon: RiFireLine, color: "#E56498" },
    { label: "Starting Soon", value: upcomingCount.toString(), icon: RiTimeLine, color: "#FFB32F" },
    { label: "Total Enrolled", value: totalEnrolled.toLocaleString(), icon: RiGroupLine, color: "#A3E634" },
    { label: "New This Week", value: "12", icon: RiSparklingLine, color: "#C184FD" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight">Arena</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Discover quizzes, challenge yourself, climb the leaderboard.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {arenaStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 rounded-xl border-2 border-neo-black bg-background p-5 shadow-[4px_4px_0px_0px_#1B1B1B]"
          >
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-lg border-2 border-neo-black"
              style={{ backgroundColor: stat.color }}
            >
              <stat.icon className="size-5 text-neo-black" />
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-extrabold tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {featured && <FeaturedQuizCard quiz={featured} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-md">
            <RiSearchLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search quizzes, tags, or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-3">
            <Select options={categoryOptions} value={category} onValueChange={setCategory} className="w-44" />
            <Select options={sortOptions} value={sort} onValueChange={setSort} className="w-40" />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {filterChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setActiveChip(chip)}
              className={
                activeChip === chip
                  ? "shrink-0 rounded-md border-2 border-neo-black bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-[2px_2px_0px_0px_#1B1B1B]"
                  : "shrink-0 rounded-md border-2 border-neo-black bg-background px-4 py-1.5 text-xs font-bold hover:bg-muted"
              }
            >
              {chip}
            </button>
          ))}
        </div>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border py-20 text-center">
          <RiSearchLine className="size-10 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">No quizzes match your filters.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearch("");
              setActiveChip("All");
              setCategory("all");
            }}
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {filtered.map((quiz) => (
            <motion.div key={quiz.id} variants={fadeUp} transition={{ duration: 0.3 }}>
              <QuizCard quiz={quiz} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
