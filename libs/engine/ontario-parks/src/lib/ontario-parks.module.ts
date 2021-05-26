import { Module } from '@nestjs/common';
import { EngineModule, GotModule } from '@rezo-finder/engine/common';

import { OntarioParksService } from './ontario-parks.service';

@Module({
  controllers: [],
  imports: [EngineModule, GotModule],
  providers: [OntarioParksService],
  exports: [OntarioParksService],
})
export class OntarioParksModule {}
