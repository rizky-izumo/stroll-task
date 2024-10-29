import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { CycleConfigModel } from 'src/database/models/cycleConfig.model';
import { CycleConfigInterface } from './interface/cycleConfig.interface';
import { insertCycle } from './dto/insertCycle.dto';
import { updateCycle } from './dto/updateCycle.dto';

@Injectable()
export class CycleConfigService {
  constructor(
    @Inject('CycleConfigModel')
    private CycleConfigClass: ModelClass<CycleConfigModel>,
  ) {}

  //fetch all cycle config
  async fetchAllConfig(): Promise<CycleConfigInterface[]> {
    const configs = await this.CycleConfigClass.query();
    return configs;
  }

  //fetch cycle config by id
  async fetchConfigById(configId: number): Promise<CycleConfigInterface> {
    const config = await this.CycleConfigClass.query().findOne({
      id: configId,
    });
    return config;
  }

  //create cycle config
  async createConfig(newCycle: insertCycle): Promise<CycleConfigInterface> {
    const saveConfig: CycleConfigInterface =
      await this.CycleConfigClass.query().insert(newCycle);
    return saveConfig;
  }

  //update cycle config
  async updateConfig(
    updateCycle: updateCycle,
    configId: number,
  ): Promise<boolean> {
    await this.CycleConfigClass.query()
      .update(updateCycle)
      .where('id', configId);
    return true;
  }

  //delete cycle config
  async deleteConfig(configId: number): Promise<boolean> {
    await this.CycleConfigClass.query().deleteById(configId);
    return true;
  }
}
