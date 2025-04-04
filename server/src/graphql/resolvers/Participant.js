export const Participant = {
  user: (parent, args, context) => {
    return context.jsonData.users.find(
      (user) => String(user.id) === String(parent.user_id)
    );
  },
  event: (parent, args, { jsonData }) =>
    jsonData.events.find((event) => String(event.id) === String(parent.event_id)),
};
