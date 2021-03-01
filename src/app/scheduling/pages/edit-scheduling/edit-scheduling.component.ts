import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Scheduling } from 'app/domain/models';
import { SchedulingRepository } from 'app/domain/repos';
import { SchedulingForm } from 'app/scheduling/components';

@Component({
  selector: 'app-edit-scheduling',
  templateUrl: './edit-scheduling.component.html',
  styleUrls: ['./edit-scheduling.component.scss'],
})
export class EditSchedulingComponent {
  public form: SchedulingForm;
  public scheduling: Scheduling;
  public loading = true;

  constructor(
    private readonly schedulingRepo: SchedulingRepository,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {}

  async ngOnInit() {
    const schedulingId = this.route.snapshot.paramMap.get('id');
    this.scheduling = await this.schedulingRepo.getById(schedulingId);
    this.form = new SchedulingForm(this.scheduling);
    this.loading = false;

    const schedulingFound = !!this.scheduling;

    if (schedulingFound === false) {
      this.snackbar.open(
        'Não foi possível encontrar o agendamento!',
        undefined,
        {
          duration: 3000,
        }
      );
    }
  }

  async delete() {
    if (this.form.valid === false) {
      return;
    }

    this.scheduling = await this.schedulingRepo.remove(this.scheduling);
    this.snackbar.open('Agendamento Cancelado!', undefined, {
      duration: 3000,
    });
  }

  async update() {
    if (this.form.valid === false) {
      return;
    }

    this.scheduling = await this.schedulingRepo.update({
      ...this.scheduling,
      ...this.form.value,
    });
    this.snackbar.open('Agendamento Atualizado!', undefined, {
      duration: 3000,
    });
  }
}
