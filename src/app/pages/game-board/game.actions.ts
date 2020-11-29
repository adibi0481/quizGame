import { createAction, props } from '@ngrx/store';

export const skipQuestion = createAction('[Game Component] SkipQuestion');
export const submitQuestion = createAction('[Game Component] SubmitQuestion', props<{ answer: string }>());
export const reset = createAction('[Game Component] ResetGame');