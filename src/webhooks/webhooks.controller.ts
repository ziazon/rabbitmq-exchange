import { Body, Controller, Post } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { NotifyWebhookPayload } from './webhooks.dto';

@Controller()
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('/notify')
  receiveNotifyWebhook(@Body() payload: NotifyWebhookPayload): void {
    this.webhooksService.handleNotifyWebhook(payload);
  }
}
