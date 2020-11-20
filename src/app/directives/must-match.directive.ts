import {Directive, Input} from '@angular/core';
import {FormGroup, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

import {MustMatch} from '../utils/must-match.validator';

@Directive({
  selector: '[appMustMatch]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true }
  ]
})
export class MustMatchDirective implements Validator {
  @Input('appMustMatch') appMustMatch: string[] = [];
  validate(formGroup: FormGroup): ValidationErrors {
    return MustMatch(this.appMustMatch[0], this.appMustMatch[1])(formGroup);
  }
}
