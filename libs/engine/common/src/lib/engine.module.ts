import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { CURRENT_SESSION, SESSION_FACTORY } from './session';

const CurrentSessionProvider = {
  provide: CURRENT_SESSION,
  useFactory: (engine: EngineService) => {
    return engine.startNewSession({ headless: true });
  },
  inject: [EngineService],
};

const SessionFactoryProvider = {
  provide: SESSION_FACTORY,
  useFactory: (engine: EngineService) => {
    return () => engine.startNewSession({ headless: false });
  },
  inject: [EngineService],
};

@Module({
  controllers: [],
  providers: [
    EngineService,
    CurrentSessionProvider,
    SessionFactoryProvider,
  ],
  exports: [
    EngineService,
    CurrentSessionProvider,
    SessionFactoryProvider,
  ],
})
export class EngineModule {}
