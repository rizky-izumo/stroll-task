import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Response } from 'express';
import { newQuestion } from './dto/newQuestion.dto';
import { updateQuestion } from './dto/updateQuestion.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Get('')
  async getAllQuestions(@Res() response: Response) {
    const allQuestions = await this.questionService.fetchAllQuestions();
    return response.status(200).send({
      message: 'Available questions',
      data: allQuestions,
    });
  }

  @Get('/region/:regionId')
  async getQuestionByRegion(
    @Param('regionId', ParseIntPipe) regionId: number,
    @Res() response: Response,
  ) {
    const question = await this.questionService.fetchQuestionByRegion(regionId);
    if (!question) {
      throw new UnprocessableEntityException(
        "Question Region ID doesn't exist",
      );
    }
    return response.status(200).send({
      message: `Question Region ID ${regionId} details`,
      data: question,
    });
  }

  @Get('/:questionId')
  async getQuestionById(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Res() response: Response,
  ) {
    const question = await this.questionService.fetchQuestionById(questionId);
    if (!question) {
      throw new UnprocessableEntityException("Question ID doesn't exist");
    }
    return response.status(200).send({
      message: `Question ID ${questionId} details`,
      data: question,
    });
  }

  @Post('/insert')
  async createNewQuestion(
    @Body() newQuestionDto: newQuestion,
    @Res() response: Response,
  ) {
    try {
      const newQuestion =
        await this.questionService.createQuestion(newQuestionDto);
      return response.status(201).send({
        message: 'New question has been created',
        data: newQuestion,
      });
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }

  @Patch('/:questionId/update')
  async updateQuestion(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Body() updateQuestionDto: updateQuestion,
    @Res() response: Response,
  ) {
    try {
      const updatedQuestion = await this.questionService.updateQuestion(
        updateQuestionDto,
        questionId,
      );
      if (!updatedQuestion) {
        throw new UnprocessableEntityException(
          'update operation cannot be completed at this time, try again',
        );
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
    const updatedQuestion =
      await this.questionService.fetchQuestionById(questionId);
    return response.status(201).send({
      message: 'Question has been updated Successfully',
      data: updatedQuestion,
    });
  }

  @Delete('/:questionId')
  async deleteQuestion(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Res() response: Response,
  ) {
    const question = await this.questionService.fetchQuestionById(questionId);
    if (!question) {
      throw new UnprocessableEntityException(
        'Post with the provided Id Does Not Exist',
      );
    }
    const deleteQuestion = this.questionService.deleteQuestion(questionId);
    return response.status(201).send({
      message: 'Question has been deleted Successfully',
      data: deleteQuestion,
    });
  }
}
