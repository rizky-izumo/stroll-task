import { BaseModel } from './base.model';

export class CycleConfigModel extends BaseModel {
  static tableName = 'cycleConfig';

  dayCycle: number;
  hourCycle: number;
}
