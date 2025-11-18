import { BaseValidator } from "./BaseValidator";
import { EventSubscription } from "../entities/EventSubscription";

export class EventSubscriptionValidator extends BaseValidator<EventSubscription> {
  constructor(sub: EventSubscription) {
    super(sub);
  }

  public async validateWithCustomRules(): Promise<void> {
    await this.validate();

    if (this.hasErrors()) {
      throw {
        http_status: 422,
        validations: this.getFormattedErrors(),
      };
    }
  }
}
