import { Body, Controller, Get, Post } from '@nestjs/common';
import { WebhooksService, StatusResponse } from './webhooks.service';
import { NotifyWebhookPayload } from './webhooks.dto';

@Controller()
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Get('/status')
  async getServiceStatus(): Promise<StatusResponse> {
    return await this.webhooksService.getServiceStatus();
  }

  @Post('/notify')
  receiveNotifyWebhook(@Body() payload: NotifyWebhookPayload): void {
    this.webhooksService.handleNotifyWebhook(payload);
  }
}
