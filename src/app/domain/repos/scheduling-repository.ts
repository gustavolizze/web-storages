import { Scheduling } from '../models';

export abstract class SchedulingRepository {
  abstract insert(input: Scheduling): Promise<Scheduling>;
  abstract getAll(): Promise<Scheduling[]>;
  abstract getById(input: string): Promise<Scheduling | undefined>;
  abstract remove(input: Scheduling): Promise<Scheduling>;
  abstract update(input: Scheduling): Promise<Scheduling>;
}
