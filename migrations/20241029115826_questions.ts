import type { Knex } from 'knex';

const tableName = 'questions';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();
    table.string('question').notNullable();
    table.jsonb('choices');
    table.string('correct_answer').notNullable();
    table.integer('region_id').references('id').inTable('region').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
