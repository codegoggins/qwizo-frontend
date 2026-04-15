import type { Quiz } from "@/lib/types/quiz"

export const sampleQuizzes: Record<string, Quiz> = {
  "1": {
    id: "1",
    title: "JavaScript Basics",
    description: "Core JS concepts — variables, functions, closures, and more.",
    status: "published",
    createdAt: "Apr 10, 2026",
    updatedAt: "Apr 12, 2026",
    documents: [
      { id: "d1", name: "js-fundamentals.pdf", type: "pdf", size: "2.4 MB", uploadedAt: "Apr 10, 2026" },
      { id: "d2", name: "lecture-notes.png", type: "image", size: "890 KB", uploadedAt: "Apr 10, 2026" },
    ],
    aiHistory: [
      { id: "h1", prompt: "Generate quiz questions from js-fundamentals.pdf", timestamp: "Apr 10, 2026 10:32 AM", questionsGenerated: 8, questionsAccepted: 5 },
      { id: "h2", prompt: "Create advanced closure questions", timestamp: "Apr 11, 2026 3:15 PM", questionsGenerated: 5, questionsAccepted: 3 },
      { id: "h3", prompt: "Generate questions from lecture-notes.png", timestamp: "Apr 12, 2026 9:00 AM", questionsGenerated: 4, questionsAccepted: 2 },
    ],
    questions: [
      {
        id: "q1", type: "mcq", source: "ai", text: "Which keyword is used to declare a constant in JavaScript?",
        options: [{ id: "o1", text: "var" }, { id: "o2", text: "let" }, { id: "o3", text: "const" }, { id: "o4", text: "define" }],
        correctAnswers: ["o3"],
      },
      {
        id: "q2", type: "mcq", source: "ai", text: "What is the output of typeof null in JavaScript?",
        options: [{ id: "o5", text: "\"null\"" }, { id: "o6", text: "\"undefined\"" }, { id: "o7", text: "\"object\"" }, { id: "o8", text: "\"boolean\"" }],
        correctAnswers: ["o7"],
      },
      {
        id: "q3", type: "true-false", source: "ai", text: "JavaScript is a statically typed language.",
        options: [{ id: "o9", text: "True" }, { id: "o10", text: "False" }],
        correctAnswers: ["o10"],
      },
      {
        id: "q4", type: "multiple-select", source: "manual", text: "Which of the following are falsy values in JavaScript?",
        options: [{ id: "o11", text: "0" }, { id: "o12", text: "\"\"" }, { id: "o13", text: "\"false\"" }, { id: "o14", text: "null" }, { id: "o15", text: "undefined" }],
        correctAnswers: ["o11", "o12", "o14", "o15"],
      },
      {
        id: "q5", type: "short-answer", source: "ai", text: "What does DOM stand for?",
        options: [],
        correctAnswers: ["Document Object Model"],
      },
      {
        id: "q6", type: "mcq", source: "manual", text: "Which method is used to add an element at the end of an array?",
        options: [{ id: "o16", text: "push()" }, { id: "o17", text: "pop()" }, { id: "o18", text: "shift()" }, { id: "o19", text: "unshift()" }],
        correctAnswers: ["o16"],
      },
      {
        id: "q7", type: "descriptive", source: "manual", text: "Explain the difference between == and === in JavaScript with examples.",
        options: [],
        correctAnswers: [],
      },
      {
        id: "q8", type: "mcq", source: "ai", text: "What is a closure in JavaScript?",
        options: [
          { id: "o20", text: "A function that has access to its outer function's scope" },
          { id: "o21", text: "A way to close a browser window" },
          { id: "o22", text: "A method to end a loop" },
          { id: "o23", text: "A type of error handling" },
        ],
        correctAnswers: ["o20"],
      },
      {
        id: "q9", type: "true-false", source: "ai", text: "Arrow functions have their own 'this' binding.",
        options: [{ id: "o24", text: "True" }, { id: "o25", text: "False" }],
        correctAnswers: ["o25"],
      },
      {
        id: "q10", type: "mcq", source: "manual", text: "Which of the following is NOT a primitive data type in JavaScript?",
        options: [{ id: "o26", text: "String" }, { id: "o27", text: "Number" }, { id: "o28", text: "Object" }, { id: "o29", text: "Boolean" }],
        correctAnswers: ["o28"],
      },
    ],
  },
}
