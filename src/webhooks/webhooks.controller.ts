import { Controller, Post, Body, Get } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { NotifyWebhookPayload } from './webhooks.dto';

interface StatusResponse {
  serviceName: string;
  gitHash: string;
  version: string;
}

@Controller()
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('/notify')
  async receiveNotifyWebhook(
    @Body() payload: NotifyWebhookPayload
  ): Promise<NotifyWebhookPayload> {
    return await this.webhooksService.handleNotifyWebhook(payload);
  }

  @Get('/status')
  async getServiceStatus(): Promise<StatusResponse> {
    return await {
      serviceName: process.env.npm_package_name,
      gitHash: process.env.npm_package_gitHead,
      version: process.env.npm_package_version
    };
  }
}
