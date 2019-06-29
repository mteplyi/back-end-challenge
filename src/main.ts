import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { mainConfig } from './config';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(mainConfig.appPort, '0.0.0.0');
}

bootstrap();
