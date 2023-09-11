import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationService {
  notifyUsingMail(notifyEmailDto: NotifyEmailDto) {
    console.log(notifyEmailDto);
  }
}
