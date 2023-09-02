import { AllExceptionsFilter } from '@app/common/filters';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AuthModule } from './auth.module';
import { TConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // logger
  app.useLogger(app.get(Logger));

  // port
  const configService = app.get(ConfigService<TConfig>);
  const port= configService.get('PORT') ?? 3001
  await app.listen(port);
}
bootstrap();
