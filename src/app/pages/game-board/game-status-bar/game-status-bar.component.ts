import { Component, Input, OnInit } from '@angular/core';
import { eGameStatus } from 'src/app/shared/enums/eGameStatus';

@Component({
  selector: 'app-game-status-bar',
  templateUrl: './game-status-bar.component.html',
  styleUrls: ['./game-status-bar.component.scss']
})
export class GameStatusBarComponent implements OnInit {
  @Input() lives: number ;
  @Input() questionNumber: number;
  @Input() score: number;

  constructor() { }

  ngOnInit(): void {
  }

}
