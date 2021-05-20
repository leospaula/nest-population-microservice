import { NestFactory } from '@nestjs/core';
import { PopulationModule } from './population.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main:bootstrap:PopulationMicroservice');
  const app = await NestFactory.createMicroservice(PopulationModule, {
    transport: Transport.NATS,
    options: {
      queue: 'microservice',
      url: 'nats://localhost:4222',
    },
  });
  app.listen(() => logger.verbose('Microservice is listening...'));
}
bootstrap();