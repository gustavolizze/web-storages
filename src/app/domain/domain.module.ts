import { NgModule } from '@angular/core';
import { SchedulingRepository } from './repos';
import {
  IndexedDbSchedulingRepository,
  LocalStorageSchedulingRepository,
} from './repos/implementations';

const navigatorHasSupportForIndexedDB = Boolean(window.indexedDB);

@NgModule({
  providers: [
    {
      provide: SchedulingRepository,
      useClass: navigatorHasSupportForIndexedDB
        ? IndexedDbSchedulingRepository
        : LocalStorageSchedulingRepository,
    },
  ],
})
export class DomainModule {}
