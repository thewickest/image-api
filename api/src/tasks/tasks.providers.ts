
import { Connection } from 'mongoose';
import { ImageSchema, TaskSchema } from './schemas/task.schema';

export const tasksProviders = [
  {
    provide: 'TASK_MODEL',
    useFactory: (connection: Connection) => connection.model('Task', TaskSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'IMAGE_MODEL',
    useFactory: (connection: Connection) => connection.model('Image', ImageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
