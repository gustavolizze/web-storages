import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-scheduling-successfully-added',
  templateUrl: './successfully-added.component.html',
  styleUrls: ['successfully-added.component.scss'],
})
export class SuccessfullyAddedComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title?: string;
      actionText1?: string;
      actionText2?: string;
      action1Value: any;
      action2Value: any;
    }
  ) {}
}
