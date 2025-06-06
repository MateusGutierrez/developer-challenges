// monitoring-point.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMonitoringPointDto } from './dto/monitoring-point';

@Injectable()
export class MonitoringPointService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMonitoringPointDto) {
    return this.prisma.monitoringPoint.create({
      data: {
        name: dto.name,
        machine: { connect: { id: dto.machineId } },
        ...(dto.sensorId && { sensor: { connect: { id: dto.sensorId } } }),
      },
      include: { machine: true, sensor: true },
    });
  }

  async findAll() {
    return this.prisma.monitoringPoint.findMany({
      include: { machine: true, sensor: true },
    });
  }

  async findOne(id: number) {
    const mp = await this.prisma.monitoringPoint.findUnique({
      where: { id },
      include: { machine: true, sensor: true },
    });
    if (!mp) throw new NotFoundException(`MonitoringPoint #${id} não encontrado`);
    return mp;
  }

  async update(id: number, dto: Partial<CreateMonitoringPointDto>) {
    return this.prisma.monitoringPoint.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.machineId && { machine: { connect: { id: dto.machineId } } }),
        ...(dto.sensorId !== undefined && {
          sensor: dto.sensorId ? { connect: { id: dto.sensorId } } : { disconnect: true }, // passar null remove associação
        }),
      },
      include: { machine: true, sensor: true },
    });
  }

  async remove(id: number) {
    await this.prisma.monitoringPoint.delete({ where: { id } });
    return { message: 'MonitoringPoint removido com sucesso' };
  }
}
