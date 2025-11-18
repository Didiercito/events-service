import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class GetEventByIdUseCase {
  constructor(private eventRepository: IEventRepository) {}

  public async execute(eventId: number) {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw { http_status: 404, message: "Event not found" };
    }

    return event;
  }
}
