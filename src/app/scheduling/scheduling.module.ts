import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SchedulingRouting } from './scheduling.routing';
import { SharedComponentsModule } from 'app/shared/components';
import { AngularMaterialModule } from 'app/shared/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { DomainModule } from 'app/domain';
import { SchedulingComponent } from './layouts';
import {
  AddSchedulingComponent,
  EditSchedulingComponent,
  HomeComponent,
} from './pages';
import { SchedulingFormComponent, SchedulingCardComponent } from './components';
import { CdkStepperModule } from '@angular/cdk/stepper';

@NgModule({
  imports: [
    CommonModule,
    CdkStepperModule,
    AngularMaterialModule,
    FormsModule,
    DomainModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxMaskModule.forChild(),
    SchedulingRouting,
  ],
  declarations: [
    SchedulingComponent,
    HomeComponent,
    EditSchedulingComponent,
    AddSchedulingComponent,
    SchedulingFormComponent,
    SchedulingCardComponent,
  ],
  bootstrap: [SchedulingComponent],
})
export class SchedulingModule {}
