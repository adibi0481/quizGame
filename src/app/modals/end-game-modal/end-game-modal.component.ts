import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { GameService } from 'src/app/services/game.service';
import { eGameStatus } from 'src/app/shared/enums/eGameStatus';
import { GameResults } from 'src/app/shared/models/game-results.model';

@Component({
  selector: 'app-end-game-modal',
  templateUrl: './end-game-modal.component.html',
  styleUrls: ['./end-game-modal.component.scss']
})
export class EndGameModalComponent {
  username: string = '';
  totalScore: number;
  status: eGameStatus;
  answers: any;
  totalQuestions: number;
  correctAnswers: number;

  constructor(public router: Router,
              public gameService: GameService,
              public dialogRef: MatDialogRef<EndGameModalComponent>,
              @Inject(MAT_DIALOG_DATA) 
              public data: {totalScore: number, status: eGameStatus, answers: any, totalQuestions: number}) {
      this.status = data.status;
      this.answers = data.answers;
      this.totalScore = data.totalScore;
      this.totalQuestions = data.totalQuestions;
      this.correctAnswers = Object.values(this.answers).filter(v => v === true).length;
    }


  dismiss() {
    this.dialogRef.close();
  }

  onSubmitName(){
    if(this.username){
      let gameResults: GameResults = {
          answers: this.answers,
          date: new Date(),
          totalScore: this.totalScore,
          username: this.username
      };

       this.gameService.submitGameResults(gameResults).pipe(take(1)).subscribe(() => {
        this.dismiss();
        this.router.navigate(['']);
       }, err => {});             
    }
  }

}
