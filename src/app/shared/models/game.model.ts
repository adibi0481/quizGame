import { eGameStatus } from '../enums/eGameStatus';
import { Question } from './question.model';

export interface Game {
    totalScore: number,
    lives: number,
    status: eGameStatus,
    skipped: number,
    currQuestionIdx: number,
    userAnswers: any,
    questions: Question[]
}