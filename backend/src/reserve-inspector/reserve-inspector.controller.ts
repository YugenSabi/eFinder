import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReserveInspectorService } from './reserve-inspector.service';
import { CreateReserveInspectorDto } from './dto/create-reserve-inspector.dto';
import { UpdateReserveInspectorDto } from './dto/update-reserve-inspector.dto';

@Controller('reserve-inspector')
export class ReserveInspectorController {
  constructor(
    private readonly reserveInspectorService: ReserveInspectorService,
  ) {}

  @Post()
  create(@Body() createReserveInspectorDto: CreateReserveInspectorDto) {
    return this.reserveInspectorService.create(createReserveInspectorDto);
  }

  @Get()
  findAll() {
    return this.reserveInspectorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveInspectorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReserveInspectorDto: UpdateReserveInspectorDto,
  ) {
    return this.reserveInspectorService.update(+id, updateReserveInspectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reserveInspectorService.remove(+id);
  }
}
