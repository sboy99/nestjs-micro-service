import { mongoObjectId } from '@app/utils/zod-utilts';
import { z } from 'zod';

const userId = mongoObjectId;
const placeId = mongoObjectId;
const invoiceId = mongoObjectId;
const startDate = z.string().transform((arg) => new Date(arg));
const endDate = z.string().transform((arg) => new Date(arg));

export const CreateReservationSchema = z.object({
  userId,
  placeId,
  invoiceId,
  startDate,
  endDate,
});

export type CreateReservationDto = Required<
  z.infer<typeof CreateReservationSchema>
>;
