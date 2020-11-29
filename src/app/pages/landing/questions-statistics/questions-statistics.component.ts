import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { GameService } from 'src/app/services/game.service';
import { QuestionStatistics } from 'src/app/shared/models/question-statistics.model';

@Component({
  selector: 'app-questions-statistics',
  templateUrl: './questions-statistics.component.html',
  styleUrls: ['./questions-statistics.component.scss']
})
export class QuestionsStatisticsComponent implements OnInit {

  constructor(private gameService: GameService) { }

  objectKeys = Object.keys;
  questionsStatistics: { [question: string]: QuestionStatistics };

  ngOnInit(): void {
    this.gameService.getQuestionsStatistics().pipe(take(1)).subscribe(stats => {
      this.questionsStatistics = stats;
    });
  }

}
