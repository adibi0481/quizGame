import { EventEmitter } from '@angular/core';
import { Component, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { delay, take } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {  
  @Output() timesUp: EventEmitter<void> = new EventEmitter<void>();
  private timerInterval$ = interval(1000);
  private timerSubscription: Subscription;
  timer: number;

  constructor() { }

  //init timer with time ,in seconds
  restart(time: number){    
    this.stop();
    this.timer = time;
    this.timerSubscription = this.timerInterval$.pipe(take(time)).subscribe(() => {
      this.timer--;
      if(this.timer <= 5){
        document.body.style.fontWeight = "bold";
      }

      if (this.timer == 0) {
        this.timesUp.emit();
      }
    });
  }
  
  stop(){
    if (this.timerSubscription) {
      document.body.style.fontWeight = "initial";
      this.timerSubscription.unsubscribe();
    }
  }

}
