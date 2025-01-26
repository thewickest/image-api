import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Model } from 'mongoose';
import { Task } from './interfaces/task.interface';
import { Image } from './interfaces/image.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TaskImageDto } from './dto/task-image.dto';
import { IMAGE, TASK } from './constants';
import { NotFoundError } from 'rxjs';

describe('TasksService', () => {
  let service: TasksService;
  let taskModel: Model<Task>;
  let imageModel: Model<Image>;

  const mockTasksService = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService
        },
        {
          provide: TASK,
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: IMAGE,
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskModel = module.get<Model<Task>>(TASK);
    imageModel = module.get<Model<Image>>(IMAGE);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = { path: 'test/path' };
      const result: TaskDto = {
        taskId: '',
        status: '',
        price: 0
      };

      mockTasksService.create.mockResolvedValue(result);

      expect(await service.create(createTaskDto)).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a task image', async () => {
      const taskId = '1';
      const result: TaskImageDto = {
        taskId: '1',
        status: '',
        price: 0
      };

      mockTasksService.findOne.mockResolvedValue(result);

      expect(await service.findOne(taskId)).toEqual(result);
    });

    it('should return 404', async () => {
      const taskId = 'nonexisteng';

      mockTasksService.findOne.mockResolvedValue(NotFoundError);

      expect(await service.findOne(taskId)).toEqual(NotFoundError);
    });
  });
});
