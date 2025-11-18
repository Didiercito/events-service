import {
  IsInt,
  Min,
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
} from "class-validator";

export class Event {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  @Min(1)
  kitchenId: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsString()
  eventType: string;

  @IsDateString()
  eventDate: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsOptional()
  @IsNumber()
  expectedDiners?: number | null;

  @IsInt()
  @Min(1)
  maxCapacity: number;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  weatherCondition?: string | null;

  @IsInt()
  createdBy: number;

  @IsOptional()
  @IsInt()
  coordinatorId?: number | null;

  @IsOptional()
  @IsInt()
  closedBy?: number | null;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;

  constructor(
    kitchenId: number,
    name: string,
    description: string | null,
    eventType: string,
    eventDate: string,
    startTime: string,
    endTime: string,
    expectedDiners: number | null,
    maxCapacity: number,
    status: string,
    weatherCondition: string | null,
    createdBy: number,
    coordinatorId: number | null,
    closedBy: number | null,
    createdAt?: Date,
    updatedAt?: Date,
    id?: number
  ) {
    this.id = id;
    this.kitchenId = kitchenId;
    this.name = name;
    this.description = description;
    this.eventType = eventType;
    this.eventDate = eventDate;
    this.startTime = startTime;
    this.endTime = endTime;
    this.expectedDiners = expectedDiners;
    this.maxCapacity = maxCapacity;
    this.status = status;
    this.weatherCondition = weatherCondition;
    this.createdBy = createdBy;
    this.coordinatorId = coordinatorId;
    this.closedBy = closedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
