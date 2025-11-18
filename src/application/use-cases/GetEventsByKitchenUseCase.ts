import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class GetEventsByKitchenUseCase {
  constructor(private eventRepository: IEventRepository) {}

  public async execute(kitchenId: number) {
    return await this.eventRepository.findByKitchen(kitchenId);
  }
}
