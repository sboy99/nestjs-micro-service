import { z } from 'zod';

// .env variables
import {
  AUTH_HOST,
  AUTH_PORT,
  COOKIE_SECRET,
  HTTP_PORT,
  MONGO_URI,
} from '@app/common/config';

export const ConfigValidationSchema = z.object({
  HTTP_PORT,
  AUTH_HOST,
  AUTH_PORT,
  MONGO_URI,
  COOKIE_SECRET,
});

export type TConfig = z.infer<typeof ConfigValidationSchema>;
