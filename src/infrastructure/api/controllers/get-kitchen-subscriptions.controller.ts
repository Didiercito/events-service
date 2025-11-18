import { Request, Response } from "express";
import { GetKitchenSubscriptionsUseCase } from "../../../application/use-cases/GetKitchenSubscriptionsUseCase";

export class GetKitchenSubscriptionsController {
  constructor(private useCase: GetKitchenSubscriptionsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const kitchenId = Number(req.params.kitchenId);

      const subs = await this.useCase.execute(kitchenId);

      return res.status(200).json({ success: true, data: subs });
    } catch (err: any) {
      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
