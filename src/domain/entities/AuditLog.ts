import { IsInt, Min, IsString, IsOptional } from "class-validator";

export class AuditLog {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  @Min(1)
  userId: number;

  @IsString()
  action: string;

  @IsString()
  entityType: string;

  @IsInt()
  @Min(1)
  entityId: number;

  @IsOptional()
  createdAt?: Date;

  constructor(
    userId: number,
    action: string,
    entityType: string,
    entityId: number,
    createdAt?: Date,
    id?: number
  ) {
    this.id = id;
    this.userId = userId;
    this.action = action;
    this.entityType = entityType;
    this.entityId = entityId;
    this.createdAt = createdAt;
  }
}
