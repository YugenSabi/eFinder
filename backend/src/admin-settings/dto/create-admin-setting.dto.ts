import {
  EventDifficulty,
  EventDirection,
} from '@prisma/client';
import {Type} from 'class-transformer';
import {
  IsArray,
  IsEnum,
  Min,
  ValidateNested,
} from 'class-validator';

export class ScoreWeightItemDto {
  @IsEnum(EventDirection)
  direction!: EventDirection;

  @IsEnum(EventDifficulty)
  difficulty!: EventDifficulty;

  @Type(() => Number)
  @Min(0)
  weight!: number;
}

export class CreateAdminSettingDto {
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => ScoreWeightItemDto)
  items!: ScoreWeightItemDto[];
}
