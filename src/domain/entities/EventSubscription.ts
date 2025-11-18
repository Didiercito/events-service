import { IsInt, Min, IsOptional } from "class-validator";

export class EventSubscription {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  @Min(1)
  kitchenId: number;

  @IsInt()
  @Min(1)
  userId: number;

  @IsOptional()
  createdAt?: Date;

  constructor(
    kitchenId: number,
    userId: number,
    createdAt?: Date,
    id?: number
  ) {
    this.id = id;
    this.kitchenId = kitchenId;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}
