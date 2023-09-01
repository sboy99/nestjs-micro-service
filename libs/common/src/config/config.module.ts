import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { ConfigValidationSchema } from './config.zod';

@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: ConfigValidationSchema,
      validate: (config) => ConfigValidationSchema.parse(config),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
