import { IEventRegistrationRepository } from "../../domain/interfaces/IEventRegistrationRepository";
import { IAuthService } from "../../domain/interfaces/IAuthService";

export class UnregisterFromEventUseCase {
  constructor(
    private registrationRepository: IEventRegistrationRepository,
    private authService: IAuthService
  ) {}

  public async execute(token: string, eventId: number): Promise<void> {
    const user = await this.authService.getUserFromToken(token);

    const registration = await this.registrationRepository.findUserRegistration(eventId, user.id);
    if (!registration) {
      throw { http_status: 404, message: "Registration not found" };
    }

    return await this.registrationRepository.unregister(eventId, user.id);
  }
}
