import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GameService } from '../../services/game.service';

@Directive({
    selector: '[duplicateNameValidator][ngModel]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: DuplicateNameValidatorDirective, multi: true }]
})
export class DuplicateNameValidatorDirective implements AsyncValidator {
    constructor(private gameService: GameService) { }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return timer(300).pipe(
            switchMap(() =>
                this.gameService.isNameAvailable(control.value)
            ), 
            map(isAvailable =>
                 isAvailable ? null : { duplicateName: 'Name already exists' })
            )
    }
}