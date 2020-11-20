import { FormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    // returns null if controls weren't implemented
    if (!control || !matchingControl) {
      return null;
    }

    //returns null if matchingControl is invalid by another validator
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return null
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({mustMatch: true});
    } else {
      matchingControl.setErrors(null);
    }
  }
}
