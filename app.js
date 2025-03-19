import { ApolloServer } from "@apollo/server";
import { readFile } from "fs/promises";
import { startStandaloneServer } from "@apollo/server/standalone";
const jsonData = JSON.parse(
  await readFile(new URL("./data.json", import.meta.url))
);
const { users, events, participants, locations } = jsonData;

const typeDefs = `#graphql
  type User {
    id: ID
    username: String
    email: String
    events: [Event!]
  }
  type Event {
    id: ID
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID!
    user_id: ID!
    location: Location!
    user: User!
    participants: [Participant!]!
  }
  type Participant {
    id: ID
    user_id: ID!
    event_id: ID!
    user: User!
    event: Event!  # Sadece bir event olmalı
  }
  type Location {
    id: ID
    name: String
    desc: String
    lat: Float
    lng: Float
    events: [Event!]!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User  
    events: [Event!]!
    event(id: ID!): Event 
    participants: [Participant!]  # Buradaki sorgu [Participant] olmalı
    participant(id: ID!): Participant  
    locations: [Location!]  # Locations tümünü getiren query
    location(id: ID!): Location 
  }
`;


const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => {
      const user = users.find(user => String(user.id) === args.id);
      if (!user) {
        throw new Error(`User with id ${args.id} not found`);
      }
      return user;
    },
    events: () => events,
    event: (parent, args) => {
      const event = events.find(event => String(event.id) === args.id);
      if (!event) {
        throw new Error(`Event with id ${args.id} not found`);
      }
      return event;
    },
    participants: () => participants,  // Tüm participant'ları döndürüyoruz
    participant: (parent, args) => {
      const participant = participants.find(participant => String(participant.id) === args.id);
      if (!participant) {
        throw new Error(`Participant with id ${args.id} not found`);
      }
      return participant;
    },
    locations: () => locations,
    location: (parent, args) => {
      const location = locations.find(location => String(location.id) === args.id);
      if (!location) {
        throw new Error(`Location with id ${args.id} not found`);
      }
      return location;
    },
  },
  Event: {
    location: (parent) => locations.find(location => String(location.id) === String(parent.location_id)),
    user: (parent) => users.find(user => String(user.id) === String(parent.user_id)),
    participants: (parent) => participants.filter(participant => String(participant.event_id) === String(parent.id)),
  },
  Participant: {
    user: (parent) => users.find(user => String(user.id) === String(parent.user_id)),
    event: (parent) => events.find(event => String(event.id) === String(parent.event_id)),
  },
  Location: {
    events: (parent) => events.filter(event => String(event.location_id) === String(parent.id)),
  },
  User: {
    events: (parent) => events.filter(event => String(event.user_id) === String(parent.id)),
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀 Server ready at: ${url}`);
