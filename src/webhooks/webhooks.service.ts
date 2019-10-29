import { Injectable } from '@nestjs/common';
import { NotifyWebhookPayload } from './webhooks.dto';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';

import { ConfigService } from '../config/config.service';

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

  getServiceStatus(): StatusResponse {
    return {
      serviceName: this.config.serviceName,
      gitHash: this.config.gitHash,
      version: this.config.serviceVersion
    };
  }

  handleNotifyWebhook(payload: NotifyWebhookPayload): void {
    const { topic, message } = payload;
    this.amqpConnection.publish(this.config.rmqExchange, topic, message);
  }
}
