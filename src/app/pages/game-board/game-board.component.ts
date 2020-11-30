import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';

import { EndGameModalComponent } from '../../modals/end-game-modal/end-game-modal.component';
import { GameService } from '../../services/game.service';
import { TimerComponent } from '../../shared/components/timer/timer.component';
import { eGameStatus } from '../../shared/enums/eGameStatus';
import { Game } from '../../shared/models/game.model';
import { reset, skipQuestion, submitQuestion } from './game.actions';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements AfterViewInit {
  readonly TIME_PER_QUESTION = 20;
  
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('timer') timer: TimerComponent;
  currentQuestionNumber: number = 1;
  selectedAnswer: string;
  isDisabled: boolean = false;
  isTimesUp: boolean = false;
  isCorrect: boolean = null;
  game: Game;

  constructor(private cd: ChangeDetectorRef, public gameService: GameService,
    public dialog: MatDialog,
    private store: Store<{ game: Game }>) {
    this.store.select('game').subscribe(game => {
      this.game = game;
    });
  }

  ngAfterViewInit(): void {
    this.store.dispatch(reset());
    this.timer.restart(this.TIME_PER_QUESTION);
    this.cd.detectChanges();
  }

  onSubmitAnswer() {
    this.store.dispatch(submitQuestion({ answer: this.selectedAnswer }));
    this.isDisabled = true;
    this.isCorrect = this.game.userAnswers[this.game.questions[this.currentQuestionNumber - 1].question];
    this.initNextQuestion();
  }

  skipQuestion() {
    this.selectedAnswer = null;
    this.store.dispatch(skipQuestion());
    this.isDisabled = true;
    this.initNextQuestion();
  }

  initNextQuestion() {
    if (this.game.status === eGameStatus.over) {
      this.timer.stop();
      this.openGameOverModal();
    }
    else {
      setTimeout(() => {
        this.selectedAnswer = null;
        this.isTimesUp = false;
        this.isDisabled = false;
        this.isCorrect = null;
        this.currentQuestionNumber++;
        this.stepper.next();
        this.timer.restart(this.TIME_PER_QUESTION);
      }, 1500)
    }
  }
  openGameOverModal() {
    this.dialog.open(EndGameModalComponent, {
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      hasBackdrop: false,
      data: {
        answers: this.game.userAnswers,
        status: this.game.status,
        totalScore: this.game.totalScore,
        totalQuestions: this.game.questions.length
      }
    });
  }
  onTimesUp() {
    this.isTimesUp = true;
    this.skipQuestion();
  }

}

