import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.scss']
})
export class TemplateDrivenComponent implements OnChanges {
  model: any = {};

  ngOnChanges(changes: SimpleChanges) {
  }

  onSubmit(singUp: NgForm) {
    console.log(singUp);
  }
}
