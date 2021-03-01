import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContainerComponent } from './container';
import { PageTitleComponent } from './page-title';
import { EmtpyStateComponent } from './empty-state';
import { FormErrorsComponent } from './form-errors';
import { SuccessfullyAddedComponent } from './successfully-added';
import { AngularMaterialModule } from '../material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const Components = [
  ContainerComponent,
  PageTitleComponent,
  FormErrorsComponent,
  EmtpyStateComponent,
  SuccessfullyAddedComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
  ],
  declarations: Components,
  exports: Components,
})
export class SharedComponentsModule {}
