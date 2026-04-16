export type QuizStatus = "live" | "upcoming" | "ended" | "open-anytime";
export type Difficulty = "easy" | "medium" | "hard";

export interface ArenaQuiz {
  id: string;
  title: string;
  description: string;
  topic: string;
  topicColor: string;
  tags: string[];
  author: {
    name: string;
    username: string;
    avatar?: string;
    verified?: boolean;
  };
  enrolled: number;
  questions: number;
  duration: string;
  difficulty: Difficulty;
  status: QuizStatus;
  startsAt?: string;
  endsAt?: string;
  isEnrolled: boolean;
  hasAttempted: boolean;
  userScore?: number;
  featured?: boolean;
}
