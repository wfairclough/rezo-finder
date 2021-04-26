import { Module } from '@nestjs/common';
import { EngineModule } from '@rezo-finder/engine/common';
import { OntarioParksModule } from '@rezo-finder/engine/ontario-parks';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    EngineModule,
    OntarioParksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
