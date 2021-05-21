import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  NatsContext,
  ClientProxy, 
  Client
} from '@nestjs/microservices';
import { PopulationService } from './population.service';
import { lastValueFrom } from 'rxjs';
import { natsConfig } from './nats.config';

@Controller()
export class PopulationController {
  constructor(private readonly populationService: PopulationService) {}

  @Client(natsConfig)

  client: ClientProxy;

  @MessagePattern('get-population')
  async getPopulation(@Payload() data: any, @Ctx() context: NatsContext) {
    let stateCode = null
    if (data.code) {
      stateCode = data.code
    } else {
      const state = await lastValueFrom(this.client.send('get-states', { uf: data.uf }))
      stateCode = state.code
    }
    
    const population = await this.populationService.getPopulationData(stateCode)
    return { uf: data.uf.toUpperCase(), populacao: population };
  }
}