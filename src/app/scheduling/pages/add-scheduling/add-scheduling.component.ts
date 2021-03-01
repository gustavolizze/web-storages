import { Component, ViewChild } from '@angular/core';
import { SchedulingRepository } from 'app/domain/repos';
import { MatDialog } from '@angular/material/dialog';
import { SuccessfullyAddedComponent } from 'app/shared/components/successfully-added';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SchedulingForm } from 'app/scheduling/components';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-add-scheduling',
  templateUrl: './add-scheduling.component.html',
  styleUrls: ['./add-scheduling.component.scss'],
})
export class AddSchedulingComponent {
  form: SchedulingForm;

  @ViewChild('stepper')
  stepper: MatStepper;

  constructor(
    private readonly schedulingRepo: SchedulingRepository,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.form = new SchedulingForm();
  }

  get totalPhones() {
    return this.form?.phones?.length || 0;
  }

  reset() {
    this.form = new SchedulingForm();
    this.stepper.reset();
  }

  ngOnDestroy() {
    this.reset();
  }

  async create() {
    try {
      const scheduling = await this.schedulingRepo.insert(this.form.value);
      this.reset();
      const ref = this.dialog.open(SuccessfullyAddedComponent, {
        data: {
          title: 'Agendamento Cadastrado!',
          actionText1: 'Criar Outro',
          actionText2: 'Visualizar Agendamento',
          action1Value: 'create',
          action2Value: 'view',
        },
      });

      ref.afterClosed().subscribe((result) => {
        if (result !== 'create') {
          this.router.navigate([`/agendamento/${scheduling.id}`]);
        }
      });
    } catch (e) {
      this.snackBar.open(
        'Não foi possível cadastrar o agendamento tente novamente mais tarde!'
      );
    }
  }
}
