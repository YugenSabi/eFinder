import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateMeDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  firstName?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  lastName?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  age?: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  city?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  headline?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  school?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  telegram?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  githubUrl?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  behanceUrl?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  vkUrl?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  avatarUrl?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  portfolioSummary?: string | null;
}
