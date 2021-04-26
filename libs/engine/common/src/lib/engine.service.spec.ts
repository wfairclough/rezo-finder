import { Test } from '@nestjs/testing';
import { EngineService } from './engine.service';

describe('EngineService', () => {
  let service: EngineService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EngineService],
    }).compile();

    service = module.get(EngineService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
