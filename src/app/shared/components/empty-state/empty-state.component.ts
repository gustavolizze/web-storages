import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmtpyStateComponent {
  @Input()
  title?: string;

  @Input()
  subtitle?: string;

  @Input()
  actionText?: string;

  @Output()
  action = new EventEmitter();

  handleActionClick() {
    this.action.emit();
  }
}
