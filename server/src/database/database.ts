import mongoose from 'mongoose';
import Logger from '../utils/Logger';
import { config } from '../config/config';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    Logger.info('Connected to the database');
  } catch (error) {
    Logger.error('Error connecting to the database:');
    Logger.error(error);
    throw error;
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    Logger.info('Disconnected from the database');
  } catch (error) {
    Logger.error('Error disconnecting from the database:');
    Logger.error(error);
    throw error;
  }
};
