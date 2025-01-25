import { Document } from 'mongoose';

export interface Image extends Document {
  resolution: number;
  path: string;
}
