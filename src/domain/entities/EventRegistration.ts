import { IsInt, Min, IsString, IsBoolean, IsOptional } from "class-validator";

export class EventRegistration {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  @Min(1)
  eventId: number;

  @IsInt()
  @Min(1)
  userId: number;

  @IsString()
  registrationType: string;

  @IsBoolean()
  attended: boolean;

  @IsOptional()
  createdAt?: Date;

  constructor(
    eventId: number,
    userId: number,
    registrationType: string,
    attended: boolean,
    createdAt?: Date,
    id?: number
  ) {
    this.id = id;
    this.eventId = eventId;
    this.userId = userId;
    this.registrationType = registrationType;
    this.attended = attended;
    this.createdAt = createdAt;
  }
}
