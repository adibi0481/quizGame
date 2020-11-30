import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { GameBoardComponent } from './game-board.component';
import { GameStatusBarComponent } from './game-status-bar/game-status-bar.component';
import { QuestionComponent } from './question/question.component';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from './game.reducer';
import { FormsModule, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { EndGameModalComponent } from '../../modals/end-game-modal/end-game-modal.component';
import { DuplicateNameValidatorDirective } from '../../shared/directives/duplicate-name.directive';
import { TimerComponent } from '../../shared/components/timer/timer.component';

@NgModule({
    declarations:[GameBoardComponent,
                  GameStatusBarComponent,
                  QuestionComponent,
                EndGameModalComponent,
                DuplicateNameValidatorDirective,
                TimerComponent],
    imports: [CommonModule,FormsModule, MaterialModule,StoreModule.forRoot({ game: gameReducer })],
    exports: [GameBoardComponent],
    providers: [ {provide: NG_ASYNC_VALIDATORS, useExisting: DuplicateNameValidatorDirective, multi: true}
    ]    
})

export class GameBoardModule { }
