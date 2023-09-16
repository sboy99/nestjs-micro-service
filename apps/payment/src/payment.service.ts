import { NOTIFICATION_SERVICE } from '@app/common/constants';
import {
  CreateChargeDto,
  EmailNotificationDto,
  PushNotificationDto,
} from '@app/common/dto';
import { EventPatterns, MailTemplates } from '@app/common/enums';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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

    // send email notification
    this.notificationService.emit<unknown, EmailNotificationDto>(
      EventPatterns.EMAIL_NOTIFICATION,
      {
        email: createChargeDto.email,
        mailTemplate: MailTemplates.PAYMENT_SUCCESS,
      },
    );

    // send push notification
    this.notificationService.emit<unknown, PushNotificationDto>(
      EventPatterns.PUSH_NOTIFICATION,
      {
        userId: createChargeDto.userId,
        message: `Payment Rs:${createChargeDto.amount} was successful`,
      },
    );
    return paymentIntend;
  }
}
