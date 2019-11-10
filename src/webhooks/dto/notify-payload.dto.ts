import { IsString } from 'class-validator';

export class NotifyWebhookPayload {
  @IsString()
  readonly topic: string;

  @IsString()
  readonly message: string;
}
