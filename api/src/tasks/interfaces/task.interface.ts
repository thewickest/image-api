import { Document } from 'mongoose';
import { Image } from './image.interface';

export interface Task extends Document {
  status: string;
  readonly price: number;
  readonly originalPath: string;
  readonly createdAt: Date;
  updatedAt: Date
  images?: Image[]
}
