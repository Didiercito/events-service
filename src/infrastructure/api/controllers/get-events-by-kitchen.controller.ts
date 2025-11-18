import { Request, Response } from "express";
import { GetEventsByKitchenUseCase } from "../../../application/use-cases/GetEventsByKitchenUseCase";

export class GetEventsByKitchenController {
  constructor(private useCase: GetEventsByKitchenUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const kitchenId = Number(req.params.kitchenId);

      const events = await this.useCase.execute(kitchenId);

      return res.status(200).json({ success: true, data: events });
    } catch (err: any) {
      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
