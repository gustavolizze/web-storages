import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-scheduling-card',
  templateUrl: './scheduling-card.component.html',
  styleUrls: ['./scheduling-card.component.scss'],
})
export class SchedulingCardComponent {
  @Input()
  hasTopDivider?: boolean;

  @Input()
  name?: string;

  @Input()
  date?: Date;

  @Input()
  phones: number;

  @Input()
  isDeleted?: boolean;

  @Output()
  click = new EventEmitter();
}
