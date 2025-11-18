import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

@Entity({ name: "audit_logs" })
export class AuditLogSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "user_id", type: "int" })
  userId!: number;

  @Column({ type: "varchar", length: 100 })
  action!: string;

  @Column({ name: "entity_type", type: "varchar", length: 100 })
  entityType!: string;

  @Column({ name: "entity_id", type: "int" })
  entityId!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
