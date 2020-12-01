import { createAction, props } from '@ngrx/store';

export const skipQuestion = createAction('[Game Component] SkipQuestion');
export const submitAnswer = createAction('[Game Component] submitAnswer', props<{ answer: string }>());
export const reset = createAction('[Game Component] ResetGame');