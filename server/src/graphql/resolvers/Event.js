export const Event = {
  location: (parent, args, context) => {
    console.log(context.jsonData); // jsonData'nın içerdiğini kontrol edelim
    return context.jsonData.locations.find(
      (location) => String(location.id) === String(parent.location_id)
    );
  },
  user: (parent, args, context) => {
    return context.jsonData.users.find(
      (user) => String(user.id) === String(parent.user_id)
    );
  },
  participants: (parent, args, context) => {
    return context.jsonData.participants
      .filter((participant) => String(participant.event_id) === String(parent.id))
      .map((participant) => ({
        ...participant,
        user: context.jsonData.users.find(
          (user) => String(user.id) === String(participant.user_id)
        ),
      }));
  },
};
