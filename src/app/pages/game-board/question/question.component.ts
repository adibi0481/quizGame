import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../../shared/models/question.model';
import * as _ from "lodash";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  answers: string[] = [];

  @Input() questionNumber: number;
  @Input() isFinished: boolean = false;

  @Input() selectedAnswer: string;
  @Output() selectedAnswerChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.answers = _.shuffle([...this.question.incorrectAnswers, this.question.correctAnswer]);
  }

  isCorrect(answer: string) {
    return (answer === this.selectedAnswer && this.question.correctAnswer === this.selectedAnswer && this.isFinished)
  }

  isIncorrect(answer: string) {
    return (answer === this.selectedAnswer && this.question.correctAnswer !== this.selectedAnswer && this.isFinished)
  }

  onAnswerClick(answer: string) {
    this.selectedAnswerChange.emit(answer);
    this.selectedAnswer = answer;
  }
}
