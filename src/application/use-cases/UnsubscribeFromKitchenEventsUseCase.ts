import { IEventSubscriptionRepository } from "../../domain/interfaces/IEventSubscriptionRepository";
import { IAuthService } from "../../domain/interfaces/IAuthService";

export class UnsubscribeFromKitchenEventsUseCase {
  constructor(
    private subscriptionRepository: IEventSubscriptionRepository,
    private authService: IAuthService
  ) {}

  public async execute(token: string, kitchenId: number): Promise<void> {
    const user = await this.authService.getUserFromToken(token);

    const exists = await this.subscriptionRepository.findUserSubscription(kitchenId, user.id);
    if (!exists) {
      throw { http_status: 404, message: "Subscription not found" };
    }

    return await this.subscriptionRepository.unsubscribe(kitchenId, user.id);
  }
}
