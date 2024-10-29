import { Model } from 'objection';

export class BaseModel extends Model {
  id: number;
  createdAt: string;
  updatedAt: string;

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    const timestamp = new Date().toISOString();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  async $beforeUpdate(queryContext) {
    await super.$beforeInsert(queryContext);
    const timestamp = new Date().toISOString();
    this.updatedAt = timestamp;
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    if (json.createdAt) {
      json.createdAt = json.createdAt.toISOString();
    }
    if (json.updatedAt) {
      json.updatedAt = json.updatedAt.toISOString();
    }
    if (json.deletedAt) {
      json.deletedAt = json.deletedAt.toISOString();
    }
    return json;
  }
}
