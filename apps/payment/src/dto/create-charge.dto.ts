import { z } from 'zod';

export const CreateChargeSchema = z.object({
  amount: z.coerce.number(),
});

export type CreateChargeDto = z.infer<typeof CreateChargeSchema>;
