import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { MachineModule } from './machine/machine.module';
import { MonitoringPointModule } from './monitoring-point/monitoring-point.module';
import { SensorModule } from './sensor/sensor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    MachineModule,
    MonitoringPointModule,
    SensorModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
