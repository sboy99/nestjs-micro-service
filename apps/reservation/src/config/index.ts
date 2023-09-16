import { z } from 'zod';

// .env variables
import {
  COOKIE_SECRET,
  HTTP_PORT,
  MONGO_URI,
  RABBITMQ_URI,
} from '@app/common/config';

export const ConfigValidationSchema = z.object({
  COOKIE_SECRET,
  MONGO_URI,
  HTTP_PORT,
  RABBITMQ_URI,
});

export type TConfig = z.infer<typeof ConfigValidationSchema>;
