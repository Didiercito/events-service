import { Request, Response } from "express";
import { CreateEventUseCase } from "../../../application/use-cases/CreateEventUseCase";

export class CreateEventController {
  constructor(private useCase: CreateEventUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const data = req.body;

      const event = await this.useCase.execute(token, data);

      return res.status(201).json({ success: true, data: event });
    } catch (err: any) {
      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
