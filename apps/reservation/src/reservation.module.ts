import { DatabaseModule, LoggerModule } from '@app/common';
import { AUTH_SERVICE } from '@app/common/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigValidationSchema, TConfig } from './config';
import { ReservationModelDef } from './models/reservation.schema';
import { ReservationController } from './reservation.controller';
import { ReservationRepo } from './reservation.repo';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: AUTH_SERVICE,
          imports: [ConfigModule],
          inject: [ConfigService<TConfig>],
          useFactory: (configService: ConfigService<TConfig>) => ({
            transport: Transport.TCP,
            options: {
              host: configService.get('AUTH_HOST'),
              port: configService.get('AUTH_PORT'),
            },
          }),
        },
      ],
    }),
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
