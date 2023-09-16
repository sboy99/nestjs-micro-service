import { z } from 'zod';

// .env variables
import { COOKIE_SECRET, HTTP_PORT, RABBITMQ_URI } from '@app/common/config';

export const ConfigValidationSchema = z.object({
  RABBITMQ_URI,
  COOKIE_SECRET,
  HTTP_PORT,
});

export type TConfig = z.infer<typeof ConfigValidationSchema>;
