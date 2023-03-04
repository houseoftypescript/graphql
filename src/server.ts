import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import graphqlDepthLimit from 'graphql-depth-limit';
import http from 'http';
import { HttpError } from 'http-errors';
import app from './app';
import logger from './common/libs/logger';
import { resolvers, typeDefs } from './modules';

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const normalizePort = (val: string): string | number | boolean => {
  const portOrPipe = parseInt(val, 10);

  if (isNaN(portOrPipe)) {
    // named pipe
    return val;
  }

  if (portOrPipe >= 0) {
    // port number
    return portOrPipe;
  }

  return false;
};

const startApolloServer = async (
  app: express.Express,
  httpServer: http.Server
) => {
  // Port
  const port = normalizePort(process.env.PORT || '5000');
  app.set('port', port);
  // Apollo Server
  const landingPage =
    NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageGraphQLPlayground();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: 'bounded',
    csrfPrevention: true,
    validationRules: [graphqlDepthLimit(10)],
    introspection: NODE_ENV !== 'production',
    plugins: [landingPage, ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  // HTTP Server
  httpServer.listen(port);
  httpServer.on('listening', () => {
    const addr = httpServer.address();
    const bind =
      typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    logger.info(`🚀 APIs is listening on ${bind}`);
  });
  httpServer.on('error', (error: HttpError) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    if (error.code === 'EACCES') {
      logger.error(`${bind} requires elevated privileges`);
    }
    if (error.code === 'EADDRINUSE') {
      logger.error(`${bind} is already in use`);
    }
    process.exit(1);
  });
};

const httpServer: http.Server = http.createServer(app);

startApolloServer(app, httpServer);

process.on('unhandledRejection', (reason: string) => {
  throw new Error(`unhandledRejection ${reason}`);
});

process.on('uncaughtException', (error: Error) => {
  logger.error(`uncaughtException ${error}`);
  process.exit(1);
});

export default httpServer;
