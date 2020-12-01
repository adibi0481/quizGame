import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { EndGameModalComponent } from '../../modals/end-game-modal/end-game-modal.component';
import { GameService } from '../../services/game.service';
import { eGameStatus } from '../../shared/enums/eGameStatus';
import { Game } from '../../shared/models/game.model';
import { reset, skipQuestion, submitAnswer } from './game.actions';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  currentQuestionNumber: number = 1;
  selectedAnswer: string;
  isDisabled: boolean = false;
  isTimeUp: boolean = false;
  isCorrect: boolean = null;
  game: Game;
  selectedIndex: number = 0;

  constructor(private cd: ChangeDetectorRef, public gameService: GameService,
    public dialog: MatDialog,
    private store: Store<{ game: Game }>) {
    this.store.select('game').subscribe(game => {
      this.game = game;
    });
  }

  ngOnInit() {
    this.store.dispatch(reset());
  }
  
  onSubmitAnswer() {
    this.store.dispatch(submitAnswer({ answer: this.selectedAnswer }));
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
      this.openGameOverModal();
    }
    else {
      setTimeout(() => {
        this.selectedAnswer = null;
        this.isTimeUp = false;
        this.isDisabled = false;
        this.isCorrect = null;
        this.currentQuestionNumber++;
        this.stepper.next();
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
      data: {
        answers: this.game.userAnswers,
        status: this.game.status,
        totalScore: this.game.totalScore,
        totalQuestions: this.game.questions.length
      }
    });
  }

  onTimesUp() {
    this.isTimeUp = true;
    this.skipQuestion();
  }
}

