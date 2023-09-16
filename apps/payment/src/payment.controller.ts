import { MessagePatterns } from '@app/common/enums';
import { ZodValidationPipe } from '@app/common/pipe';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateChargeDto, CreateChargeSchema } from './dto/create-charge.dto';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern(MessagePatterns.CREATE_CHARGE)
  async createCharge(
    @Payload(new ZodValidationPipe(CreateChargeSchema))
    createChargeDto: CreateChargeDto,
    @Ctx() ctx: RmqContext,
  ) {
    const channel = ctx.getChannelRef();
    const orginalMessage = ctx.getMessage();

    const paymentIntend = await this.paymentService.createCharge(
      createChargeDto,
    );

    // acknowledge
    channel.ack(orginalMessage);

    return paymentIntend;
  }
}
