import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interface';
const sharp =  require('sharp');
const fs = require('node:fs')
const path = require('node:path')

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_MODEL')
    private taskModel: Model<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const inputPath = createTaskDto?.path
    const outputFolder = './output'
    const sizes = [800, 1024]

    const extImage = path.extname(inputPath)
    const imageName = path.basename(inputPath, extImage)

    // this should be done by mongdb
    const task = {
      status: 'pending',
      originalPath: createTaskDto.path,
      price: Math.floor(Math.random() * 50) + 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const createdTask = new this.taskModel(task).save()

    for (const size of sizes) {
      const outputPath = `${outputFolder}/${imageName}/${size}`

      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      
      // TODO: For developing pourpose. Remove before merge
      function executeAfterDelay(callback: () => void, delay: number) {
        setTimeout(callback, delay);
      }
      
      executeAfterDelay(() => {
        
        sharp(inputPath)
        .resize({width: size})
        // change this to md5
        .toFile(`${outputPath}/${imageName}-${size}${extImage}`)
        .then(async data => {
          const taskToUpdate = await this.taskModel.findById((await createdTask).id);
          if (taskToUpdate) {
            taskToUpdate.status = 'completed';
            taskToUpdate.updatedAt = new Date();
            await taskToUpdate.save();
          }
        })
        .catch(async error => {
          const taskToUpdate = await this.taskModel.findById((await createdTask).id);
          if (taskToUpdate) {
            taskToUpdate.status = 'error';
            taskToUpdate.updatedAt = new Date();
            await taskToUpdate.save();
          }})
        }, 10000);
    }

    return { taskId: (await createdTask).id, ...task}
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }
}
