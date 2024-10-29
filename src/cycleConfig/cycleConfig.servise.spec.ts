import { Test, TestingModule } from '@nestjs/testing';
import { CycleConfigService } from './cycleConfig.service';

describe('CycleConfigService', () => {
  let service: CycleConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CycleConfigService],
    }).compile();

    service = module.get<CycleConfigService>(CycleConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
