import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateOrganizerProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(180)
  organizationName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1200)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  websiteUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  telegram?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  vkUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  logoUrl?: string;
}
