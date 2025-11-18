import { IEventSubscriptionRepository } from "../../domain/interfaces/IEventSubscriptionRepository";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { EventSubscription } from "../../domain/entities/EventSubscription";
import { EventSubscriptionValidator } from "../../domain/validators/EventSubscriptionValidator";

export class SubscribeToKitchenEventsUseCase {
  constructor(
    private subscriptionRepository: IEventSubscriptionRepository,
    private authService: IAuthService
  ) {}

  public async execute(token: string, kitchenId: number) {
    const user = await this.authService.getUserFromToken(token);

    if (!user.roles.includes("Voluntario")) {
      throw { http_status: 403, message: "Only volunteers can subscribe to kitchen events" };
    }

    const exists = await this.subscriptionRepository.findUserSubscription(kitchenId, user.id);
    if (exists) {
      throw { http_status: 400, message: "Already subscribed" };
    }

    const sub = new EventSubscription(kitchenId, user.id);

    const validator = new EventSubscriptionValidator(sub);
    await validator.validateWithCustomRules();

    return await this.subscriptionRepository.subscribe(sub);
  }
}
