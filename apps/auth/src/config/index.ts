import { z } from 'zod';

// .env variables
const MONGO_URI = z.string();
const PORT = z.coerce.number();
const JWT_SECRET = z.string();
const JWT_EXPIRATION = z.string();

export const ConfigValidationSchema = z.object({
  PORT,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRATION,
});

export type TConfig = z.infer<typeof ConfigValidationSchema>;
