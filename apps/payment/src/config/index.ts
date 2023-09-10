import { z } from 'zod';

// .env variables
import {
  AUTH_HOST,
  AUTH_PORT,
  COOKIE_SECRET,
  MONGO_URI,
  STRIPE_SECRET,
  TCP_HOST,
  TCP_PORT,
} from '@app/common/config';

export const ConfigValidationSchema = z.object({
  MONGO_URI,
  COOKIE_SECRET,
  STRIPE_SECRET,
  TCP_HOST,
  TCP_PORT,
  AUTH_HOST,
  AUTH_PORT,
});

export type TConfig = z.infer<typeof ConfigValidationSchema>;
