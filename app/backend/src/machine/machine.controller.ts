import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { MachineService } from './machine.service';
import { Prisma } from '@prisma/client';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post()
  create(@Body() machineDto: Prisma.MachineCreateInput) {
    return this.machineService.create(machineDto);
  }

  @Get()
  findAll() {
    return this.machineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.machineService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() machineDto: Prisma.MachineUpdateInput) {
    return this.machineService.update(id, machineDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.machineService.remove(id);
  }
}
