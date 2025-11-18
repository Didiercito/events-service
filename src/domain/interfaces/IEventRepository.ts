import { Event } from "../entities/Event";

export interface IEventRepository {
  create(event: Event): Promise<Event>;

  update(id: number, event: Event): Promise<Event | null>;

  delete(id: number): Promise<void>;

  findById(id: number): Promise<Event | null>;

  findByKitchen(kitchenId: number): Promise<Event[]>;

  findWithRegistrations(id: number): Promise<Event | null>;
}
