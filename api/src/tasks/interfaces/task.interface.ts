import { Document } from 'mongoose';

export interface Task extends Document {
  status: string;
  readonly price: number;
  readonly originalPath: string;
  readonly createdAt: Date;
  updatedAt: Date
  //review this
  images?: String
}
