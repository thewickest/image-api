import { Document } from 'mongoose';

export interface Image extends Document {
  resolution: number;
  md5: string;
  path: string;
  createdAt: Date;
}
