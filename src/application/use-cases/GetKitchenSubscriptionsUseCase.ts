import { IEventSubscriptionRepository } from "../../domain/interfaces/IEventSubscriptionRepository";

export class GetKitchenSubscriptionsUseCase {
  constructor(private subscriptionRepository: IEventSubscriptionRepository) {}

  public async execute(kitchenId: number) {
    return await this.subscriptionRepository.findByKitchen(kitchenId);
  }
}
