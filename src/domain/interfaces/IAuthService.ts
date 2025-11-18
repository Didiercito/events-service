export interface IAuthService {
  getUserFromToken(token: string): Promise<{
    id: number;
    email: string;
    roles: string[];
    stateId: number | null;
    municipalityId: number | null;
  }>;
}
