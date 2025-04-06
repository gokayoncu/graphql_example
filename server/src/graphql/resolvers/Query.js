import mongoose from "mongoose";

export const Query = {
  users: async (parent, args, { _db }) => {
    const users = await _db.Users.find();
    return users;
  },
  user: async (parent, { id }, { _db }) => {
    const user = await _db.Users.findOne({ _id: id });
    if (!user) throw new Error("User not found");
    return user;
  },
  events: async (parent, args, { _db }) => {
    const events = await _db.Events.find();
    return events.map(event => ({
      ...event.toObject(),
      id: event._id,
      _id: undefined
    }));
  },
  event: async (parent, { id }, { _db }) => {
    const event = await _db.Events.findOne({ _id: id });
    if (!event) throw new Error("Event not found");
    return {
      ...event.toObject(),
      id: event._id,
      _id: undefined
    };
  },
  participants: async (parent, args, { _db }) => {
    const participants = await _db.Participants.find();
    return participants.map(participant => ({
      ...participant.toObject(),
      id: participant._id,
      _id: undefined
    }));
  },
  participant: async (_, { id }, context) => {
    const participant = await context._db.Participants.findOne({
      _id: new mongoose.Types.ObjectId(id)
    });
    if (!participant) {
      throw new Error("Participant not found");
    }
    return participant;
  },
  locations: async (parent, args, { _db }) => {
    const locations = await _db.Locations.find();
    return locations;
  },
  location: async (parent, { id }, { _db }) => {
    const location = await _db.Locations.findOne({ _id: id });
    if (!location) throw new Error(`Location with id ${id} not found`);
    return location;
  }
};