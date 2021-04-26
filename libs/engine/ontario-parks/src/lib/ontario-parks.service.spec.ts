import { Test } from '@nestjs/testing';
import { EngineOntarioParksService } from './engine-ontario-parks.service';

describe('EngineOntarioParksService', () => {
  let service: EngineOntarioParksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EngineOntarioParksService],
    }).compile();

    service = module.get(EngineOntarioParksService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
