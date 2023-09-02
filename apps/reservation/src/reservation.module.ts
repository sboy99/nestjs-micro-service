import { DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigValidationSchema } from './config';
import { ReservationModelDef } from './models/reservation.schema';
import { ReservationController } from './reservation.controller';
import { ReservationRepo } from './reservation.repo';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigValidationSchema,
      validate: (config) => ConfigValidationSchema.parse(config),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([ReservationModelDef]),
    LoggerModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationRepo],
})
export class ReservationModule {}
