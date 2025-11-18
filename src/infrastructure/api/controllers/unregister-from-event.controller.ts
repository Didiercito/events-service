import { Request, Response } from "express";
import { UnregisterFromEventUseCase } from "../../../application/use-cases/UnregisterFromEventUseCase";

export class UnregisterFromEventController {
  constructor(private useCase: UnregisterFromEventUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const eventId = Number(req.params.eventId);

      await this.useCase.execute(token, eventId);

      return res.status(200).json({
        success: true,
        message: "Unregistered",
      });
    } catch (err: any) {
      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
