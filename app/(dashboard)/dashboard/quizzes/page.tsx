"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { type ColumnDef } from "@tanstack/react-table"
import {
  RiAddCircleLine,
  RiFileListLine,
  RiEyeLine,
  RiFireLine,
  RiBookmarkLine,
  RiSearchLine,
  RiEditLine,
  RiSettingsLine,
  RiTrophyLine,
} from "react-icons/ri"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

const filters = ["All", "Published", "Draft", "Archived"] as const
type Filter = (typeof filters)[number]

const stats = [
  { label: "Total Quizzes", value: "12", icon: RiFileListLine, color: "#21D3ED" },
  { label: "Published", value: "8", icon: RiEyeLine, color: "#A3E634" },
  { label: "Total Views", value: "3,421", icon: RiFireLine, color: "#FFB32F" },
  { label: "Saved by Users", value: "156", icon: RiBookmarkLine, color: "#C184FD" },
]

const topQuiz = {
  title: "JavaScript Basics",
  attempts: 234,
  avgScore: "82%",
  questions: 15,
}

const topTopics = [
  { name: "JavaScript", count: 4 },
  { name: "React", count: 3 },
  { name: "Python", count: 2 },
  { name: "System Design", count: 2 },
  { name: "CSS", count: 1 },
]

interface QuizRow {
  id: string
  title: string
  description: string
  status: string
  questions: number
  attempts: number
  avgScore: string
  date: string
  topic: string
}

const quizzes: QuizRow[] = [
  { id: "1", title: "JavaScript Basics", description: "Core JS concepts — variables, functions, closures, and more.", status: "published", questions: 15, attempts: 234, avgScore: "82%", date: "Apr 10, 2026", topic: "JavaScript" },
  { id: "2", title: "React Fundamentals", description: "Components, hooks, state management, and lifecycle.", status: "published", questions: 20, attempts: 189, avgScore: "74%", date: "Apr 8, 2026", topic: "React" },
  { id: "3", title: "System Design 101", description: "Intro to scalability, load balancing, and caching.", status: "draft", questions: 10, attempts: 0, avgScore: "—", date: "Apr 7, 2026", topic: "System Design" },
  { id: "4", title: "Python for Beginners", description: "Basics of Python — syntax, data types, and loops.", status: "published", questions: 25, attempts: 97, avgScore: "68%", date: "Apr 5, 2026", topic: "Python" },
  { id: "5", title: "CSS Grid & Flexbox", description: "Modern layout techniques for responsive design.", status: "draft", questions: 8, attempts: 0, avgScore: "—", date: "Apr 3, 2026", topic: "CSS" },
  { id: "6", title: "TypeScript Essentials", description: "Types, interfaces, generics, and utility types.", status: "published", questions: 18, attempts: 145, avgScore: "71%", date: "Apr 1, 2026", topic: "JavaScript" },
  { id: "7", title: "Node.js Deep Dive", description: "Event loop, streams, and server-side patterns.", status: "published", questions: 22, attempts: 112, avgScore: "65%", date: "Mar 28, 2026", topic: "JavaScript" },
  { id: "8", title: "React Advanced Patterns", description: "Compound components, render props, and HOCs.", status: "archived", questions: 14, attempts: 88, avgScore: "59%", date: "Mar 20, 2026", topic: "React" },
]

const quizColumns: ColumnDef<QuizRow, unknown>[] = [
  {
    accessorKey: "title",
    header: "Quiz",
    cell: ({ row }) => (
      <div>
        <p className="font-semibold">{row.original.title}</p>
        <p className="text-xs text-muted-foreground">{row.original.description}</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const variant = status === "published" ? "success" : status === "archived" ? "archived" : "warning";
      return <Badge variant={variant}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    },
  },
  {
    accessorKey: "topic",
    header: "Topic",
    cell: ({ getValue }) => <Badge variant="default">{getValue() as string}</Badge>,
  },
  { accessorKey: "questions", header: "Questions" },
  { accessorKey: "attempts", header: "Attempts" },
  { accessorKey: "avgScore", header: "Avg Score", cell: ({ getValue }) => <span className="font-semibold">{getValue() as string}</span> },
  { accessorKey: "date", header: "Created", cell: ({ getValue }) => <span className="text-muted-foreground">{getValue() as string}</span> },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Link href={`/dashboard/quizzes/${row.original.id}/edit`} title="Edit" className="p-1 text-muted-foreground hover:text-foreground">
          <RiEditLine className="size-4" />
        </Link>
        <Link href={`/dashboard/quizzes/${row.original.id}/preview`} title="Preview" className="p-1 text-muted-foreground hover:text-foreground">
          <RiEyeLine className="size-4" />
        </Link>
        <Link href={`/dashboard/quizzes/${row.original.id}/settings`} title="Settings" className="p-1 text-muted-foreground hover:text-foreground">
          <RiSettingsLine className="size-4" />
        </Link>
        <Link href={`/dashboard/quizzes/${row.original.id}/leaderboard`} title="Leaderboard" className="p-1 text-muted-foreground hover:text-warning">
          <RiTrophyLine className="size-4" />
        </Link>
      </div>
    ),
  },
]

export default function QuizzesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => quizzes.filter((q) => {
    const matchesFilter = activeFilter === "All" || q.status === activeFilter.toLowerCase()
    const matchesSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  }), [activeFilter, search])

  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Quizzes</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage, edit, and track all your quizzes.</p>
        </div>
        <Link href="/dashboard/quizzes/create">
          <Button className="gap-2">
            <RiAddCircleLine className="size-4" />
            New Quiz
          </Button>
        </Link>
      </motion.div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat) => (
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

      <motion.div
        className="grid gap-4 xl:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center gap-5 rounded-xl border-2 border-neo-black bg-background p-5 shadow-[4px_4px_0px_0px_#1B1B1B]">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border-2 border-neo-black bg-warning">
            <RiTrophyLine className="size-6 text-neo-black" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-muted-foreground">Best Performing Quiz</p>
            <p className="text-lg font-bold">{topQuiz.title}</p>
            <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
              <span>{topQuiz.attempts} attempts</span>
              <span>{topQuiz.avgScore} avg</span>
              <span>{topQuiz.questions} questions</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-2 border-neo-black bg-background p-5 shadow-[4px_4px_0px_0px_#1B1B1B]">
          <p className="mb-3 text-xs font-semibold text-muted-foreground">Popular Topics</p>
          <div className="flex flex-wrap gap-2">
            {topTopics.map((topic) => (
              <span
                key={topic.name}
                className="inline-flex items-center gap-1.5 rounded-md border-2 border-neo-black bg-secondary px-3 py-1 text-xs font-bold"
              >
                {topic.name}
                <span className="text-muted-foreground">({topic.count})</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={
                  activeFilter === f
                    ? "rounded-md border-2 border-neo-black bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
                    : "rounded-md border-2 border-transparent px-3 py-1.5 text-xs font-bold text-muted-foreground hover:bg-muted"
                }
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <RiSearchLine className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search quizzes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border py-16 text-center">
            <RiFileListLine className="size-10 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">No quizzes found.</p>
            <Link href="/dashboard/quizzes/create">
              <Button size="sm">Create your first quiz</Button>
            </Link>
          </div>
        ) : (
          <DataTable columns={quizColumns} data={filtered} pageSize={5} />
        )}
      </motion.div>
    </div>
  )
}
