import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GameBoardComponent } from './game-board.component';
import { GameStatusBarComponent } from './game-status-bar/game-status-bar.component';
import { QuestionComponent } from './question/question.component';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from './game.reducer';
import { FormsModule } from '@angular/forms';
import { EndGameModalComponent } from '../../modals/end-game-modal/end-game-modal.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations:[GameBoardComponent,
                  GameStatusBarComponent,
                  QuestionComponent,
                EndGameModalComponent],
    imports: [SharedModule,CommonModule,FormsModule,StoreModule.forRoot({ game: gameReducer })],
    exports: [GameBoardComponent]        
})

export class GameBoardModule { }
