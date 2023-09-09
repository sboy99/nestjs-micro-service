import { LoggerModule } from '@app/common';
import { AUTH_SERVICE } from '@app/common/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigValidationSchema, TConfig } from './config';
import { JwtStrategy } from './strategies';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigValidationSchema,
      validate: (config) => ConfigValidationSchema.parse(config),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<TConfig>) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
    }),
    LoggerModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
