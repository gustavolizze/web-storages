import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SchedulingComponent } from './layouts';
import {
  AddSchedulingComponent,
  EditSchedulingComponent,
  HomeComponent,
} from './pages';

const routes: Route[] = [
  {
    path: '',
    component: SchedulingComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'agendamento/:id',
        component: EditSchedulingComponent,
      },
      {
        path: 'novo-agendamento',
        component: AddSchedulingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulingRouting {}
