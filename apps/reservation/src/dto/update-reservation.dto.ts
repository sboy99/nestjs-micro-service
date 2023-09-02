import { mongoObjectId } from '@app/utils/zod-utilts';
import { z } from 'zod';

const userId = mongoObjectId.optional();
const placeId = mongoObjectId.optional();

export const UpdateReservationSchema = z.object({
  userId,
  placeId,
});

export type UpdateReservationDto = z.infer<typeof UpdateReservationSchema>;
