import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingsService {
  create(createRatingDto: CreateRatingDto) {
    return { action: 'create', payload: createRatingDto };
  }

  findAll() {
    return { items: [] };
  }

  findOne(id: number) {
    return { id };
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return { action: 'update', id, payload: updateRatingDto };
  }

  remove(id: number) {
    return { action: 'remove', id };
  }
}
