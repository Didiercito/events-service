import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import { IEventRegistrationRepository } from "../../domain/interfaces/IEventRegistrationRepository";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { EventRegistration } from "../../domain/entities/EventRegistration";
import { EventRegistrationValidator } from "../../domain/validators/EventRegistrationValidator";

export class RegisterToEventUseCase {
  constructor(
    private eventRepository: IEventRepository,
    private registrationRepository: IEventRegistrationRepository,
    private authService: IAuthService
  ) {}

  public async execute(token: string, eventId: number): Promise<EventRegistration> {
    const user = await this.authService.getUserFromToken(token);

    if (!user.roles.includes("Voluntario") && !user.roles.includes("Admin_cocina")) {
      throw { http_status: 403, message: "Only volunteers or kitchen admins can register to events" };
    }

    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw { http_status: 404, message: "Event not found" };
    }

    const count = await this.registrationRepository.countByEvent(eventId);
    if (count >= event.maxCapacity) {
      throw { http_status: 400, message: "Event is full" };
    }

    const exists = await this.registrationRepository.findUserRegistration(eventId, user.id);
    if (exists) {
      throw { http_status: 400, message: "Already registered to this event" };
    }

    const registration = new EventRegistration(
      eventId,
      user.id,
      "volunteer",
      false
    );

    const validator = new EventRegistrationValidator(registration);
    await validator.validateWithCustomRules();

    return await this.registrationRepository.register(registration);
  }
}
