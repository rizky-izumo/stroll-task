import { Module } from '@nestjs/common';
import { CycleConfigService } from './cycleConfig.service';
import { CycleConfigController } from './cycleConfig.controller';

@Module({
  controllers: [CycleConfigController],
  providers: [CycleConfigService],
})
export class CycleConfigModule {}
