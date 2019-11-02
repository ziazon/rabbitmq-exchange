import { ConfigService } from '../config/config.service';
import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.rmqUrl,
        exchanges: [
          {
            name: configService.rmqExchange,
            type: 'topic'
          }
        ]
      }),
      inject: [ConfigService],
      imports: []
    })
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService]
})
export class WebhooksModule {}
