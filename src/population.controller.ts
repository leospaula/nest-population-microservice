import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  NatsContext,
  ClientProxy, 
  Client, 
  Transport
} from '@nestjs/microservices';
import { PopulationService } from './population.service';
import { lastValueFrom } from 'rxjs';

@Controller()
export class PopulationController {
  constructor(private readonly populationService: PopulationService) {}

  @Client({
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
    },
  })
  client: ClientProxy;

  @MessagePattern('get-population')
  async getPopulation(@Payload() data: any, @Ctx() context: NatsContext) {
    const state = await lastValueFrom(this.client.send('get-states', { uf: data.uf }))
    const population = await this.populationService.getPopulationData(state.code)
    return { uf: data.uf.toUpperCase(), populacao: population };
  }
}