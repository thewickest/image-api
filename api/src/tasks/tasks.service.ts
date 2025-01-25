import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interface';
import { Image } from './interfaces/image.interface';
import { COMPLETED, FAILED, IMAGE, PENDING, TASK } from './constants';
const sharp =  require('sharp');
const fs = require('node:fs')
const path = require('node:path')

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

    const extImage = path.extname(inputPath)
    const imageName = path.basename(inputPath, extImage)

    const task = {
      status: PENDING,
      originalPath: createTaskDto.path,
      price: Math.floor(Math.random() * 50) + 5,
    }

    const createdTask = new this.taskModel({...task, createdAt: new Date(), updatedAt: new Date()}).save()
    const createdTaskId = (await createdTask).id

    for (const size of sizes) {
      const outputPath = `${outputFolder}/${imageName}/${size}`

      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      
      // TODO: For developing pourpose. Remove before merge
        // function executeAfterDelay(callback: () => void, delay: number) {
        //   setTimeout(callback, delay);
        // }
        
        // executeAfterDelay(() => {
        sharp(inputPath)
        .resize({width: size})
        // TODO: change this to md5
        .toFile(`${outputPath}/${imageName}-${size}${extImage}`)
        .then(async data => {
          const imageToCreate = (await this.imageModel.create({ 
            resolution: size, 
            path: `${outputPath}/${imageName}-${size}${extImage}`,
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
    }

    return { taskId: createdTaskId, ...task}
  }

  async findOne(taskId: string): Promise<TaskDto> {
    const mongoTask = await this.taskModel.findById(taskId).populate('images')
    const task = {
      taskId: mongoTask.id,
      status: mongoTask.status,
      price: mongoTask.price,
      images: mongoTask.images
    }
    if(mongoTask.status !== COMPLETED) {
      delete task.images
    }
    return task
  }
}
