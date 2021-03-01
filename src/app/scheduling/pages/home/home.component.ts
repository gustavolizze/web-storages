import { Component, ViewChild } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { Scheduling } from 'app/domain/models';
import { SchedulingRepository } from 'app/domain/repos';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { search as ssSearch } from 'ss-search';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  schedulings: Scheduling[];
  loading = true;
  searchSubject = new Subject<string>();
  search = '';
  searchResult: Scheduling[] = [];

  constructor(
    private readonly schedulingRepo: SchedulingRepository,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    this.schedulings = await this.schedulingRepo.getAll();
    this.loading = false;
  }

  ngAfterViewInit() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.searchResult = ssSearch(
          this.schedulings,
          ['name', 'date', 'phones', 'message'],
          value
        ) as any[];
      });
  }

  onSearchInputChange(value: string) {
    this.searchSubject.next(value);
  }

  navigateToAddScheduling() {
    this.router.navigate(['/novo-agendamento']);
  }

  navigateToScheduling(id: string) {
    this.router.navigate([`/agendamento/${id}`]);
  }
}
