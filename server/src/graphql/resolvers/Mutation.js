import { nanoid } from 'nanoid';

export const Mutation = {
  // Event
  createEvent: async (parent, { data }, { pubSub, _db }) => {
    const newEvent = new _db.Events(data);
    await newEvent.save();
    pubSub.publish("eventCreated", { 
      eventCreated: {
        ...newEvent.toObject(),
        id: newEvent._id,
      }
    });
    return newEvent;
  },
  updateEvent: async (parent, { data, id }, { pubSub, _db }) => {
    const event = await _db.Events.findOne({ _id: id });
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }
    Object.assign(event, data);
    await event.save();
    pubSub.publish("eventUpdated", { 
      eventUpdated: {
        ...event.toObject(),
        id: event._id,
      }
    });
    return event;
  },
  deleteEvent: async (parent, { id }, { pubSub, _db }) => {
    const event = await _db.Events.findOneAndDelete({ _id: id });
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }
    pubSub.publish("eventDeleted", { 
      eventDeleted: {
        ...event.toObject(),
        id: event._id,
      }
    });
    return event;
  },
  deleteAllEvent: (parent, args, { _db }) => {
    const eventsLength = _db.Events.countDocuments();
    _db.Events.deleteMany({});
    return { count: eventsLength };
  },

  // Participant
  createParticipant: async (parent, { data }, { pubSub, _db }) => {
    const newParticipant = new _db.Participants(data);
    await newParticipant.save();
    pubSub.publish("participantCreated", {
      participantCreated: {
        user_id: newParticipant.user_id,
        event_id: newParticipant.event_id,
        id: newParticipant._id
      }
    });
    return newParticipant;
  },
  updateParticipant: async (parent, { data, id }, { pubSub, _db }) => {
    const participant = await _db.Participants.findOne({ _id: id });
    if (!participant) {
      throw new Error(`Participant with id ${id} not found`);
    }
    Object.assign(participant, data);
    await participant.save();
    pubSub.publish("participantUpdated", { 
      participantUpdated: {
        ...participant.toObject(),
        id: participant._id,
        user_id: participant.user_id,
        event_id: participant.event_id,
      }
    });
    return participant;
  },
  deleteParticipant: async (parent, { id }, { pubSub, _db }) => {
    const participant = await _db.Participants.findOneAndDelete({ _id: id });
    if (!participant) {
      throw new Error(`Participant with id ${id} not found`);
    }
    pubSub.publish("participantDeleted", { 
      participantDeleted: {
        ...participant.toObject(),
        id: participant._id,
        user_id: participant.user_id,
        event_id: participant.event_id,
      }
    });
    return participant;
  },
  deleteAllParticipant: (parent, args, { _db }) => {
    const participantsLength = _db.Participants.countDocuments();
    _db.Participants.deleteMany({});
    return { count: participantsLength };
  },

  // Location
  createLocation: async (parent, { data }, { pubSub, _db }) => {
    const newLocation = new _db.Locations(data);
    await newLocation.save();
    pubSub.publish("locationCreated", { 
      locationCreated: {
        ...newLocation.toObject(),
        id: newLocation._id,
      }
    });
    return newLocation;
  },
  updateLocation: async (parent, { data, id }, { pubSub, _db }) => {
    const location = await _db.Locations.findOne({ _id: id });
    if (!location) {
      throw new Error(`Location with id ${id} not found`);
    }
    Object.assign(location, data);
    await location.save();
    pubSub.publish("locationUpdated", { 
      locationUpdated: {
        ...location.toObject(),
        id: location._id,
      }
    });
    return location;
  },
  deleteLocation: async (parent, { id }, { pubSub, _db }) => {
    const location = await _db.Locations.findOneAndDelete({ _id: id });
    if (!location) {
      throw new Error(`Location with id ${id} not found`);
    }
    pubSub.publish("locationDeleted", { 
      locationDeleted: {
        ...location.toObject(),
        id: location._id,
      }
    });
    return location;
  },
  deleteAllLocation: (parent, args, { _db }) => {
    const locationsLength = _db.Locations.countDocuments();
    _db.Locations.deleteMany({});
    return { count: locationsLength };
  },

  // User
  createUser: async (parent, { data }, { pubSub, _db }) => {
    const newUser = new _db.Users(data);
    await newUser.save();
    pubSub.publish("userCreated", { 
      userCreated: {
        ...newUser.toObject(),
        id: newUser._id,
      }
    });
    return newUser;
  },
  updateUser: async (parent, { data, id }, { pubSub, _db }) => {
    const user = await _db.Users.findOne({ _id: id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    Object.assign(user, data);
    await user.save();
    pubSub.publish("userUpdated", { 
      userUpdated: {
        ...user.toObject(),
        id: user._id,
      }
    });
    return user;
  },
  deleteUser: async (parent, { id }, { pubSub, _db }) => {
    const user = await _db.Users.findOneAndDelete({ _id: id });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    pubSub.publish("userDeleted", { 
      userDeleted: {
        ...user.toObject(),
        id: user._id,
      }
    });
    return user;
  },
  deleteAllUsers: (parent, args, { _db }) => {
    const usersLength = _db.Users.countDocuments();
    _db.Users.deleteMany({});
    return { count: usersLength };
  },
};
