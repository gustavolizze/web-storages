import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
})
export class SchedulingComponent {
  navigation = [
    {
      label: 'Inicio',
      path: '',
      icon: 'home',
    },
    {
      label: 'Agendamento',
      path: '/novo-agendamento',
      icon: 'add_circle',
    },
  ];

  constructor(private readonly location: Location) {}

  linkIsActive(path: string) {
    const currentPath = this.location.path(false);

    return path.toLowerCase() === currentPath.toLowerCase();
  }
}
