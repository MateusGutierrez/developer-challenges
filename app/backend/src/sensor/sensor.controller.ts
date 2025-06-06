// sensor.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/sensor';

@Controller('sensors')
export class SensorController {
  constructor(private readonly service: SensorService) {}

  @Post()
  create(@Body() dto: CreateSensorDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateSensorDto>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
