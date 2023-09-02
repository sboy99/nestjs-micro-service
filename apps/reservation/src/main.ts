import { AllExceptionsFilter } from '@app/common/filters';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { ReservationModule } from './reservation.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // logger
  app.useLogger(app.get(Logger));

  await app.listen(3000);
}
bootstrap();
