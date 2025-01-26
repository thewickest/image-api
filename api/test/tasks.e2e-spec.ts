import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';


describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/tasks (POST)', () => {
    const createTaskDto: CreateTaskDto = { path: './test-images/image.png' };
    return request(app.getHttpServer())
      .post('/tasks')
      .send(createTaskDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('taskId');
        expect(res.body).toHaveProperty('status', 'pending');
        expect(res.body).toHaveProperty('price');
      });
  });

  it('/tasks/:taskId (GET) - Completed Task', () => {
    const taskId = '67964b05c2e2337d9e85d0ab';
    return request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('taskId', taskId);
        expect(res.body).toHaveProperty('status', 'completed');
        expect(res.body).toHaveProperty('price');
        expect(res.body).toHaveProperty('images')
      });
  });
  it('/tasks/:taskId (GET) - Failed task', () => {
    const taskId = '67969f3c995483be170bdce5';
    return request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('taskId', taskId);
        expect(res.body).toHaveProperty('status', 'failed');
        expect(res.body).toHaveProperty('price');
        expect(res.body).not.toHaveProperty('images');
      });
  });

  it('/tasks/:taskId (GET) - Not found', () => {
    const taskId = 'unexistentId';
    return request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(404)
  });
});