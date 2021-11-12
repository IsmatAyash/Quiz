import { QuizResult } from "./quizresult.interface";

export interface Quiz {
  QuizID: number;
  Quizdate: Date;
  Score: number;
  TimeSpent: number;
  ParticipantID: string;
  QuizResults: QuizResult[];
}
