import { connectToDatabase } from './database/database';
import Logger from './utils/Logger';
import app from './app';
import { config } from './config/config';

export const startServer = (port: string | number) => {
  connectToDatabase()
    .then(() => {
      app.listen(port, () => Logger.info(`Server is running on port ${port}`));
    })
    .catch((error) => {
      Logger.error('Error starting the server:');
      Logger.error(error);
    });
};

startServer(config.server.port);
