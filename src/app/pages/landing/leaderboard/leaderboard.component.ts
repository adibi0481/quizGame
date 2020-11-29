import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { GameResults } from 'src/app/shared/models/game-results.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  topScores$: Observable<GameResults[]>;
  constructor(private gamesService: GameService) { }

  ngOnInit(): void {
    this.topScores$ = this.gamesService.getLeaderboard();
  } 

}
