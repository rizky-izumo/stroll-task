import { BaseModel } from './base.model';

export class RegionModel extends BaseModel {
  static tableName = 'region';

  regionName: string;
}
