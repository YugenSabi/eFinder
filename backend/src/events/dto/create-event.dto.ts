import {
  EventDifficulty,
  EventDirection,
} from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import {Type} from 'class-transformer';

export class CreateEventRewardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsInt()
  @Min(0)
  points!: number;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description!: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  city?: string;

  @IsEnum(EventDirection)
  direction!: EventDirection;

  @IsEnum(EventDifficulty)
  difficulty!: EventDifficulty;

  @IsDateString()
  startsAt!: string;

  @IsOptional()
  @IsDateString()
  endsAt?: string;

  @IsInt()
  @Min(0)
  basePoints!: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  difficultyFactor?: number;

  @IsOptional()
  @IsString()
  @MaxLength(600)
  rewardSummary?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  imageUrl?: string;

  @IsOptional()
  @IsString()
  organizerId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => CreateEventRewardDto)
  rewards?: CreateEventRewardDto[];
}
