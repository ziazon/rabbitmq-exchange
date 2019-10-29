import { Controller, Injectable, Post, Body, Get } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { NotifyWebhookPayload } from './webhooks.dto';
import { ConfigService } from '../config/config.service';

interface StatusResponse {
  serviceName: string;
  gitHash: string;
  version: string;
}

@Injectable()
@Controller()
export class WebhooksController {
  constructor(
    private readonly config: ConfigService,
    private readonly webhooksService: WebhooksService
  ) {}

  @Post('/notify')
  async receiveNotifyWebhook(
    @Body() payload: NotifyWebhookPayload
  ): Promise<NotifyWebhookPayload> {
    return await this.webhooksService.handleNotifyWebhook(payload);
  }

  @Get('/status')
  async getServiceStatus(): Promise<StatusResponse> {
    return await {
      serviceName: this.config.serviceName,
      gitHash: this.config.gitHash,
      version: this.config.serviceVersion
    };
  }
}
