
import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  status: String,
  price: Number,
  originalPath: String,
  createdAt: Date,
  updatedAt: Date,
  images: [
    {
     resolution: String,
     path: String, 
    }
  ]
});
