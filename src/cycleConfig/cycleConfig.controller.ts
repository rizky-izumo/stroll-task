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
import { Response } from 'express';
import { CycleConfigService } from './cycleConfig.service';
import { insertCycle } from './dto/insertCycle.dto';
import { updateCycle } from './dto/updateCycle.dto';

@Controller('configs')
export class CycleConfigController {
  constructor(private cycleConfigService: CycleConfigService) {}

  @Get('')
  async getAllConfigurations(@Res() response: Response) {
    const allConfigs = await this.cycleConfigService.fetchAllConfig();
    return response.status(200).send({
      message: 'Available cycle configurations',
      data: allConfigs,
    });
  }

  @Get('/:configId')
  async getConfigById(
    @Param('configId', ParseIntPipe) configId: number,
    @Res() response: Response,
  ) {
    const config = await this.cycleConfigService.fetchConfigById(configId);
    if (!config) {
      throw new UnprocessableEntityException("Configuration ID doesn't exist");
    }
    return response.status(200).send({
      message: `Configuration ID ${configId} details`,
      data: config,
    });
  }

  @Post('/insert')
  async createNewConfig(
    @Body() newCycleDto: insertCycle,
    @Res() response: Response,
  ) {
    try {
      const newConfig = await this.cycleConfigService.createConfig(newCycleDto);
      return response.status(201).send({
        message: 'New configuration has been created',
        data: newConfig,
      });
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }

  @Patch('/:configId/update')
  async updateConfig(
    @Param('configId', ParseIntPipe) configId: number,
    @Body() updateCycleDto: updateCycle,
    @Res() response: Response,
  ) {
    try {
      const updatedConfig = await this.cycleConfigService.updateConfig(
        updateCycleDto,
        configId,
      );
      if (!updatedConfig) {
        throw new UnprocessableEntityException(
          'update operation cannot be completed at this time, try again',
        );
      }
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
    const updatedConfig =
      await this.cycleConfigService.fetchConfigById(configId);
    return response.status(201).send({
      message: 'Configuration has been updated Successfully',
      data: updatedConfig,
    });
  }

  @Delete('/:configId')
  async deleteConfig(
    @Param('configId', ParseIntPipe) configId: number,
    @Res() response: Response,
  ) {
    const config = await this.cycleConfigService.fetchConfigById(configId);
    if (!config) {
      throw new UnprocessableEntityException(
        'Post with the provided Id Does Not Exist',
      );
    }
    const deleteConfig = this.cycleConfigService.deleteConfig(configId);
    return response.status(201).send({
      message: 'Configuration has been deleted Successfully',
      data: deleteConfig,
    });
  }
}
