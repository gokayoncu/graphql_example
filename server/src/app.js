import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { ApolloServer } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { readFile } from 'fs/promises';
import pubSub from './pubSub.js';
import { Query, Mutation, Subscription, User, Event, Participant, Location } from './graphql/resolvers/index.js';

const jsonData = JSON.parse(await readFile(new URL("./data.json", import.meta.url)));
const schema = makeExecutableSchema({
  typeDefs: `${await readFile(new URL("./graphql/schema.graphql", import.meta.url))}`,
  resolvers: { Query, Mutation, Subscription, User, Event, Participant, Location }
});

// Create Express app
const app = express();

// Create HTTP server
const httpServer = createServer(app);

// Create WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Use WebSocket server with GraphQL schema
useServer({ 
  schema, 
  context: () => ({ 
    pubSub,
    jsonData
  }) 
}, wsServer);

// Create Apollo Server
const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: ({ req }) => ({ 
    pubSub,
    jsonData
  })
});

// Start Apollo Server
await apolloServer.start();

// Apply Apollo middleware to Express app
app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => ({ 
      pubSub,
      jsonData
    })
  })
);

// Start HTTP server
httpServer.listen(4000, () => {
  console.log('🚀 HTTP Server ready at http://localhost:4000/graphql');
  console.log('🚀 WebSocket Server ready at ws://localhost:4000/graphql');
});