import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Scheduling } from 'app/domain/models';
import { YupValidator } from 'app/shared/validators';
import { SchedulingFormValidation } from './scheduling-form-validation';

export class SchedulingForm extends FormGroup {
  constructor(initialValues?: Scheduling) {
    super(
      {
        name: new FormControl(initialValues?.name || ''),
        message: new FormControl(initialValues?.message || ''),
        date: new FormControl(initialValues?.date || undefined),
        phones: initialValues?.phones
          ? new FormArray(
              initialValues.phones.map((phone) => new FormControl(phone || ''))
            )
          : new FormArray([new FormControl('')]),
      },
      {
        validators: YupValidator.create({
          schema: SchedulingFormValidation,
        }),
      }
    );
  }

  public get phones() {
    return this.get('phones') as FormArray;
  }

  clearPhones(): void {
    this.phones.clear();
    this.addPhone();
  }

  addPhone(phone: string = '') {
    this.phones.push(new FormControl(phone));
    this.updateValueAndValidity();
  }

  private CSVToArray(strData: string, strDelimiter: string = ';'): string[][] {
    const objPattern = new RegExp(
      '(\\' +
        strDelimiter +
        '|\\r?\\n|\\r|^)' +
        // Quoted fields.
        '(?:"([^"]*(?:""[^"]*)*)"|' +
        // Standard fields.
        '([^"\\' +
        strDelimiter +
        '\\r\\n]*))',
      'gi'
    );

    const arrData = [[]];
    let arrMatches = null;

    while ((arrMatches = objPattern.exec(strData))) {
      const strMatchedDelimiter = arrMatches[1];

      if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
        arrData.push([]);
      }

      if (arrMatches[2]) {
        var strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
      } else {
        var strMatchedValue = arrMatches[3];
      }

      arrData[arrData.length - 1].push(strMatchedValue);
    }

    return arrData;
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  async loadCsv(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const loadAsPromise = () =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (ev) {
          resolve(reader.result as string);
        };

        reader.readAsText(file);
      });

    const csv: any = await loadAsPromise();
    const parsed = this.CSVToArray(csv);

    for (const line of parsed) {
      if (line[0]) {
        this.addPhone(line[0]);
      }
    }

    if (this.phones.at(0).value === '') {
      this.removePhone(0);
    }
  }
}
