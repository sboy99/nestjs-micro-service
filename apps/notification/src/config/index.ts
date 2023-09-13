import { z } from 'zod';

// .env variables
import {
  AUTH_HOST,
  AUTH_PORT,
  COOKIE_SECRET,
  HTTP_PORT,
  TCP_HOST,
  TCP_PORT,
} from '@app/common/config';

export const ConfigValidationSchema = z.object({
  COOKIE_SECRET,
  TCP_HOST,
  TCP_PORT,
  AUTH_HOST,
  AUTH_PORT,
  HTTP_PORT,
});

export type TConfig = z.infer<typeof ConfigValidationSchema>;
