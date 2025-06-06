import { MachineType } from '@prisma/client';
import { IsEmail, IsEnum } from 'class-validator';

export class MachineDto {
  @IsEmail()
  name!: string;

  @IsEnum(MachineType, {
    message: `type must be one of: ${Object.values(MachineType).join(', ')}`,
  })
  type!: string;
}
