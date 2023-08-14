import express, { Request, Response } from 'express';
import { config } from './config/config';
import { connectToDatabase } from './database';

const app = express();

connectToDatabase()
  .then(() => {
    app.listen(config.server.port, () => {
      console.log(`Server listening on port ${config.server.port}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the server:', error);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('test');
});
