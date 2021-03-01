import { Component, Input } from '@angular/core';
import { SchedulingForm } from './scheduling-form.service';

@Component({
  selector: 'app-scheduling-form',
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss'],
})
export class SchedulingFormComponent {
  constructor() {}

  @Input()
  form: SchedulingForm;
}
