import { LoggerModule } from '@app/common';
import {
  AUTH_SERVICE,
  NOTIFICATION_SERVICE,
  Queues,
} from '@app/common/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigValidationSchema, TConfig } from './config';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    LoggerModule,
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
        {
          name: NOTIFICATION_SERVICE,
          imports: [ConfigModule],
          inject: [ConfigService<TConfig>],
          useFactory: (configService: ConfigService<TConfig>) => ({
            transport: Transport.RMQ,
            options: {
              urls: [configService.getOrThrow('RABBITMQ_URI') as string],
              queue: Queues.NOTIFICATION,
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
    StripeModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
