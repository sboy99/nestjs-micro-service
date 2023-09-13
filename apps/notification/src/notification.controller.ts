import { EventPatterns } from '@app/common/enums';
import { ZodValidationPipe } from '@app/common/pipe';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  EmailNotificationDto,
  EmailNotificationSchema,
} from './dto/email-notification.dto';
import {
  PushNotificationDto,
  PushNotificationSchema,
} from './dto/push-notification.dto';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(EventPatterns.EMAIL_NOTIFICATION)
  async sendMailNotification(
    @Payload(new ZodValidationPipe(EmailNotificationSchema))
    emailNotificationDto: EmailNotificationDto,
  ) {
    return this.notificationService.sendMailNotification(emailNotificationDto);
  }

  @EventPattern(EventPatterns.PUSH_NOTIFICATION)
  async sendPushNotification(
    @Payload(new ZodValidationPipe(PushNotificationSchema))
    pushNotificationDto: PushNotificationDto,
  ) {
    return this.notificationService.sendPushNotification(pushNotificationDto);
  }
}
