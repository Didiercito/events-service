import { Request, Response } from "express";
import { SubscribeToKitchenEventsUseCase } from "../../../application/use-cases/SubscribeToKitchenEventsUseCase";

export class SubscribeToKitchenController {
  constructor(private useCase: SubscribeToKitchenEventsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const kitchenId = Number(req.params.kitchenId);

      const sub = await this.useCase.execute(token, kitchenId);

      return res.status(201).json({ success: true, data: sub });
    } catch (err: any) {
      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
