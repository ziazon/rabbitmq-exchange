import { Module } from '@nestjs/common';
import { WebhooksModule } from './webhooks/webhooks.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, WebhooksModule]
})
export class AppModule {}
