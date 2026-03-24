import { ParticipationStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class ReviewParticipationDto {
  @IsEnum(ParticipationStatus)
  status!: ParticipationStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  organizerComment?: string;
}
