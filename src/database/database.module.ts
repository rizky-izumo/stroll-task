import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import { RegionModel } from './models/region.model';
import { QuestionsModel } from './models/questions.model';
import { CycleConfigModel } from './models/cycleConfig.model';
import { types } from 'pg';

const models = [RegionModel, QuestionsModel, CycleConfigModel];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex({
        client: 'pg',
        connection: {
          database: process.env.PG_DB,
          user: process.env.PG_USER,
          password: process.env.PG_PASS,
        },
        debug: process.env.KNEX_DEBUG === 'true',
        ...knexSnakeCaseMappers(),
      });

      const DATE_OID = 1082;
      types.setTypeParser(DATE_OID, (val) => String(val));

      const NUMERIC_OID = 1700;
      types.setTypeParser(NUMERIC_OID, (val) => val * 1);

      const INT8_OID = 20;
      types.setTypeParser(INT8_OID, (val) => parseInt(val, 10));

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
