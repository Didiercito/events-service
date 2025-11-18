import { Request, Response } from "express";
import { GetEventByIdUseCase } from "../../../application/use-cases/GetEventByIdUseCase";

export class GetEventByIdController {
  constructor(private useCase: GetEventByIdUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const event = await this.useCase.execute(id);

      return res.status(200).json({ success: true, data: event });
    } catch (err: any) {
      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
