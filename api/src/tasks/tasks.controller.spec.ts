import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { TaskImageDto } from './dto/task-image.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn().mockResolvedValue(new TaskDto()),
            findOne: jest.fn().mockResolvedValue(new TaskImageDto()),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = { path: './first/path' };
      const result = await controller.create(createTaskDto);
      expect(result).toBeInstanceOf(TaskDto);
      expect(service.create).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('findOne', () => {
    it('should return a task image', async () => {
      const taskId = '1';
      const result = await controller.findOne(taskId);
      expect(result).toBeInstanceOf(TaskImageDto);
      expect(service.findOne).toHaveBeenCalledWith(taskId);
    });
  });
});
