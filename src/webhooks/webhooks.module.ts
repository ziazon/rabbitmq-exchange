import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      useFactory: async () => {
        const config = ConfigService.setup();
        return {
          uri: config.rmqUrl,
          exchanges: [
            {
              name: config.rmqExchange,
              type: 'topic'
            }
          ]
        };
      }
    })
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService]
})
export class WebhooksModule {}
