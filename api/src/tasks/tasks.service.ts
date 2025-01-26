import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interface';
import { Image } from './interfaces/image.interface';
import { COMPLETED, FAILED, IMAGE, PENDING, TASK } from './constants';
import { resizeImage } from 'src/utils/functions';
import { TaskImageDto } from './dto/task-image.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASK)
    private taskModel: Model<Task>,
    @Inject(IMAGE)
    private imageModel: Model<Image>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const inputPath = createTaskDto?.path
    //We can include this is a .env file
    const outputFolder = './output'
    const sizes = [800, 1024]

    const task = {
      status: PENDING,
      price: Math.floor(Math.random() * 50) + 5,
    }

    const createdTask = new this.taskModel({
      ...task,
      originalPath: createTaskDto.path,
      createdAt: new Date(),
      updatedAt: new Date()
    }).save()
    const createdTaskId = (await createdTask).id

    for (const size of sizes) {
      // INCLUDE THIS IF YOU WANT TO DELAY THE IMAGE CREATION 10 SECONDS
        // function executeAfterDelay(callback: () => void, delay: number) {
        //   setTimeout(callback, delay);
        // }
        // executeAfterDelay(() => {
      resizeImage(inputPath, outputFolder, size)
        .then(async data => {
          const imageToCreate = (await this.imageModel.create({ 
            resolution: size,
            md5: data?.md5,
            path: data?.path,
            task: createdTaskId
          })).save()
          const taskToUpdate = await this.taskModel.findById(createdTaskId);
          if (taskToUpdate) {
            taskToUpdate.status = COMPLETED;
            taskToUpdate.updatedAt = new Date();
            taskToUpdate.images = [...taskToUpdate.images, (await imageToCreate)]
            await taskToUpdate.save();
          }
        })
        .catch(async error => {
          const taskToUpdate = await this.taskModel.findById(createdTaskId);
          if (taskToUpdate) {
            taskToUpdate.status = FAILED;
            taskToUpdate.updatedAt = new Date();
            await taskToUpdate.save();
          }})
        // }, 10000);
      //
    }

    return { taskId: createdTaskId, ...task}
  }

  async findOne(taskId: string): Promise<TaskImageDto> {
    try {
      const mongoTask = await this.taskModel.findById(taskId).populate('images')
      const task: TaskImageDto = {
        taskId: mongoTask.id,
        status: mongoTask.status,
        price: mongoTask.price,
        images: mongoTask.images
      }
      if(mongoTask.status !== COMPLETED) {
        delete task.images
      }
      return task
    } catch (error) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND)
    }
  }
}
