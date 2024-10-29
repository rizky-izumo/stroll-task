import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { ModelClass } from 'objection';
import { QuestionsModel } from 'src/database/models/questions.model';

@Processor('question-cycle-queue')
export class QuestionProcessor {
  constructor(
    @Inject('QuestionModel')
    private QuestionsClass: ModelClass<QuestionsModel>,
  ) {}

  @Process('change-question-cycle')
  async changeQuestionCycle(job: Job<any>) {
    try {
      await job.log('Processing: change-question-cycle');
      const questions = await this.QuestionsClass.query().orderBy('region_id');
      const minRegionId = await this.QuestionsClass.query()
        .select('region_id')
        .orderBy('region_id', 'asc')
        .first();
      const maxRegionId = await this.QuestionsClass.query()
        .select('region_id')
        .orderBy('region_id', 'desc')
        .first();

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        let newRegionId = question.regionId;
        if (
          question.regionId >= minRegionId.regionId &&
          question.regionId < maxRegionId.regionId
        ) {
          newRegionId += 1;
        } else {
          newRegionId = minRegionId.regionId;
        }

        await this.QuestionsClass.query()
          .update({ regionId: newRegionId })
          .where('id', question.id);
      }
      await job.log(`Success: Question Cycle update success`);
    } catch (e) {
      await job.log(`Fail: Question Cycle update failed`);
      throw e;
    }
  }
}
