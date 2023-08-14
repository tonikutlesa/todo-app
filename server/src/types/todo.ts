import { Document } from 'mongoose';

export interface ITodo extends Document {
  _id: string;
  text: string;
  done: boolean;
  updatedAt: Date;
  createdAt: Date;
}
