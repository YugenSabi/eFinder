import { Injectable } from '@nestjs/common';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Injectable()
export class ParticipationsService {
  create(createParticipationDto: CreateParticipationDto) {
    return { action: 'create', payload: createParticipationDto };
  }

  findAll() {
    return { items: [] };
  }

  findOne(id: number) {
    return { id };
  }

  update(id: number, updateParticipationDto: UpdateParticipationDto) {
    return { action: 'update', id, payload: updateParticipationDto };
  }

  remove(id: number) {
    return { action: 'remove', id };
  }
}
