import { Module } from '@nestjs/common';
import { EngineModule } from '@rezo-finder/engine/common';

import { OntarioParksService } from './ontario-parks.service';

@Module({
  controllers: [],
  imports: [EngineModule],
  providers: [OntarioParksService],
  exports: [OntarioParksService],
})
export class OntarioParksModule {}
