import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Qwizo — Turn Documents into AI-Powered Quizzes Instantly",
  description:
    "Qwizo converts your documents into interactive AI-generated quizzes in seconds. Share public quiz links, track scores on real-time leaderboards, and challenge anyone — all for free.",
  keywords: [
    "AI quiz generator",
    "document to quiz",
    "online quiz maker",
    "free quiz app",
    "AI quiz from PDF",
    "real-time leaderboard",
    "public quiz link",
    "quiz sharing",
    "AI-powered quizzes",
    "automatic quiz generation",
  ],
  authors: [{ name: "Qwizo" }],
  openGraph: {
    title: "Qwizo — Turn Documents into AI-Powered Quizzes Instantly",
    description:
      "Upload any document and let AI generate quizzes automatically. Share via public links, compete on real-time leaderboards, and track scores live.",
    type: "website",
    siteName: "Qwizo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qwizo — Turn Documents into AI-Powered Quizzes Instantly",
    description:
      "Upload any document and let AI generate quizzes automatically. Share via public links, compete on real-time leaderboards, and track scores live.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
