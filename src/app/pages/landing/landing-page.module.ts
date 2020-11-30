import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { MaterialModule } from '../../material.module';
import { LandingComponent } from './landing.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { QuestionsStatisticsComponent } from './questions-statistics/questions-statistics.component';

@NgModule({
    declarations:[
        LandingComponent,
        LeaderboardComponent,
        QuestionsStatisticsComponent],
    imports: [CommonModule,AppRoutingModule, MaterialModule],
    exports: [LandingComponent],
    providers: []    
})

export class LandingPageModule { }
