import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class CompleteEventWinnerDto {
  @IsString()
  participantId!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(3)
  place!: number;
}

export class CompleteEventDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => CompleteEventWinnerDto)
  winners!: CompleteEventWinnerDto[];
}
