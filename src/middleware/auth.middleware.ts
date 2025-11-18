import { Request, Response, NextFunction } from "express";
import { authService } from "../infrastructure/api/dependencies/dependencies";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing Authorization header",
      });
    }

    const user = await authService.getUserFromToken(token);

    (req as any).user = user;

    next();
  } catch (error: any) {
    return res.status(error.http_status || 401).json({
      success: false,
      message: error.message || "Invalid or expired token",
    });
  }
}
