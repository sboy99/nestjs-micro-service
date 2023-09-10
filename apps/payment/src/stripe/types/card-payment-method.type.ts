export type TCurrency = 'usd' | 'inr';

export type TCardPaymentMethod = {
  id: string;
  amount: number;
  currency: TCurrency;
};
