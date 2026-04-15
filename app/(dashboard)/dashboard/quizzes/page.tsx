"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  RiAddCircleLine,
  RiFileListLine,
  RiEyeLine,
  RiFireLine,
  RiBookmarkLine,
  RiSearchLine,
  RiEditLine,
  RiDeleteBinLine,
  RiShareLine,
  RiFileCopyLine,
  RiMoreLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiTrophyLine,
} from "react-icons/ri"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

const quizzes = [
  { id: "1", title: "JavaScript Basics", description: "Core JS concepts — variables, functions, closures, and more.", status: "published", questions: 15, attempts: 234, avgScore: "82%", date: "Apr 10, 2026", topic: "JavaScript" },
  { id: "2", title: "React Fundamentals", description: "Components, hooks, state management, and lifecycle.", status: "published", questions: 20, attempts: 189, avgScore: "74%", date: "Apr 8, 2026", topic: "React" },
  { id: "3", title: "System Design 101", description: "Intro to scalability, load balancing, and caching.", status: "draft", questions: 10, attempts: 0, avgScore: "—", date: "Apr 7, 2026", topic: "System Design" },
  { id: "4", title: "Python for Beginners", description: "Basics of Python — syntax, data types, and loops.", status: "published", questions: 25, attempts: 97, avgScore: "68%", date: "Apr 5, 2026", topic: "Python" },
  { id: "5", title: "CSS Grid & Flexbox", description: "Modern layout techniques for responsive design.", status: "draft", questions: 8, attempts: 0, avgScore: "—", date: "Apr 3, 2026", topic: "CSS" },
  { id: "6", title: "TypeScript Essentials", description: "Types, interfaces, generics, and utility types.", status: "published", questions: 18, attempts: 145, avgScore: "71%", date: "Apr 1, 2026", topic: "JavaScript" },
  { id: "7", title: "Node.js Deep Dive", description: "Event loop, streams, and server-side patterns.", status: "published", questions: 22, attempts: 112, avgScore: "65%", date: "Mar 28, 2026", topic: "JavaScript" },
  { id: "8", title: "React Advanced Patterns", description: "Compound components, render props, and HOCs.", status: "archived", questions: 14, attempts: 88, avgScore: "59%", date: "Mar 20, 2026", topic: "React" },
]

const PAGE_SIZE = 5

export default function QuizzesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filtered = quizzes.filter((q) => {
    const matchesFilter =
      activeFilter === "All" || q.status === activeFilter.toLowerCase()
    const matchesSearch =
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.topic.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

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
        className="rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]"
      >
        <div className="flex flex-col gap-4 border-b-2 border-neo-black p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => { setActiveFilter(f); setPage(1) }}
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
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="pl-9"
            />
          </div>
        </div>

        {paginated.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <RiFileListLine className="size-10 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">No quizzes found.</p>
            <Link href="/dashboard/quizzes/create">
              <Button size="sm">Create your first quiz</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-neo-black bg-secondary">
                    <th className="px-5 py-3 text-left font-bold">Quiz</th>
                    <th className="px-5 py-3 text-left font-bold">Status</th>
                    <th className="px-5 py-3 text-left font-bold">Topic</th>
                    <th className="px-5 py-3 text-left font-bold">Questions</th>
                    <th className="px-5 py-3 text-left font-bold">Attempts</th>
                    <th className="px-5 py-3 text-left font-bold">Avg Score</th>
                    <th className="px-5 py-3 text-left font-bold">Created</th>
                    <th className="px-5 py-3 text-left font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((quiz, i) => (
                    <motion.tr
                      key={quiz.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-3">
                        <p className="font-semibold">{quiz.title}</p>
                        <p className="text-xs text-muted-foreground">{quiz.description}</p>
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={quiz.status} />
                      </td>
                      <td className="px-5 py-3">
                        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium">{quiz.topic}</span>
                      </td>
                      <td className="px-5 py-3">{quiz.questions}</td>
                      <td className="px-5 py-3">{quiz.attempts}</td>
                      <td className="px-5 py-3 font-semibold">{quiz.avgScore}</td>
                      <td className="px-5 py-3 text-muted-foreground">{quiz.date}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1">
                          <Link href={`/dashboard/quizzes/${quiz.id}/edit`} title="Edit" className="p-1 text-muted-foreground hover:text-foreground">
                            <RiEditLine className="size-4" />
                          </Link>
                          <button type="button" title="Share" className="p-1 text-muted-foreground hover:text-foreground">
                            <RiShareLine className="size-4" />
                          </button>
                          <button type="button" title="Duplicate" className="p-1 text-muted-foreground hover:text-foreground">
                            <RiFileCopyLine className="size-4" />
                          </button>
                          <button type="button" title="Delete" className="p-1 text-muted-foreground hover:text-destructive">
                            <RiDeleteBinLine className="size-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t-2 border-neo-black px-5 py-3">
                <p className="text-xs text-muted-foreground">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="flex size-8 items-center justify-center border-2 border-neo-black bg-background font-bold hover:bg-muted disabled:opacity-40"
                  >
                    <RiArrowLeftSLine className="size-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPage(i + 1)}
                      className={
                        page === i + 1
                          ? "flex size-8 items-center justify-center border-2 border-neo-black bg-primary text-xs font-bold text-primary-foreground"
                          : "flex size-8 items-center justify-center border-2 border-neo-black bg-background text-xs font-bold hover:bg-muted"
                      }
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="flex size-8 items-center justify-center border-2 border-neo-black bg-background font-bold hover:bg-muted disabled:opacity-40"
                  >
                    <RiArrowRightSLine className="size-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    published: "bg-success text-neo-black",
    draft: "bg-muted text-muted-foreground",
    archived: "bg-border text-muted-foreground",
  }

  return (
    <span className={`inline-block rounded-md border-2 border-neo-black px-2 py-0.5 text-xs font-bold ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
