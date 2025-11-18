import { Request, Response } from "express";
import { RegisterToEventUseCase } from "../../../application/use-cases/RegisterToEventUseCase";

export class RegisterToEventController {
  constructor(private useCase: RegisterToEventUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const eventId = Number(req.params.eventId);

      const result = await this.useCase.execute(token, eventId);

      return res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
