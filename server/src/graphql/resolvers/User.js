export const User = {
  events: async (parent, args, { _db }) => {
    try {
      const events = await _db.Events.find({ user_id: parent.id });
      return events;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
