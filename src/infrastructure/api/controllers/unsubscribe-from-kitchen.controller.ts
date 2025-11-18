import { Request, Response } from "express";
import { UnsubscribeFromKitchenEventsUseCase } from "../../../application/use-cases/UnsubscribeFromKitchenEventsUseCase";

export class UnsubscribeFromKitchenController {
  constructor(private useCase: UnsubscribeFromKitchenEventsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const kitchenId = Number(req.params.kitchenId);

      await this.useCase.execute(token, kitchenId);

      return res.status(200).json({
        success: true,
        message: "Unsubscribed successfully",
      });
    } catch (err: any) {
      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
