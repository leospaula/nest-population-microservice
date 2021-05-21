import { NestFactory } from '@nestjs/core';
import { PopulationModule } from './population.module';
import { Logger } from '@nestjs/common';
import { natsConfig } from './nats.config';

async function bootstrap() {
  const logger = new Logger('Main:bootstrap:PopulationMicroservice');
  const app = await NestFactory.createMicroservice(PopulationModule, natsConfig);

  app.listen(() => logger.verbose('Microservice is listening...'));
}
bootstrap();