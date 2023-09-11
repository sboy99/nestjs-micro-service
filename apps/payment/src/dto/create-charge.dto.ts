import { z } from 'zod';

export const CreateChargeSchema = z.object({
  email: z.string().email(),
  amount: z.coerce.number(),
});

export type CreateChargeDto = z.infer<typeof CreateChargeSchema>;
