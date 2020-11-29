import { QuestionResult } from './question-result.model';

export interface GameResults {
    username: string,
    date: Date,
    totalScore: number,
    answers: { [question: string]: boolean }
}