import { Queues } from '@app/common/constants';
import { AllExceptionsFilter } from '@app/common/filters';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { TConfig } from './config';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);

  // config
  const configService = app.get<ConfigService<TConfig>>(ConfigService);

  // exception handler
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // logger
  app.useLogger(app.get(Logger));

  // cookie
  const cookieSecret = configService.get('COOKIE_SECRET');
  app.use(cookieParser(cookieSecret));

  // micro services
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: Queues.PAYMENT,
      noAck: false,
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
