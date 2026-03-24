import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ListObserverParticipantsDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  ageFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  ageTo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  eventsFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  eventsTo?: number;

  @IsOptional()
  @Type(() => Number)
  averageScoreFrom?: number;

  @IsOptional()
  @Type(() => Number)
  averageScoreTo?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  favoritesOnly?: boolean;
}
