import { BaseValidator } from "./BaseValidator";
import { Event } from "../entities/Event";

export class EventValidator extends BaseValidator<Event> {
  constructor(event: Event) {
    super(event);
  }

  public async validateWithCustomRules(): Promise<void> {
    await this.validate();

    if (!this.isValidTime(this.entity.startTime)) {
      this.addError("startTime", "startTime format must be HH:MM");
    }

    if (!this.isValidTime(this.entity.endTime)) {
      this.addError("endTime", "endTime format must be HH:MM");
    }

    if (this.isValidTime(this.entity.startTime) && this.isValidTime(this.entity.endTime)) {
      if (!this.isStartBeforeEnd()) {
        this.addError("startTime", "startTime must be before endTime");
      }
    }

    if (
      this.entity.expectedDiners != null &&
      this.entity.expectedDiners > this.entity.maxCapacity
    ) {
      this.addError(
        "expectedDiners",
        "expectedDiners must be less than or equal to maxCapacity"
      );
    }

    if (this.hasErrors()) {
      throw {
        http_status: 422,
        validations: this.getFormattedErrors(),
      };
    }
  }

  private addError(property: string, message: string) {
    this.listErrors.push({
      property,
      constraints: { custom: message },
      children: [],
      target: this.entity,
      value: (this.entity as any)[property],
    });
  }

  private isValidTime(value: string): boolean {
    return /^\d{2}:\d{2}$/.test(value);
  }

  private isStartBeforeEnd(): boolean {
    const [sh, sm] = this.entity.startTime.split(":").map(Number);
    const [eh, em] = this.entity.endTime.split(":").map(Number);
    return sh < eh || (sh === eh && sm < em);
  }
}
