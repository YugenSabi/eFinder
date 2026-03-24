import {UserRole} from '@prisma/client';
import {IsEnum} from 'class-validator';

export class UpdateOrganizerDto {
  @IsEnum(UserRole)
  role!: UserRole;
}
