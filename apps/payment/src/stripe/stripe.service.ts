import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { TConfig } from '../config';
import { TCardPaymentMethod } from './types';

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

  async createCardPaymentIntent(paymentMethod: TCardPaymentMethod) {
    return this.stripe.paymentIntents.create({
      amount: paymentMethod.amount * 100,
      currency: paymentMethod.currency,
      payment_method: paymentMethod.id,
      payment_method_types: ['card'],
      confirm: true,
    });
  }
}
