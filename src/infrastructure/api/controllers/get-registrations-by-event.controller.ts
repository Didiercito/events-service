import { Request, Response } from "express";
import { GetRegistrationsByEventUseCase } from "../../../application/use-cases/GetRegistrationsByEventUseCase";

export class GetRegistrationsByEventController {
  constructor(private useCase: GetRegistrationsByEventUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const eventId = Number(req.params.eventId);

      const participants = await this.useCase.execute(token, eventId);

      return res.status(200).json({ success: true, data: participants });
    } catch (err: any) {
      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
