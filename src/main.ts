import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import { WebhooksModule } from './webhooks/webhooks.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    WebhooksModule,
    new FastifyAdapter()
  );
  await app.listen(3000);
}
bootstrap();
