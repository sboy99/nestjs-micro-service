import { Injectable } from '@nestjs/common';
import { EmailNotificationDto } from './dto/email-notification.dto';
import { PushNotificationDto } from './dto/push-notification.dto';
import { PushGateway } from './push/push.gateway';

@Injectable()
export class NotificationService {
  constructor(private readonly pushGateway: PushGateway) {}

  sendMailNotification(emailNotificationDto: EmailNotificationDto) {
    console.log(emailNotificationDto);
  }

  sendPushNotification(pushNotificationDto: PushNotificationDto) {
    this.pushGateway.sendNotification(pushNotificationDto);
  }
}
