import { Request, Response } from "express";
import { DeleteEventUseCase } from "../../../application/use-cases/DeleteEventUseCase";

export class DeleteEventController {
  constructor(private useCase: DeleteEventUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const token = req.headers.authorization!;
      const id = Number(req.params.id);

      await this.useCase.execute(token, id);

      return res.status(200).json({
        success: true,
        message: "Event deleted",
      });
    } catch (err: any) {
      return res.status(err.http_status || 500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
