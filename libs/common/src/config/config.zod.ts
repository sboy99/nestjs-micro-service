import { z } from 'zod';

// .env variables
const MONGO_URI = z.string();

export const ConfigValidationSchema = z.object({
  MONGO_URI,
});

export type TConfig = z.infer<typeof ConfigValidationSchema>;
