import { Component, Input } from '@angular/core';
import { ControlContainer, FormArray } from '@angular/forms';
import { isNil } from 'lodash';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
})
export class FormErrorsComponent {
  constructor(private readonly controlContainer: ControlContainer) {}

  @Input()
  name?: string;

  @Input()
  arrayIndex?: number = undefined;

  get isArray(): boolean {
    return isNil(this.arrayIndex) === false && this.arrayIndex >= 0;
  }

  get control() {
    if (!this.name) {
      return undefined;
    }

    return this.isArray
      ? this.controlContainer.control
      : this.controlContainer.control.get(this.name);
  }

  get errors() {
    if (this.isArray === false) {
      return this.control?.errors || {};
    } else {
      return (this.control as FormArray)?.at(this.arrayIndex).errors || {};
    }
  }

  get hasError(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  get firstError(): string | undefined {
    const errors = this.errors;
    const error = errors
      ? errors[Object.keys(errors).find((key, index) => index === 0)]
      : undefined;

    return Array.isArray(error) ? error[0] : error;
  }
}
