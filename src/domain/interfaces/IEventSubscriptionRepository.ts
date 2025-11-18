import { EventSubscription } from "../entities/EventSubscription";

export interface IEventSubscriptionRepository {
  subscribe(subscription: EventSubscription): Promise<EventSubscription>;

  unsubscribe(kitchenId: number, userId: number): Promise<void>;

  findUserSubscription(kitchenId: number, userId: number): Promise<EventSubscription | null>;

  findByKitchen(kitchenId: number): Promise<EventSubscription[]>;
}
