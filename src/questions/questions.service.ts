import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { QuestionsModel } from 'src/database/models/questions.model';
import { QuestionsInterface } from './interface/questions.interface';
import { newQuestion } from './dto/newQuestion.dto';
import { updateQuestion } from './dto/updateQuestion.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CycleConfigModel } from 'src/database/models/cycleConfig.model';

@Injectable()
export class QuestionsService {
  constructor(
    @Inject('QuestionsModel')
    private QuestionsClass: ModelClass<QuestionsModel>,
    @Inject('CycleConfigModel')
    private CycleConfigClass: ModelClass<CycleConfigModel>,
    @InjectQueue('question-cycle-queue')
    private readonly questionCycleQueue: Queue,
  ) {}

  async onModuleInit() {
    // Cron job to change question assignment based on configurable cycle
    const cycleConfig = await this.CycleConfigClass.query()
      .orderBy('updated_at', 'desc')
      .first();
    await this.questionCycleQueue.add(
      'change-question-cycle',
      {},
      {
        repeat: {
          cron: `0 ${cycleConfig.hourCycle} * * ${cycleConfig.dayCycle}`,
          tz: 'Asia/Singapore',
        },
      },
    );
  }

  //fetch all questions
  async fetchAllQuestions(): Promise<QuestionsInterface[]> {
    const questions = await this.QuestionsClass.query();
    return questions;
  }

  //fetch question by id
  async fetchQuestionById(questionId: number): Promise<QuestionsInterface> {
    const question = await this.QuestionsClass.query().findOne({
      id: questionId,
    });
    return question;
  }

  //fetch question by region id
  async fetchQuestionByRegion(regionId: number): Promise<QuestionsInterface[]> {
    const question = await this.QuestionsClass.query().where(
      'region_id',
      '=',
      regionId,
    );
    return question;
  }

  //create question
  async createQuestion(newQuestion: newQuestion): Promise<QuestionsInterface> {
    const saveQuestion: QuestionsInterface =
      await this.QuestionsClass.query().insert(newQuestion);
    return saveQuestion;
  }

  //update question
  async updateQuestion(
    updateQuestion: updateQuestion,
    questionId: number,
  ): Promise<boolean> {
    await this.QuestionsClass.query()
      .update(updateQuestion)
      .where('id', questionId);
    return true;
  }

  //delete question
  async deleteQuestion(questionId: number): Promise<boolean> {
    await this.QuestionsClass.query().deleteById(questionId);
    return true;
  }
}
