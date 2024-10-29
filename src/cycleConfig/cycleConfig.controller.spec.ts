import { Test, TestingModule } from '@nestjs/testing';
import { CycleConfigController } from './cycleConfig.controller';

describe('CycleConfigController', () => {
  let controller: CycleConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CycleConfigController],
    }).compile();

    controller = module.get<CycleConfigController>(CycleConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
