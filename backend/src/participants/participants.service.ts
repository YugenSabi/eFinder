import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  create(createParticipantDto: CreateParticipantDto) {
    return { action: 'create', payload: createParticipantDto };
  }

  findAll() {
    return { items: [] };
  }

  findOne(id: number) {
    return { id };
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return { action: 'update', id, payload: updateParticipantDto };
  }

  remove(id: number) {
    return { action: 'remove', id };
  }
}
