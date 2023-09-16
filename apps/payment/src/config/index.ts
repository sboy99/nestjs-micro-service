import { z } from 'zod';

// .env variables
import {
  COOKIE_SECRET,
  MONGO_URI,
  RABBITMQ_URI,
  STRIPE_RETURN_URL,
  STRIPE_SECRET,
} from '@app/common/config';

export const ConfigValidationSchema = z.object({
  MONGO_URI,
  RABBITMQ_URI,
  COOKIE_SECRET,
  STRIPE_SECRET,
  STRIPE_RETURN_URL,
});

export type TConfig = z.infer<typeof ConfigValidationSchema>;
