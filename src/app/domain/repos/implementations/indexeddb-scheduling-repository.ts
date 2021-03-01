import { Injectable } from '@angular/core';
import { Scheduling } from 'app/domain/models';
import { Dexie } from 'dexie';
import { SchedulingRepository } from '../scheduling-repository';
import { v4 } from 'uuid';

@Injectable()
export class IndexedDbSchedulingRepository
  extends Dexie
  implements SchedulingRepository {
  private scheduling: Dexie.Table<Scheduling, string>;

  constructor() {
    super('scheduling-app');

    this.version(1).stores({
      scheduling: '++id,name,message,date,phones,isDeleted',
    });

    this.scheduling = this.table('scheduling');
  }

  getById(input: string): Promise<Scheduling> {
    return this.scheduling.get(input);
  }

  getAll(): Promise<Scheduling[]> {
    return this.scheduling.toArray();
  }

  async insert(input: Scheduling): Promise<Scheduling> {
    const newInput = {
      ...input,
      id: input.id || v4(),
      isDeleted: input.isDeleted || false,
    };

    await this.scheduling.add(newInput);

    return newInput;
  }

  async update(input: Scheduling): Promise<Scheduling> {
    const { id, ...other } = input;

    await this.scheduling.update(id, other);

    return input;
  }

  remove(input: Scheduling): Promise<Scheduling> {
    return this.update({
      ...input,
      isDeleted: true,
    });
  }
}
