import express, { Request, Response } from 'express';
import { config } from './config/config';
import { connectToDatabase } from './database/database';
import Logger from './utils/Logger';
import router from './routes';
import swaggerDocs from './utils/swagger';

const app = express();

connectToDatabase()
  .then(() => {
    startServer();
  })
  .catch((error) => {
    Logger.error('Error starting the server:');
    Logger.error(error);
  });

const startServer = () => {
  app.use((req, res, next) => {
    // Log the request
    Logger.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      // Log the response
      Logger.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // API rules
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  // Serve Swagger documentation
  swaggerDocs(app, config.server.port);

  // Router
  app.use('/api', router);

  // Healthcheck route
  app.get('/healthcheck', (req, res, next) => res.status(200).json({ status: 'operating' }));

  // Handle unknown route
  app.use((req, res, next) => {
    const error = new Error('Route not found');

    Logger.error(error);

    res.status(404).json({
      message: error.message
    });
  });

  app.listen(config.server.port, () => Logger.info(`Server is running on port ${config.server.port}`));
};
