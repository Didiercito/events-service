import axios from "axios";
import { IAuthService } from "../../domain/interfaces/IAuthService";

export class AuthServiceAdapter implements IAuthService {
  private client = axios.create({
    baseURL: process.env.AUTH_SERVICE_URL,
  });

  async getUserFromToken(token: string): Promise<any> {
    try {
      const response = await this.client.get("/api/v1/users/me", {
        headers: { Authorization: token },
      });
      return response.data.data;
    } catch {
      throw { http_status: 401, message: "Invalid or expired token" };
    }
  }
}
