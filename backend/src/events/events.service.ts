import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  create(createEventDto: CreateEventDto) {
    return { action: 'create', payload: createEventDto };
  }

  findAll() {
    return { items: [] };
  }

  findOne(id: number) {
    return { id };
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return { action: 'update', id, payload: updateEventDto };
  }

  remove(id: number) {
    return { action: 'remove', id };
  }
}
