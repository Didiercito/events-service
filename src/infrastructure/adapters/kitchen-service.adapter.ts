import axios from "axios";
import { IKitchenService } from "../../domain/interfaces/IKitchenService";

export class KitchenServiceAdapter implements IKitchenService {
  private client = axios.create({
    baseURL: process.env.KITCHEN_SERVICE_URL,
  });

  async getKitchenById(id: number): Promise<any> {
    try {
      const response = await this.client.get(`/api/v1/kitchens/${id}`);
      return response.data.data;
    } catch {
      throw { http_status: 404, message: "Kitchen not found" };
    }
  }
}
