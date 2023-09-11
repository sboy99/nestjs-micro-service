import { NOTIFICATION_SERVICE } from '@app/common/constants';
import { NotifyEmailDto } from '@app/common/dto';
import { EventPatterns, MailTemplates } from '@app/common/enums';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateChargeDto } from './dto/create-charge.dto';
import { StripeService } from './stripe/stripe.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly stripeService: StripeService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}

  async createCharge(createChargeDto: CreateChargeDto) {
    const paymentIntend = await this.stripeService.createCardPaymentIntent({
      currency: 'inr',
      amount: createChargeDto.amount,
      paymentMethod: 'pm_card_visa',
    });

    // notify user
    this.notificationService.emit<unknown, NotifyEmailDto>(
      EventPatterns.NOTIFY_USING_MAIL,
      {
        email: createChargeDto.email,
        mailTemplate: MailTemplates.PAYMENT_SUCCESS,
      },
    );

    return paymentIntend;
  }
}
