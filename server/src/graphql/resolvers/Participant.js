import mongoose from "mongoose";

export const Participant = {
  id: (parent) => parent.id,
  user: async (parent, args, context) => {
    return context._db.Users.findOne({
      _id: new mongoose.Types.ObjectId(parent.user_id)
    });
  },
  event: async (parent, args, context) => {
    return context._db.Events.findOne({
      _id: new mongoose.Types.ObjectId(parent.event_id)
    });
  }
};
