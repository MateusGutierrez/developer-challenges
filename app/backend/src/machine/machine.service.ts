import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MachineService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.MachineCreateInput) {
    return this.prisma.machine.create({ data });
  }

  findAll() {
    return this.prisma.machine.findMany();
  }

  findOne(id: number) {
    return this.prisma.machine.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.MachineUpdateInput) {
    const machine = await this.prisma.machine.findUnique({ where: { id } });
    if (!machine) throw new NotFoundException('Machine not found');

    return this.prisma.machine.update({ where: { id }, data });
  }

  async remove(id: number) {
    const machine = await this.prisma.machine.findUnique({ where: { id } });
    if (!machine) throw new NotFoundException('Machine not found');

    return this.prisma.machine.delete({ where: { id } });
  }
}
