import { nanoid } from 'nanoid';

export const Mutation = {
  // Event
  createEvent: (parent, { data }, { pubSub, jsonData }) => {
    const newEvent = {
      id: nanoid(),
      ...data,
    };
    jsonData.events.push(newEvent);
    pubSub.publish("eventCreated", { eventCreated: newEvent });
    return newEvent;
  },
  updateEvent: (parent, { data, id }, { pubSub, jsonData }) => {
    const event = jsonData.events.find((event) => String(event.id) === id);
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }
    const updatedEvent = { ...event, ...data };
    jsonData.events.splice(jsonData.events.indexOf(event), 1, updatedEvent);
    pubSub.publish("eventUpdated", { eventUpdated: updatedEvent });
    return updatedEvent;
  },
  deleteEvent: (parent, { id }, { pubSub, jsonData }) => {
    const eventIndex = jsonData.events.findIndex((event) => String(event.id) === id);
    if (eventIndex === -1) {
      throw new Error(`Event with id ${id} not found`);
    }
    const deletedEvent = jsonData.events[eventIndex];
    jsonData.events.splice(eventIndex, 1);
    pubSub.publish("eventDeleted", { eventDeleted: deletedEvent });
    return deletedEvent;
  },
  deleteAllEvent: (parent, args, { jsonData }) => {
    const eventsLength = jsonData.events.length;
    jsonData.events.splice(0, eventsLength);
    return { count: eventsLength };
  },

  // Participant
  createParticipant: (parent, { data }, { pubSub, jsonData }) => {
    const newParticipant = { id: nanoid(), ...data };
    jsonData.participants.push(newParticipant);
    pubSub.publish("participantCreated", { participantCreated: newParticipant });
    return newParticipant;
  },  
  updateParticipant: (parent, { data, id }, { pubSub, jsonData }) => {
    const participant = jsonData.participants.find(
      (participant) => String(participant.id) === id
    );
    if (!participant) {
      throw new Error(`Participant with id ${id} not found`);
    }
    const updatedParticipant = { ...participant, ...data };
    jsonData.participants.splice(
      jsonData.participants.indexOf(participant),
      1,
      updatedParticipant
    );
    pubSub.publish("participantUpdated", { participantUpdated: updatedParticipant });
    return updatedParticipant;
  },
  deleteParticipant: (parent, { id }, { pubSub, jsonData }) => {
    const participantIndex = jsonData.participants.findIndex(
      (participant) => String(participant.id) === id
    );
    if (participantIndex === -1) {
      throw new Error(`Participant with id ${id} not found`);
    }
    const deletedParticipant = jsonData.participants[participantIndex];
    jsonData.participants.splice(participantIndex, 1);
    pubSub.publish("participantDeleted", { participantDeleted: deletedParticipant });
    return deletedParticipant;
  },
  deleteAllParticipant: (parent, args, { jsonData }) => {
    const participantsLength = jsonData.participants.length;
    jsonData.participants.splice(0, participantsLength);
    return { count: participantsLength };
  },

  // Location
  createLocation: (parent, { data }, { pubSub, jsonData }) => {
    const newLocation = { id: nanoid(), ...data };
    jsonData.locations.push(newLocation);
    pubSub.publish("locationCreated", { locationCreated: newLocation });
    return newLocation;
  },
  updateLocation: (parent, { data, id }, { pubSub, jsonData }) => {
    const location = jsonData.locations.find((location) => String(location.id) === id);
    if (!location) {
      throw new Error(`Location with id ${id} not found`);
    }
    const updatedLocation = { ...location, ...data };
    jsonData.locations.splice(jsonData.locations.indexOf(location), 1, updatedLocation);
    pubSub.publish("locationUpdated", { locationUpdated: updatedLocation });
    return updatedLocation;
  },
  deleteLocation: (parent, { id }, { pubSub, jsonData }) => {
    const locationIndex = jsonData.locations.findIndex((location) => String(location.id) === id);
    if (locationIndex == -1) {
      throw new Error("Location not found");
    }
    const location = jsonData.locations[locationIndex];
    jsonData.locations.splice(locationIndex, 1);
    pubSub.publish("locationDeleted", { locationDeleted: location });
    return location;
  },
  deleteAllLocation: (parent, args, { jsonData }) => {
    const locationsLength = jsonData.locations.length;
    jsonData.locations.splice(0, locationsLength);
    return { count: locationsLength };
  },

  // User
  createUser: (parent, { data }, { pubSub, jsonData }) => {
    const newUser = { id: nanoid(), ...data };
    jsonData.users.push(newUser);
    pubSub.publish("userCreated", { userCreated: newUser });
    return newUser;
  },
  updateUser: (parent, { data, id }, { pubSub, jsonData }) => {
    const userIndex = jsonData.users.findIndex((user) => String(user.id) === id);
    if (userIndex === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    const updatedUser = { ...jsonData.users[userIndex], ...data };
    jsonData.users.splice(userIndex, 1, updatedUser);
    pubSub.publish("userUpdated", { userUpdated: updatedUser });
    return updatedUser;
  },
  deleteUser: (parent, { id }, { pubSub, jsonData }) => {
    const userIndex = jsonData.users.findIndex((user) => String(user.id) === id);
    if (userIndex == -1) {
      throw new Error("User not found");
    }
    const user = jsonData.users[userIndex];
    jsonData.users.splice(userIndex, 1);
    pubSub.publish("userDeleted", { userDeleted: user });
    return user;
  },
  deleteAllUsers: (parent, args, { jsonData }) => {
    const usersLength = jsonData.users.length;
    jsonData.users.splice(0, usersLength);
    return { count: usersLength };
  },
};
