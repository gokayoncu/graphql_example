import { ApolloServer } from "@apollo/server";
import { readFile } from "fs/promises";
import { startStandaloneServer } from "@apollo/server/standalone";
import { nanoid } from "nanoid";
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

  input CreateUserInput {
    username: String!
    email: String!
  }
  input UpdateUserInput {
    username: String
    email: String
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

  input CreateEventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }
  input UpdateEventInput {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
  }

  type Participant {
    id: ID
    user_id: ID!
    event_id: ID!
    user: User!
    event: Event!  # Sadece bir event olmalı
  }

  input CreateParticipantInput {
    user_id: ID!
    event_id: ID!
  }
  input UpdateParticipantInput {
    user_id: ID
    event_id: ID
  }
  type Location {
    id: ID
    name: String
    desc: String
    lat: Float
    lng: Float
    events: [Event!]!
  }

  input CreateLocationInput {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }
  input UpdateLocationInput {
    name: String
    desc: String
    lat: Float
    lng: Float
  }

  type DeleteAllOutPut {
    count: Int!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User  
    events: [Event!]!
    event(id: ID!): Event 
    participants: [Participant!]!
    participant(id: ID!): Participant  
    locations: [Location!]!
    location(id: ID!): Location 
  }
  type Mutation {
    # Event
    createEvent(data: CreateEventInput!): Event!
    updateEvent(id: ID!,data: UpdateEventInput!): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvent: DeleteAllOutPut!

    # Participant
    createParticipant(data: CreateParticipantInput!): Participant!
    updateParticipant(id: ID!,data: UpdateParticipantInput!): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipant: DeleteAllOutPut!

    # Location
    createLocation(data: CreateLocationInput!): Location!
    updateLocation(id: ID!,data: UpdateLocationInput!): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocation: DeleteAllOutPut!

    # User
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!,data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAllOutPut!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => {
      const user = users.find((user) => String(user.id) === args.id);
      if (!user) {
        throw new Error(`User with id ${args.id} not found`);
      }
      return user;
    },
    events: () => events,
    event: (parent, args) => {
      const event = events.find((event) => String(event.id) === args.id);
      if (!event) {
        throw new Error(`Event with id ${args.id} not found`);
      }
      return event;
    },
    participants: () => participants, // Tüm participant'ları döndürüyoruz
    participant: (parent, args) => {
      const participant = participants.find(
        (participant) => String(participant.id) === args.id
      );
      if (!participant) {
        throw new Error(`Participant with id ${args.id} not found`);
      }
      return participant;
    },
    locations: () => locations,
    location: (parent, args) => {
      const location = locations.find(
        (location) => String(location.id) === args.id
      );
      if (!location) {
        throw new Error(`Location with id ${args.id} not found`);
      }
      return location;
    },
  },
  Mutation: {
    // Event
    createEvent: (parent, { data }) => {
      const newEvent = {
        id: nanoid(),
        ...data,
      };
      events.push(newEvent);
      return newEvent;
    },
    updateEvent:(parent,{data,id})=>{
      const event = events.find((event) => String(event.id) === id);
      if (!event) {
        throw new Error(`Event with id ${id} not found`);
      }
      const updatedEvent = {
        ...event,
        ...data,
      };
      events.splice(events.indexOf(event), 1, updatedEvent);
      return updatedEvent;
    },
    deleteEvent:(parent,{id})=>{
      const eventIndex = events.findIndex((event) => String(event.id) === id);
      if (eventIndex === -1) {
        throw new Error(`Event with id ${id} not found`);
      }
      const deletedEvent = events[eventIndex];
      events.splice(eventIndex, 1);
      return deletedEvent;
    },
    deleteAllEvent:(parent,{})=>{
      const eventsLength = events.length;
      events.splice(0, eventsLength);
      return { count: eventsLength };
    },

    // Participant
    createParticipant: (parent, { data }) => {
      const newParticipant = {
        id: nanoid(),
        ...data,
      };
      participants.push(newParticipant);
      return newParticipant;
    },
    updateParticipant: (parent, { data, id }) => {
      const participant = participants.find((participant) => String(participant.id) === id);
      if (!participant) {
        throw new Error(`Participant with id ${id} not found`);
      }
      const updatedParticipant = {
        ...participant,
        ...data,
      };
      participants.splice(participants.indexOf(participant), 1, updatedParticipant);
      return updatedParticipant;
    },  
    deleteParticipant: (parent, { id }) => {
      const participantIndex = participants.findIndex((participant) => String(participant.id) === id);
      if (participantIndex === -1) {
        throw new Error(`Participant with id ${id} not found`);
      }
      const deletedParticipant = participants[participantIndex];
      participants.splice(participantIndex, 1);
      return deletedParticipant;
    },
    deleteAllParticipant:(parent,{})=>{
      const participantsLength = participants.length;
      participants.splice(0, participantsLength);
      return { count: participantsLength };
    },

    // Location
    createLocation: (parent, { data }) => {
      const newLocation = {
        id: nanoid(),
        ...data,
      };
      locations.push(newLocation);
      return newLocation;
    },
    updateLocation:(parent,{data,id})=>{
      const location = locations.find((location) => String(location.id) === id);
      if (!location) {
        throw new Error(`Location with id ${id} not found`);
      }
      const updatedLocation = {
        ...location,
        ...data,
      };
      locations.splice(locations.indexOf(location), 1, updatedLocation);
      return updatedLocation;
    },
    deleteLocation:(parent,{id})=>{
      const locationIndex = locations.findIndex((location)=>String(location.id)===id);
      if(locationIndex == -1){
        throw new Error ("Location is Not Found")
      }
      const location = locations[locationIndex];
      locations.splice(locationIndex,1);
      return location;
    },
    deleteAllLocation:(parent,{})=>{
      const locationsLength = locations.length;
      locations.splice(0, locationsLength);
      return { count: locationsLength };
    },

    // User
    createUser: (parent, { data }) => {
      const newUser = {
        id: nanoid(),
        ...data,
      };
      users.push(newUser);
      return newUser;
    },
    updateUser: (parent,{ data, id }) => {

      const userIndex = users.findIndex((user) => String(user.id) === id);
      if (userIndex === -1) {
        throw new Error(`User with id ${id} not found`);
      }
      const updatedUser = {
        ...users[userIndex],
        ...data,
      };
      users.splice(userIndex, 1, updatedUser);
      return updatedUser;
    },
    deleteUser:(parent,{id})=>{
      const userIndex = users.findIndex((user)=>String(user.id)===id);
      if(userIndex == -1){
        throw new Error ("User is Not Found")
      }
      const user = users[userIndex];
      users.splice(userIndex,1);
      return user;
    },
    deleteAllUsers:(parent,{})=>{
      const usersLength = users.length;
      users.splice(0, usersLength);
      return { count: usersLength };
    },
  },
  Event: {
    location: (parent) =>
      locations.find(
        (location) => String(location.id) === String(parent.location_id)
      ),
    user: (parent) =>
      users.find((user) => String(user.id) === String(parent.user_id)),
    participants: (parent) =>
      participants.filter(
        (participant) => String(participant.event_id) === String(parent.id)
      ),
  },
  Participant: {
    user: (parent) =>
      users.find((user) => String(user.id) === String(parent.user_id)),
    event: (parent) =>
      events.find((event) => String(event.id) === String(parent.event_id)),
  },
  Location: {
    events: (parent) =>
      events.filter((event) => String(event.location_id) === String(parent.id)),
  },
  User: {
    events: (parent) =>
      events.filter((event) => String(event.user_id) === String(parent.id)),
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
