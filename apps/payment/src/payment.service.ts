import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from './dto/create-charge.dto';
import { StripeService } from './stripe/stripe.service';

@Injectable()
export class PaymentService {
  constructor(private readonly stripeService: StripeService) {}

  async createCharge(createChargeDto: CreateChargeDto) {
    const paymentIntend = await this.stripeService.createCardPaymentIntent({
      currency: 'inr',
      amount: createChargeDto.amount,
      paymentMethod: 'pm_card_visa',
    });

    return paymentIntend;
  }
}
