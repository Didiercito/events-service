import { Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";

import { AuditLogSchema } from "../../database/schemas/audit-log.schema";
import { IAuditLogRepository } from "../../domain/interfaces/IAuditLogRepository";
import { AuditLog } from "../../domain/entities/AuditLog";

export class AuditLogRepositoryAdapter implements IAuditLogRepository {
  private repository: Repository<AuditLogSchema>;

  constructor() {
    this.repository = AppDataSource.getRepository(AuditLogSchema);
  }

  async log(data: AuditLog): Promise<void> {
    const entry = this.repository.create(data as any);
    await this.repository.save(entry);
  }
}
