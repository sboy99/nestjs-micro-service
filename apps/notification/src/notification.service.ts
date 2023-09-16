import { EmailNotificationDto, PushNotificationDto } from '@app/common/dto';
import { Injectable } from '@nestjs/common';
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
