import { Injectable } from '@angular/core';
import { Question } from '../shared/models/question.model';
import { QUESTIONS } from './QUESTIONS';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questionsBank: Question[] = QUESTIONS;

  constructor() { }

  getNewQuiz(): Observable<Question[]>{    
    return of(_.shuffle(this.questionsBank));
  }
}
