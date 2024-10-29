import { Model } from 'objection';
import { BaseModel } from './base.model';
import { RegionModel } from './region.model';

export class QuestionsModel extends BaseModel {
  static tableName = 'questions';

  question: string;
  choices: Record<string, unknown>;
  correctAnswer: number;
  regionId: number;

  region: RegionModel;

  static relationMappings = {
    region: {
      modelClass: `${__dirname}/region.model`,
      relation: Model.BelongsToOneRelation,
      join: {
        from: 'questions.regionId',
        to: 'region.id',
      },
    },
  };
}
