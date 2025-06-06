import { IsEnum, IsInt, IsString } from 'class-validator';
import { SensorModel } from '@prisma/client';

export class CreateSensorDto {
  @IsString()
  uid!: string;

  @IsEnum(SensorModel)
  model!: SensorModel;

  @IsInt()
  monitoringPointId!: number;
}
