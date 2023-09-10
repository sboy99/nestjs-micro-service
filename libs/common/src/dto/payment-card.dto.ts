import { z } from 'zod';

const cvc = z.string();
const exp_month = z.coerce.number();
const exp_year = z.coerce.number();
const number = z.string();

export const PaymentCardSchema = z.object({
  cvc,
  exp_month,
  exp_year,
  number,
});
