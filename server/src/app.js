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
import pubSub from './pubSub.js'
import { Query, Mutation, Subscription, User, Event, Participant, Location } from './graphql/resolvers/index.js';
import db from './db.js';
import Users from './models/User.js';
import Events from './models/Events.js';
import Locations from './models/Location.js';
import Participants from './models/Participants.js';

db();

let jsonData = JSON.parse(await readFile(new URL("./data.json", import.meta.url)));

// GraphQL Schema
const schema = makeExecutableSchema({
  typeDefs: `${await readFile(new URL("./graphql/schema.graphql", import.meta.url))}`,
  resolvers: { Query, Mutation, Subscription, User, Event, Participant, Location }
});

// Express ve HTTP Server
const app = express();
const httpServer = createServer(app);

// WebSocket Server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Global context fonksiyonu
const getContext = () => ({ 
  pubSub, 
  jsonData,
  _db: {
    Users,
    Events,
    Locations,
    Participants
  }
});

useServer({ schema, context: getContext }, wsServer);

// Apollo Server
const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  context: getContext
});

await apolloServer.start();

// Apollo Middleware
app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(apolloServer, { context: getContext })
);

// HTTP Server başlat
httpServer.listen(4000, () => {
  console.log('🚀 HTTP Server ready at http://localhost:4000/graphql');
  console.log('🚀 WebSocket Server ready at ws://localhost:4000/graphql');
});
