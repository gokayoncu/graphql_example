export const Query = {
  users: (parent, args, { jsonData }) => jsonData.users,
  user: (parent, args, { jsonData }) => {
    const user = jsonData.users.find((user) => String(user.id) === args.id);
    if (!user) {
      throw new Error(`User with id ${args.id} not found`);
    }
    return user;
  },
  events: (parent, args, { jsonData }) => {
    return jsonData.events || [];
  },
  event: (parent, args, { jsonData }) => {
    return jsonData.events.find(event => String(event.id) === String(args.id));
  },
  participants: (parent, args, { jsonData }) => jsonData.participants,
  participant: (parent, args, { jsonData }) => {
    const participant = jsonData.participants.find(
      (participant) => String(participant.id) === args.id
    );
    if (!participant) {
      throw new Error(`Participant with id ${args.id} not found`);
    }
    return participant;
  },
  locations: (parent, args, { jsonData }) => jsonData.locations,
  location: (parent, args, { jsonData }) => {
    const location = jsonData.locations.find(
      (location) => String(location.id) === args.id
    );
    if (!location) {
      throw new Error(`Location with id ${args.id} not found`);
    }
    return location;
  },
};
