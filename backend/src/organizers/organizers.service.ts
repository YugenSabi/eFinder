import { Injectable } from '@nestjs/common';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';

@Injectable()
export class OrganizersService {
  create(createOrganizerDto: CreateOrganizerDto) {
    return { action: 'create', payload: createOrganizerDto };
  }

  findAll() {
    return { items: [] };
  }

  findOne(id: number) {
    return { id };
  }

  update(id: number, updateOrganizerDto: UpdateOrganizerDto) {
    return { action: 'update', id, payload: updateOrganizerDto };
  }

  remove(id: number) {
    return { action: 'remove', id };
  }
}
