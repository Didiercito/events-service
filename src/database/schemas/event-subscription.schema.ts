import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from "typeorm";

@Entity({ name: "event_subscriptions" })
export class EventSubscriptionSchema {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "kitchen_id", type: "int" })
  kitchenId!: number;

  @Column({ name: "user_id", type: "int" })
  userId!: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
