import { Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";

import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import { EventSchema } from "../../database/schemas/event.schema";
import { Event } from "../../domain/entities/Event";

export class EventRepositoryAdapter implements IEventRepository {
  private repository: Repository<EventSchema>;

  constructor() {
    this.repository = AppDataSource.getRepository(EventSchema);
  }

  async create(event: Event): Promise<Event> {
    const created = this.repository.create(event as any);
    const saved = await this.repository.save(created);
    return saved as any;
  }

  async update(id: number, event: Event): Promise<Event | null> {
    await this.repository.update(id, event as any);
    const updated = await this.repository.findOne({ where: { id } });
    return updated as any;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: number): Promise<Event | null> {
    return (await this.repository.findOne({ where: { id } })) as any;
  }

  async findByKitchen(kitchenId: number): Promise<Event[]> {
    return (await this.repository.find({ where: { kitchenId } })) as any;
  }

  async findWithRegistrations(id: number): Promise<Event | null> {
    return (await this.repository.findOne({ where: { id } })) as any;
  }
}
