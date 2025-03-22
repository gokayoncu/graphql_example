export const Event = {
  location: (parent,{jsonData}) =>
    jsonData.locations.find(
      (location) => String(location.id) === String(parent.location_id)
    ),
  user: (parent,{jsonData}) =>
    jsonData.users.find((user) => String(user.id) === String(parent.user_id)),
  participants: (parent,{jsonData}) =>
    jsonData.participants.filter(
      (participant) => String(participant.event_id) === String(parent.id)
    ),
};
