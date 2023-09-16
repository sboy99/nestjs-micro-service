import { MailTemplates } from '@app/common/enums';
import { z } from 'zod';

const email = z.string().email();
const mailTemplate = z.enum([MailTemplates.PAYMENT_SUCCESS]);

export const EmailNotificationSchema = z.object({
  email,
  mailTemplate,
});

export type EmailNotificationDto = z.infer<typeof EmailNotificationSchema>;
