import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {of} from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  shippingSame = new FormControl();

  constructor(
          public fb: FormBuilder
  ) {}

  orderInfo = this.fb.group({
    fullName: [
      { value: '', disabled: false},
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/)
        ],
        updateOn: 'blur',
      },
      []
    ],
    shippingSameCheckbox: [],
    billingAddress: this.fb.group({
      address: [
        { value: '', disabled: false},
        {
          validators: [Validators.required],
          updateOn: 'blur'
        },
        []
      ],
      postalCode: [
        { value: '', disabled: false},
        [Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{3}$/)],
        []
      ],
      city: [
        { value: '', disabled: false},
        [Validators.required],
        []
      ],
      country: [
        { value: '', disabled: false},
        { validators: [
            Validators.required
          ],
          asyncValidators: (control) => {
            if (control.value.includes('bla')) {
              return of();
            }
            return of();
          }
        },
        []
      ],
    }),

    shippingAddress: this.fb.group({
      address: [
        { value: '', disabled: false},
        [Validators.required],
        []
      ],
      postalCode: [
        { value: '', disabled: false},
        [Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{3}$/)],
        []
      ],
      city: [
        { value: '', disabled: false},
        [Validators.required],
        []
      ],
      country: [
        { value: '', disabled: false},
        { validators: [
            Validators.required
          ],
          asyncValidators: (control) => {
            if (control.value.includes('bla')) {
              return of();
            }
            return of();
          }
        },
        []
      ],
    }),

  }, {
    updateOn: 'submit',
    validators: []
  });
  ngOnInit() {
    this.orderInfo.controls.shippingSameCheckbox.patchValue(true,  {
      onlySelf: false,
      emitEvent: false,
      // emitModelToViewChange: true,
      // emitViewToModelChange: true,
    });
    this.orderInfo.get('shippingSameCheckbox').valueChanges.subscribe(val => {
      console.log('shippingSameCheckbox: ', val);
    });

    this.orderInfo.controls.shippingSameCheckbox.valueChanges.subscribe(arg => {
      console.log('ValueChanges controls shippingSameCheckbox: ', arg);
    });

    this.orderInfo.valueChanges.subscribe(arg => {
      console.log(arg, this.orderInfo);
    });

    this.shippingSame.valueChanges.subscribe(changes => {
      console.log('Changes: ', changes);
    });
  }
  onSubmit(form: any): void {
    console.log('Sending info about order: ', form.value);
  }
}
