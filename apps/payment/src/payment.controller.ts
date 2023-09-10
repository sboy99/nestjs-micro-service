import { MessagePatterns } from '@app/common/enums';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from './dto/create-charge.dto';
import { PaymentService } from './payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern(MessagePatterns.CREATE_CHARGE)
  async createCharge(@Payload() createChargeDto: CreateChargeDto) {
    const paymentIntend = await this.paymentService.createCharge(
      createChargeDto,
    );
    return paymentIntend;
  }
}
