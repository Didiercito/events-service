import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "events" })
export class EventSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "kitchen_id", type: "int" })
  kitchenId!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ name: "event_type", type: "varchar", length: 100 })
  eventType!: string;

  @Column({ name: "event_date", type: "date" })
  eventDate!: string;

  @Column({ name: "start_time", type: "varchar", length: 10 })
  startTime!: string;

  @Column({ name: "end_time", type: "varchar", length: 10 })
  endTime!: string;

  @Column({ name: "expected_diners", type: "int", nullable: true })
  expectedDiners!: number | null;

  @Column({ name: "max_capacity", type: "int" })
  maxCapacity!: number;

  @Column({ type: "varchar", length: 50 })
  status!: string;

  @Column({
    name: "weather_condition",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  weatherCondition!: string | null;

  @Column({ name: "created_by", type: "int" })
  createdBy!: number;

  @Column({ name: "coordinator_id", type: "int", nullable: true })
  coordinatorId!: number | null;

  @Column({ name: "closed_by", type: "int", nullable: true })
  closedBy!: number | null;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
