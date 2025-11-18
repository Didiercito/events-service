import { BaseValidator } from "./BaseValidator";
import { EventRegistration } from "../entities/EventRegistration";

export class EventRegistrationValidator extends BaseValidator<EventRegistration> {
  constructor(data: EventRegistration) {
    super(data);
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
