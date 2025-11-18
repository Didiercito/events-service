import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

@Entity({ name: "event_registrations" })
export class EventRegistrationSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "event_id", type: "int" })
  eventId!: number;

  @Column({ name: "user_id", type: "int" })
  userId!: number;

  @Column({ name: "registration_type", type: "varchar", length: 100 })
  registrationType!: string;

  @Column({ type: "boolean", default: false })
  attended!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
