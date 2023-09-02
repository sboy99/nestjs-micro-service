import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, TConfig } from '../config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<TConfig>) => ({
        uri: configService.get('MONGO_URI'),
      }),
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models?: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
