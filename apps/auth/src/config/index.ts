import { z } from 'zod';

// .env variables
const MONGO_URI = z.string();
const PORT = z.coerce.number();

export const ConfigValidationSchema = z.object({
  PORT,
  MONGO_URI,
});

export type TConfig = z.infer<typeof ConfigValidationSchema>;
