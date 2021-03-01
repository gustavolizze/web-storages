import { Injectable } from '@angular/core';
import { Scheduling } from 'app/domain/models';
import { SchedulingRepository } from '../scheduling-repository';
import { v4 } from 'uuid';

@Injectable()
export class LocalStorageSchedulingRepository implements SchedulingRepository {
  private readonly key = 'scheduling';

  constructor() {}

  async getAll(): Promise<Scheduling[]> {
    const items = localStorage.getItem(this.key);

    if (!items) {
      return [];
    }

    const jsonItems = JSON.parse(items);

    return Array.isArray(jsonItems) ? jsonItems : [];
  }

  async insert(input: Scheduling): Promise<Scheduling> {
    const parsedInput = {
      ...input,
      id: input.id || v4(),
      isDeleted: input.isDeleted || false,
    };
    const items = await this.getAll();
    localStorage.setItem(this.key, JSON.stringify([...items, parsedInput]));

    return parsedInput as Scheduling;
  }

  async getById(input: string): Promise<Scheduling> {
    const items = await this.getAll();

    return items.find((item) => item.id === input);
  }

  async remove(input: Scheduling): Promise<Scheduling> {
    return this.update({
      ...input,
      isDeleted: true,
    });
  }

  async update(input: Scheduling): Promise<Scheduling> {
    const allItems = await this.getAll();
    const item = await this.getById(input.id);

    const newItem = {
      ...item,
      ...input,
    } as Scheduling;

    localStorage.setItem(
      this.key,
      JSON.stringify(
        allItems.map((item) => (item.id === input.id ? newItem : item))
      )
    );

    return newItem;
  }
}
