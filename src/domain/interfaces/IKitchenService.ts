export interface IKitchenService {
  getKitchenById(kitchenId: number): Promise<{
    id: number;
    ownerId: number;
    contactEmail?: string;
    contactPhone?: string;
  }>;
}
