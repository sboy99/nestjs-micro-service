import { LoggerModule } from '@app/common';
import { AUTH_SERVICE, Queues } from '@app/common/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigValidationSchema, TConfig } from './config';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PushModule } from './push/push.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigValidationSchema,
      validate: (config) => ConfigValidationSchema.parse(config),
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: AUTH_SERVICE,
          imports: [ConfigModule],
          inject: [ConfigService<TConfig>],
          useFactory: (configService: ConfigService<TConfig>) => ({
            transport: Transport.RMQ,
            options: {
              urls: [configService.getOrThrow('RABBITMQ_URI') as string],
              queue: Queues.AUTH,
            },
          }),
        },
      ],
    }),
    PushModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
