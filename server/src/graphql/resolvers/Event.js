import mongoose from "mongoose";

export const Event = {
  id: (parent) => {
    if (parent.id) {
      return parent.id;
    }
    return parent.id;
  },
  location: async (parent, args, context) => {
    const location = await context._db.Locations.findOne({
      _id: new mongoose.Types.ObjectId(parent.location_id)
    });
    if (!location) {
      throw new Error("Location with id " + parent.location_id + " not found");
    }
    return location;
  },
  user: async (parent, args, context) => {
    const user = await context._db.Users.findOne({
      _id: new mongoose.Types.ObjectId(parent.user_id)
    });
    if (!user) {
      throw new Error(`User with id ${parent.user_id} not found`);
    }
    return user;
  },
participants: async (parent, args, { _db }) => {
  const participants = await _db.Participants.find({
    event_id: parent.id
  }).populate('user_id');
  
  return participants
    .filter(participant => participant.user_id) // null olan kullanıcıları filtrele
    .map(participant => ({
      ...participant.toObject(),
      id: participant._id.toString(),
      user_id: participant.user_id._id.toString(),
      event_id: participant.event_id.toString()
    }));
  }
};