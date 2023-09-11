import { z } from 'zod';

export const CreateChargeSchema = z.object({
  email: z.string().email(),
  amount: z.coerce.number(),
});

export type CreateChargeDto = Required<z.infer<typeof CreateChargeSchema>>;
