import { mongoObjectId } from '@app/utils/zod-utilts';
import { z } from 'zod';

const userId = mongoObjectId;
const amount = z.coerce.number();
const startDate = z.string().transform((arg) => new Date(arg));
const endDate = z.string().transform((arg) => new Date(arg));

export const CreateReservationSchema = z.object({
  userId,
  startDate,
  endDate,
  amount,
});

export type CreateReservationDto = Required<
  z.infer<typeof CreateReservationSchema>
>;
