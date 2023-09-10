import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from './dto/create-charge.dto';
import { StripeService } from './stripe/stripe.service';

@Injectable()
export class PaymentService {
  constructor(private readonly stripeService: StripeService) {}

  async createCharge(createChargeDto: CreateChargeDto) {
    const paymentMethod = await this.stripeService.createCard(
      createChargeDto.card,
    );

    const paymentIntend = await this.stripeService.createCardPaymentIntent({
      id: paymentMethod.id,
      currency: 'inr',
      amount: createChargeDto.amount,
    });

    return paymentIntend;
  }
}
