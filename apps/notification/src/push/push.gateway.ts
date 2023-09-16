import { PushNotificationDto } from '@app/common/dto';
import { SocketEvents } from '@app/common/enums';
import { Logger, OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PushService } from './push.service';

@WebSocketGateway()
export class PushGateway implements OnModuleInit {
  @WebSocketServer()
  private readonly server: Server;
  private readonly logger = new Logger('PushNotification');

  onModuleInit() {
    this.server.on('connect', (socket) => {
      this.logger.log(`New connection : ${socket.id}`);
    });

    this.server.on('disconnect', (socket) => {
      console.log(`${socket.id} disconnected`);
    });
  }

  constructor(private readonly pushService: PushService) {}

  // send push notification
  async sendNotification(payload: PushNotificationDto) {
    this.server.emit(
      `${SocketEvents.PUSH_NOTIFICATION}:${payload.userId}`,
      payload.message,
    );

    this.logger.log(`Push notification sent to ${payload.userId}`);
  }
}
