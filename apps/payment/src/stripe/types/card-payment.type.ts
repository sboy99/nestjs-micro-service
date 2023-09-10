export type TCurrency = 'usd' | 'inr';

export type TCardPayment = {
  paymentMethod: 'pm_card_visa';
  amount: number;
  currency: TCurrency;
};
