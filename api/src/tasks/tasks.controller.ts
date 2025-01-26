import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { TaskDto } from './dto/task.dto';
import { TaskImageDto } from './dto/task-image.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: TaskDto
  })
  create(@Body() createTaskDto: CreateTaskDto): Promise<TaskDto> {
    return this.tasksService.create(createTaskDto);
  }

  @Get(':taskId')
  @ApiOkResponse({
    description: 'Image found',
    type: TaskImageDto
  })
  findOne(@Param('taskId') taskId: string): Promise<TaskImageDto> {
    return this.tasksService.findOne(taskId);
  }
}
