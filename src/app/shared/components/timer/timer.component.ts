import { EventEmitter } from '@angular/core';
import { Component, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {  
  @Output() timesUp: EventEmitter<void> = new EventEmitter<void>();
  @Output() onTimeLeftAlert: EventEmitter<void> = new EventEmitter<void>();

  private timerInterval$ = interval(1000);
  private timerSubscription: Subscription;
  timeLeft: number;

  constructor() { }

  start(time: number, timeLeftAlert?: number){ 
    this.timeLeft = time;
    this.timerSubscription = this.timerInterval$.pipe(take(time)).subscribe(() => {
      this.timeLeft = this.timeLeft - 1;

      if(timeLeftAlert && this.timeLeft === timeLeftAlert){
        this.onTimeLeftAlert.emit();
      }

      if (this.timeLeft == 0) {
        this.timesUp.emit();
      }
    });
  }
  
  stop(){
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.stop();
  }
}
