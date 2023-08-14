import { ITodo } from './../types/todo';
import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const todoSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default model<ITodo>('Todo', todoSchema);
