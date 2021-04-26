import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { CURRENT_SESSION } from './session';

const CurrentSessionProvider = {
  provide: CURRENT_SESSION,
  useFactory: (engine: EngineService) => {
    return engine.startNewSession({ headless: false });
  },
  inject: [EngineService],
};

@Module({
  controllers: [],
  providers: [
    EngineService,
    CurrentSessionProvider,
  ],
  exports: [
    EngineService,
    CurrentSessionProvider,
  ],
})
export class EngineModule {}
