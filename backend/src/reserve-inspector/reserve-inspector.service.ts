import { Injectable } from '@nestjs/common';
import { CreateReserveInspectorDto } from './dto/create-reserve-inspector.dto';
import { UpdateReserveInspectorDto } from './dto/update-reserve-inspector.dto';

@Injectable()
export class ReserveInspectorService {
  create(createReserveInspectorDto: CreateReserveInspectorDto) {
    return { action: 'create', payload: createReserveInspectorDto };
  }

  findAll() {
    return { items: [] };
  }

  findOne(id: number) {
    return { id };
  }

  update(id: number, updateReserveInspectorDto: UpdateReserveInspectorDto) {
    return { action: 'update', id, payload: updateReserveInspectorDto };
  }

  remove(id: number) {
    return { action: 'remove', id };
  }
}
