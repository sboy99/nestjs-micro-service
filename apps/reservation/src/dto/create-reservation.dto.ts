import { z } from 'zod';

const amount = z.coerce.number();
const startDate = z.coerce.date();
const endDate = z.coerce.date();

export const CreateReservationSchema = z.object({
  startDate,
  endDate,
  amount,
});

export type CreateReservationDto = Required<
  z.infer<typeof CreateReservationSchema>
>;
