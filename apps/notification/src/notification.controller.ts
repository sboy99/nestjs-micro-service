import { EventPatterns } from '@app/common/enums';
import { ZodValidationPipe } from '@app/common/pipe';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto, NotifyEmailSchema } from './dto/notify-email.dto';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(EventPatterns.NOTIFY_USING_MAIL)
  async notifyUsingMail(
    @Payload(new ZodValidationPipe(NotifyEmailSchema))
    notifyEmailDto: NotifyEmailDto,
  ) {
    return this.notificationService.notifyUsingMail(notifyEmailDto);
  }
}
