import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { TimerComponent } from './components/timer/timer.component';
import { DuplicateNameValidatorDirective } from './directives/duplicate-name.directive';
import { MaterialModule } from './material/material.module';

@NgModule({
    declarations: [
        DuplicateNameValidatorDirective,
        TimerComponent],
    imports: [CommonModule, MaterialModule],
    exports: [MaterialModule, DuplicateNameValidatorDirective, TimerComponent],
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: DuplicateNameValidatorDirective, multi: true }
    ]
})

export class SharedModule { }
