import express, { Request, Response } from 'express';
import { config } from './config/config';
import { connectToDatabase } from './database/database';
import Logger from './utils/Logger';

const app = express();

connectToDatabase()
  .then(() => {
    app.listen(config.server.port, () => {
      Logger.info(`Server listening on port ${config.server.port}`);
    });
  })
  .catch((error) => {
    Logger.error('Error starting the server:');
    Logger.error(error);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('test');
});
