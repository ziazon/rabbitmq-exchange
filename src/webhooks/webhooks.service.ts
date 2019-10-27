import { Injectable } from '@nestjs/common';
import { NotifyWebhookPayload } from './webhooks.dto';

@Injectable()
export class WebhooksService {
  handleNotifyWebhook(payload: NotifyWebhookPayload): NotifyWebhookPayload {
    return payload;
  }
}
