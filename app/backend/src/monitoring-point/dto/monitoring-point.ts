import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMonitoringPointDto {
  @IsString()
  name!: string;

  @IsInt()
  machineId!: number;

  @IsOptional()
  @IsInt()
  sensorId?: number;
}
