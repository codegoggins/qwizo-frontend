"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePicker } from "@/components/ui/date-picker"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter } from "@/components/ui/modal"

const selectOptions = [
  { value: "mcq", label: "Multiple Choice" },
  { value: "tf", label: "True / False" },
  { value: "fill", label: "Fill in the Blank" },
]

export default function ComponentsPage() {
  const [switchOn, setSwitchOn] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState("")
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(true)
  const [checked3, setChecked3] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [difficulty, setDifficulty] = useState("medium")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedDate2, setSelectedDate2] = useState<Date | undefined>()
  const [selectedDate3, setSelectedDate3] = useState<Date | undefined>()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="flex flex-1 flex-col gap-16 p-8 md:p-16 max-w-4xl mx-auto w-full">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">Components</h1>
        <p className="mt-2 text-muted-foreground">Neo-brutalist UI kit for Qwizo.</p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b-2 border-neo-black pb-2">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b-2 border-neo-black pb-2">Input</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          <Input placeholder="Enter your email" type="email" />
          <Input placeholder="Enter quiz title" />
          <Input placeholder="Disabled input" disabled />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b-2 border-neo-black pb-2">Toggle Switch</h2>
        <div className="flex items-center gap-3">
          <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
          <span className="text-sm font-medium">
            {switchOn ? "Enabled" : "Disabled"}
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b-2 border-neo-black pb-2">Cards</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Created!</CardTitle>
              <CardDescription>Your quiz is ready to share.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">15 questions generated from your document. Share the public link with anyone to start the challenge.</p>
            </CardContent>
            <CardFooter className="gap-3">
              <Button size="sm">Copy Link</Button>
              <Button size="sm" variant="outline">View Quiz</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top scores updated in real-time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between font-medium">
                  <span>1. Alex</span>
                  <span className="text-success font-bold">950</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>2. Jordan</span>
                  <span className="text-warning font-bold">870</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>3. Sam</span>
                  <span className="text-primary font-bold">810</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b-2 border-neo-black pb-2">Tabs</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-md">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-sm font-medium">Quiz overview with stats and performance summary.</p>
          </TabsContent>
          <TabsContent value="questions">
            <p className="text-sm font-medium">Manage and edit your quiz questions here.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-sm font-medium">Configure quiz visibility, time limits, and scoring.</p>
          </TabsContent>
        </Tabs>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b-2 border-neo-black pb-2">Radio Buttons</h2>
        <RadioGroup value={difficulty} onValueChange={setDifficulty}>
          <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
            <RadioGroupItem value="easy" />
            Easy
          </label>
          <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
            <RadioGroupItem value="medium" />
            Medium
          </label>
          <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
            <RadioGroupItem value="hard" />
            Hard
          </label>
        </RadioGroup>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b-2 border-neo-black pb-2">Select Dropdown</h2>
        <div className="max-w-sm">
          <Select
            options={selectOptions}
            value={selectedQuiz}
            onValueChange={setSelectedQuiz}
            placeholder="Choose question type"
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b-2 border-neo-black pb-2">Checkbox</h2>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
            <Checkbox checked={checked1} onCheckedChange={setChecked1} />
            Shuffle questions
          </label>
          <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
            <Checkbox checked={checked2} onCheckedChange={setChecked2} />
            Show correct answers after submission
          </label>
          <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
            <Checkbox checked={checked3} onCheckedChange={setChecked3} />
            Enable time limit
          </label>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b-2 border-neo-black pb-2">Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Attempts</TableHead>
              <TableHead>Avg Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>JavaScript Basics</TableCell>
              <TableCell>15</TableCell>
              <TableCell>234</TableCell>
              <TableCell className="text-success">82%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>React Fundamentals</TableCell>
              <TableCell>20</TableCell>
              <TableCell>189</TableCell>
              <TableCell className="text-warning">67%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>System Design</TableCell>
              <TableCell>10</TableCell>
              <TableCell>97</TableCell>
              <TableCell className="text-primary">73%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold border-b-2 border-neo-black pb-2">Modal</h2>
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <ModalHeader onClose={() => setModalOpen(false)}>
            <ModalTitle>Delete Quiz</ModalTitle>
            <ModalDescription>This action cannot be undone.</ModalDescription>
          </ModalHeader>
          <ModalContent>
            <p className="text-sm font-medium">
              Are you sure you want to delete &quot;JavaScript Basics&quot;? All attempts and leaderboard data will be permanently removed.
            </p>
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setModalOpen(false)}>Delete</Button>
          </ModalFooter>
        </Modal>
      </section>

      <section className="flex flex-col gap-6 pb-16">
        <h2 className="text-2xl font-bold border-b-2 border-neo-black pb-2">Date Picker</h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 max-w-sm">
            <span className="text-sm font-bold">With hours, minutes & seconds</span>
            <DatePicker value={selectedDate} onChange={setSelectedDate} />
          </div>
          <div className="flex flex-col gap-2 max-w-sm">
            <span className="text-sm font-bold">Hours & minutes only</span>
            <DatePicker value={selectedDate2} onChange={setSelectedDate2} showSeconds={false} />
          </div>
          <div className="flex flex-col gap-2 max-w-sm">
            <span className="text-sm font-bold">Date only (no time)</span>
            <DatePicker value={selectedDate3} onChange={setSelectedDate3} showHours={false} showMinutes={false} showSeconds={false} />
          </div>
        </div>
        {selectedDate && (
          <p className="text-sm font-medium text-muted-foreground">
            Selected: {selectedDate.toLocaleString()}
          </p>
        )}
      </section>
    </div>
  )
}
