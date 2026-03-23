import { PartialType } from '@nestjs/mapped-types';
import { CreateReserveInspectorDto } from './create-reserve-inspector.dto';

export class UpdateReserveInspectorDto extends PartialType(
  CreateReserveInspectorDto,
) {}
