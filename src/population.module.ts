import { Module, HttpModule } from '@nestjs/common';
import { PopulationController } from './population.controller';
import { PopulationService } from './population.service';

@Module({
  imports: [HttpModule],
  controllers: [PopulationController],
  providers: [PopulationService],
})
export class PopulationModule {}