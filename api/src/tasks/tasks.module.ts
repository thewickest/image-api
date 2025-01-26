import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from '../database/database.module';
import { tasksProviders } from './tasks.providers';

@Module({
  controllers: [TasksController],
  providers: [TasksService, ...tasksProviders],
  imports: [DatabaseModule]
})
export class TasksModule {}
