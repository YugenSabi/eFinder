import { OrganizerProfileStatus } from '@prisma/client';
import {IsEnum} from 'class-validator';

export class UpdateOrganizerDto {
  @IsEnum(OrganizerProfileStatus)
  status!: OrganizerProfileStatus;
}
