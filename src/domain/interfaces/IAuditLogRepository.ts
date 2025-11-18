import { AuditLog } from "../entities/AuditLog";

export interface IAuditLogRepository {
  log(data: AuditLog): Promise<void>;
}
