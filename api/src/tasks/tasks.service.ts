import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';
const sharp =  require('sharp');
const fs = require('node:fs')
const path = require('node:path')

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto): TaskDto {
    const inputPath = createTaskDto?.path
    const outputFolder = './output'
    const sizes = [800, 1024]

    const extImage = path.extname(inputPath)
    const imageName = path.basename(inputPath, extImage)

    // this should be done by mongdb
    const task = {
      taskId: (Math.floor(Math.random() * 1000) + 1).toString(),
      status: 'pending',
      originalPath: createTaskDto.path,
      price: Math.floor(Math.random() * 50) + 1
    }

    fs.appendFileSync('./data.json', JSON.stringify(task), err => {
      if(err) {
        console.error(err)
      } else {
        // succesfully
      }
    })

    for (const size of sizes) {
      const outputPath = `${outputFolder}/${imageName}/${size}`

      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      sharp(inputPath)
        .resize({width: size})
        // change this to md5
        .toFile(`${outputPath}/${imageName}-${size}${extImage}`)
        .then(data => {
          fs.appendFileSync('./data.json', 'completed')
        })
    }

    return task;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }
}
