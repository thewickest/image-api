
import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  status: String,
  price: Number,
  originalPath: String,
  createdAt: Date,
  updatedAt: Date,
  images: [{type: mongoose.Types.ObjectId, ref: 'Image'}]
});

export const ImageSchema = new mongoose.Schema({
  resolution: Number,
  md5: String,
  path: String,
  createdAt: Date,
  task: {type: mongoose.Types.ObjectId, ref: 'Task'}
})