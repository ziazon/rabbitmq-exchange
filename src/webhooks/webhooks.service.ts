import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { ConfigService } from '../config/config.service';
import { Injectable } from '@nestjs/common';
import { NotifyWebhookPayload } from './webhooks.dto';

export interface StatusResponse {
  serviceName: string;
  gitHash: string;
  version: string;
}

@Injectable()
export class WebhooksService {
  constructor(
    private readonly config: ConfigService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  handleNotifyWebhook(payload: NotifyWebhookPayload): void {
    const { topic, message } = payload;
    this.amqpConnection.publish(this.config.rmqExchange, topic, message);
  }
}
