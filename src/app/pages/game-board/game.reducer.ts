import { createReducer, on } from '@ngrx/store';
import { QUESTIONS } from 'src/app/services/QUESTIONS';
import { eGameStatus } from 'src/app/shared/enums/eGameStatus';
import { Game } from 'src/app/shared/models/game.model';
import { reset, skipQuestion, submitQuestion } from './game.actions';

const SCORE_PER_QUESTION = 10;

export const initialState: Game = {
    totalScore: 0,
    lives: 3,
    status: eGameStatus.alive,
    skipped: 0,
    currQuestionIdx: 0,
    userAnswers: {},
    questions: QUESTIONS
};

const _gameReducer = createReducer(
    initialState,
    on(skipQuestion, (state) => {
        let newState = { ...state };

        if (newState.skipped == 3) {
            newState.lives--;
            if (newState.lives === 0) {
                newState.status = eGameStatus.over;
            }    
        }
        else {
            newState.skipped = state.skipped + 1;            
        }
        
        if(newState.currQuestionIdx === newState.questions.length - 1){
            newState.status = eGameStatus.over;
        }
        else{
            newState.currQuestionIdx = state.currQuestionIdx + 1;
        }


        return newState;
    }),
    on(submitQuestion, (state, { answer }) => {
        let newState = { ...state };

        let isAnswerCorrect = answer === state.questions[state.currQuestionIdx].correctAnswer;
        if (isAnswerCorrect) {
            newState.totalScore = state.totalScore + SCORE_PER_QUESTION;
        }
        else {
            newState.lives = state.lives - 1;
            if (newState.lives === 0) {
                newState.status = eGameStatus.over;
            }
        }

        newState.userAnswers = { ...state.userAnswers };
        newState.userAnswers[state.questions[state.currQuestionIdx].question] = isAnswerCorrect;
        
        if(newState.currQuestionIdx === newState.questions.length - 1){
            newState.status = eGameStatus.over;
        }
        else{
            newState.currQuestionIdx = state.currQuestionIdx + 1;
        }        

        return newState;
    }),

    on(reset, () => initialState)
);

export function gameReducer(state, action) {
    return _gameReducer(state, action);
}