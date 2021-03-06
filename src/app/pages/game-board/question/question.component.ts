import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Question } from '../../../shared/models/question.model';
import * as _ from "lodash";
import { TimerComponent } from '../../../shared/components/timer/timer.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly TIME_LEFT_ALERT = 5;
  readonly TIME_PER_QUESTION = 20;

  @ViewChild("timer") timer: TimerComponent;

  @Input() question: Question;
  @Input() questionNumber: number;
  @Input() isFinished: boolean = false;  
  @Input() selectedAnswer: string;

  @Output() selectedAnswerChange = new EventEmitter<string>();
  @Output() timesUp: EventEmitter<void> = new EventEmitter<void>();

  answers: string[] = [];
  isCorrectAnswer: boolean;
  isTimeUp: boolean;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.answers = _.shuffle([...this.question.incorrectAnswers, this.question.correctAnswer]);
    this.isTimeUp = false;
  }
  
  ngAfterViewInit() {
    this.timer.timesUp.pipe(take(1)).subscribe(() => {
      this.isTimeUp = true;
      this.timesUp.emit();
    });
    this.timer.timeLeftAlert.pipe(take(1)).subscribe(() => {      
      this.onTimeAlert()
    });
    this.timer.start(this.TIME_PER_QUESTION, this.TIME_LEFT_ALERT);
    this.cd.detectChanges();
  }

  isCorrect(answer: string) {
    return (answer === this.selectedAnswer && this.question.correctAnswer === this.selectedAnswer && this.isFinished);
  }

  isIncorrect(answer: string) {
    return (answer === this.selectedAnswer && this.question.correctAnswer !== this.selectedAnswer && this.isFinished);
  }

  onAnswerClick(answer: string) {
    this.selectedAnswerChange.emit(answer);
    this.selectedAnswer = answer;
  }

  onTimeAlert(){
    document.body.style.fontWeight = "bold";
  }

  ngOnDestroy(): void {
    document.body.style.fontWeight = "initial";
  }
}
