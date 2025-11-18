import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import { IAuthService } from "../../domain/interfaces/IAuthService";
import { IKitchenService } from "../../domain/interfaces/IKitchenService";

import { EventUpdateValidator } from "../../domain/validators/EventUpdateValidator";
import { Event } from "../../domain/entities/Event";

export class UpdateEventUseCase {
  constructor(
    private eventRepository: IEventRepository,
    private authService: IAuthService,
    private kitchenService: IKitchenService
  ) {}

  public async execute(token: string, eventId: number, data: any): Promise<Event> {
    const user = await this.authService.getUserFromToken(token);

    if (!user.roles.includes("Admin_cocina")) {
      throw { http_status: 403, message: "Only kitchen admins can update events" };
    }

    const existing = await this.eventRepository.findById(eventId);
    if (!existing) {
      throw { http_status: 404, message: "Event not found" };
    }

    const kitchen = await this.kitchenService.getKitchenById(existing.kitchenId);
    if (kitchen.ownerId !== user.id) {
      throw { http_status: 403, message: "You cannot update this event" };
    }

    Object.assign(existing, data);

    const validator = new EventUpdateValidator(existing);
    await validator.validateWithCustomRules();

    const updated = await this.eventRepository.update(eventId, existing);

    if (!updated) {
      throw { http_status: 500, message: "Event could not be updated" };
    }

    return updated;
  }
}
