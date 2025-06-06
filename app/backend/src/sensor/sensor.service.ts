// sensor.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSensorDto } from './dto/sensor';

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSensorDto) {
    return this.prisma.sensor.create({
      data: {
        uid: dto.uid,
        model: dto.model,
        monitoringPoint: { connect: { id: dto.monitoringPointId } },
      },
      include: { monitoringPoint: true },
    });
  }

  async findAll() {
    return this.prisma.sensor.findMany({
      include: { monitoringPoint: true },
    });
  }

  async findOne(id: number) {
    const sensor = await this.prisma.sensor.findUnique({
      where: { id },
      include: { monitoringPoint: true },
    });
    if (!sensor) throw new NotFoundException(`Sensor ${id} não encontrado`);
    return sensor;
  }

  async update(id: number, dto: Partial<CreateSensorDto>) {
    return this.prisma.sensor.update({
      where: { id },
      data: {
        ...(dto.uid && { uid: dto.uid }),
        ...(dto.model && { model: dto.model }),
        ...(dto.monitoringPointId && {
          monitoringPoint: { connect: { id: dto.monitoringPointId } },
        }),
      },
      include: { monitoringPoint: true },
    });
  }

  async remove(id: number) {
    await this.prisma.sensor.delete({ where: { id } });
    return { message: 'Sensor removido com sucesso' };
  }
}
