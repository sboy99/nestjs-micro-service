import { z } from 'zod';

// .env variables
import {
  AUTH_HOST,
  AUTH_PORT,
  COOKIE_SECRET,
  HTTP_PORT,
  MONGO_URI,
  PAYMENT_HOST,
  PAYMENT_PORT,
} from '@app/common/config';

export const ConfigValidationSchema = z.object({
  COOKIE_SECRET,
  MONGO_URI,
  HTTP_PORT,
  AUTH_HOST,
  AUTH_PORT,
  PAYMENT_HOST,
  PAYMENT_PORT,
});

export type TConfig = z.infer<typeof ConfigValidationSchema>;
