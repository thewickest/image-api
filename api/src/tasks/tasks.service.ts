import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto): TaskDto {
    return {
      taskId: 'asdfas',
      status: 'pending',
      price: Math.random()
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }
}
