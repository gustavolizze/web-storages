import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ObjectSchema, ValidationError } from 'yup';
import { ObjectShape } from 'yup/lib/object';
import { mergeWith, isArray } from 'lodash';

interface CreateYupValidatorArgs<T extends ObjectShape = any> {
  schema: ObjectSchema<T>;
}

export class YupValidator {
  static parseYupErrorToValidationError(error: ValidationError, path?: string) {
    const { errors, inner } = error;

    return inner.length
      ? error.inner.reduce((result, current) => {
          return mergeWith(
            result,
            YupValidator.parseYupErrorToValidationError(current, current.path),
            (objValue: any, objSrc: any) => {
              if (isArray(objValue)) {
                return objValue.concat(objSrc);
              }

              return undefined;
            }
          );
        }, {})
      : path
      ? {
          [path]: errors,
        }
      : {};
  }

  static removeErrors(formControl: any, errors?: any) {
    if (errors) {
      const errorsWithoutYupErrors = Object.keys(errors).filter(
        (k) => k !== 'yup'
      );

      const hasErrors = !!Object.keys(errorsWithoutYupErrors).length;
      formControl.setErrors(hasErrors ? errorsWithoutYupErrors : null);
    }
  }

  static removePreviousErrors(control: AbstractControl) {
    const form = control.value;
    Object.keys(form).forEach((key) => {
      const formControl = control.get(key);

      if (formControl instanceof FormArray) {
        formControl.controls.forEach((control) =>
          this.removeErrors(control, control.errors)
        );
      }

      this.removeErrors(formControl, formControl.errors);
    });
  }

  static create<T extends ObjectShape = any>({
    schema,
  }: CreateYupValidatorArgs<T>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control.value;

      try {
        schema.validateSync(form, {
          abortEarly: false,
        });
        this.removePreviousErrors(control);
      } catch (error: unknown) {
        const validationError = this.parseYupErrorToValidationError(
          error as ValidationError,
          undefined
        );

        for (const path in validationError) {
          const currentFormControl = control.get(
            path.includes('[')
              ? path
                  .replace(/\[/gi, '')
                  .replace(/\]/gi, '')
                  .replace(/\d+/gi, '')
              : path
          );

          if (currentFormControl instanceof FormArray) {
            const controlAtIndex = currentFormControl.at(
              +path.replace(/\D+/g, '')
            );

            controlAtIndex.setErrors({
              yup: validationError[path],
            });
          } else {
            currentFormControl.setErrors({
              yup: validationError[path],
            });
          }
        }
      } finally {
        return null;
      }
    };
  }
}
