import { Module } from '@nestjs/common';
import { PushGateway } from './push.gateway';
import { PushService } from './push.service';

@Module({
  providers: [PushGateway, PushService],
  exports: [PushService, PushGateway],
})
export class PushModule {}
