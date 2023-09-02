import { AllExceptionsFilter } from '@app/common/filters';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ReservationModule } from './reservation.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
