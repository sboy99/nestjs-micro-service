import { z } from 'zod';

// .env variables
import {
  COOKIE_SECRET,
  HTTP_PORT,
  JWT_EXPIRATION,
  JWT_SECRET,
  MONGO_URI,
  TCP_HOST,
  TCP_PORT,
} from '@app/common/config';

export const ConfigValidationSchema = z.object({
  HTTP_PORT,
  TCP_HOST,
  TCP_PORT,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRATION,
  COOKIE_SECRET,
});

export type TConfig = z.infer<typeof ConfigValidationSchema>;
