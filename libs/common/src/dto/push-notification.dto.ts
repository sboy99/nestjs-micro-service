import { z } from 'zod';

const userId = z.string();
const message = z.string();

export const PushNotificationSchema = z.object({
  userId,
  message,
});

export type PushNotificationDto = z.infer<typeof PushNotificationSchema>;
