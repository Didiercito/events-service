import { Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";

import { EventSubscriptionSchema } from "../../database/schemas/event-subscription.schema";
import { IEventSubscriptionRepository } from "../../domain/interfaces/IEventSubscriptionRepository";
import { EventSubscription } from "../../domain/entities/EventSubscription";

export class EventSubscriptionRepositoryAdapter
  implements IEventSubscriptionRepository
{
  private repository: Repository<EventSubscriptionSchema>;

  constructor() {
    this.repository = AppDataSource.getRepository(EventSubscriptionSchema);
  }

  async subscribe(sub: EventSubscription): Promise<EventSubscription> {
    const created = this.repository.create(sub as any);
    const saved = await this.repository.save(created);
    return saved as any;
  }

  async unsubscribe(kitchenId: number, userId: number): Promise<void> {
    await this.repository.delete({ kitchenId, userId } as any);
  }

  async findUserSubscription(
    kitchenId: number,
    userId: number
  ): Promise<EventSubscription | null> {
    return (await this.repository.findOne({
      where: { kitchenId, userId },
    })) as any;
  }

  async findByKitchen(kitchenId: number): Promise<EventSubscription[]> {
    return (await this.repository.find({ where: { kitchenId } })) as any;
  }
}
