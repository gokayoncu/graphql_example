import mongoose from "mongoose";

export const Location = {
  events: async (parent, args, { _db }) => {
    const events = await _db.Events.find({
      location_id: new mongoose.Types.ObjectId(parent.id)
    }).populate('user');
    return events;
  }
};
