import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { TConfig } from '../config';
import { TCardPayment } from './types';

@Injectable()
export class StripeService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET'),
    {
      apiVersion: '2023-08-16',
    },
  );

  constructor(private readonly configService: ConfigService<TConfig>) {}

  async createCard(card: Stripe.PaymentMethodCreateParams.Card1) {
    return this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });
  }

  async createCardPaymentIntent(payment: TCardPayment) {
    return this.stripe.paymentIntents.create({
      amount: payment.amount * 100,
      currency: payment.currency,
      payment_method: payment.paymentMethod,
      confirm: true,
      return_url: this.configService.get('STRIPE_RETURN_URL'),
    });
  }
}
