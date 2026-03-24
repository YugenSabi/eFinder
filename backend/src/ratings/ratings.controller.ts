import { Controller, Get, Query } from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get()
  findAll(@Query('limit') limit?: string, @Query('search') search?: string) {
    return this.ratingsService.findAll(limit ? Number(limit) : undefined, search);
  }
}
