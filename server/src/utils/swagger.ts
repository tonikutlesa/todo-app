import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import Logger from './Logger';

const openApiDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Todo API Docs',
    version: '1.0.0'
  },
  paths: {
    '/healthcheck': {
      get: {
        tags: ['Healthcheck'],
        description: 'Responds if the app is up and running',
        responses: {
          '200': {
            description: 'App is up and running'
          }
        }
      }
    },
    '/api/todos': {
      get: {
        tags: ['Todo'],
        summary: 'Get all todos',
        parameters: [
          {
            in: 'query',
            name: 'sort',
            schema: {
              type: 'string'
            },
            description: 'Sort direction (asc or desc)'
          }
        ],
        responses: {
          '200': {
            description: 'Success'
          },
          '500': {
            description: 'Internal Server Error'
          }
        }
      },
      post: {
        tags: ['Todo'],
        summary: 'Create a new todo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  text: {
                    type: 'string',
                    description: 'The text of the todo.'
                  }
                },
                required: ['text'],
                example: {
                  text: 'Buy groceries'
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Success'
          },
          '500': {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/api/todos/{id}': {
      get: {
        tags: ['Todo'],
        summary: 'Get a todo by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Todo ID',
            schema: {
              type: 'string'
            },
            default: '64dc003bd11a092ef564f89b',
            required: true
          }
        ],
        responses: {
          '200': {
            description: 'Success'
          },
          '400': {
            description: 'Invalid id format'
          },
          '404': {
            description: 'Not found'
          },
          '500': {
            description: 'Internal Server Error'
          }
        }
      },
      put: {
        tags: ['Todo'],
        summary: 'Update todo',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'Todo ID',
            schema: {
              type: 'string'
            },
            default: '64dc003bd11a092ef564f89b',
            required: true
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  text: {
                    type: 'string',
                    description: 'The text of the todo.'
                  },
                  done: {
                    type: 'boolean',
                    description: 'Defines if todo is done.'
                  }
                },
                example: {
                  done: true
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Success'
          },
          '400': {
            description: 'Invalid id format'
          },
          '404': {
            description: 'Not found'
          },
          '500': {
            description: 'Internal Server Error'
          }
        }
      }
    }
  }
};

function swaggerDocs(app: Express, port: string | number) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDefinition));

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(openApiDefinition);
  });

  Logger.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
