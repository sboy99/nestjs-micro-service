import { Test, TestingModule } from '@nestjs/testing';
import { PushGateway } from './push.gateway';
import { PushService } from './push.service';

describe('PushGateway', () => {
  let gateway: PushGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PushGateway, PushService],
    }).compile();

    gateway = module.get<PushGateway>(PushGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
