export const Subscription = {
  userCreated: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("userCreated"),
    resolve: (payload) => {
      const user = payload?.userCreated;
      if (!user) return null;
      return {
        ...user,
      };
    }
  },
  userUpdated: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("userUpdated"),
    resolve: (payload) => {
      const user = payload?.userUpdated;
      if (!user) return null;
      return {
        ...user,
      };
    }
  },
  userDeleted: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("userDeleted"),
    resolve: (payload) => {
      const user = payload?.userDeleted;
      if (!user) return null;
      return {
        ...user,
      };
    }
  },
  eventCreated: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("eventCreated"),
    resolve: (payload) => {
      const event = payload?.eventCreated;
      console.log('Backendden gönderilen payload:', payload);
      if (!event) return null;
      return {
        ...event,
      };
    }
  },
  eventUpdated: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("eventUpdated"),
    resolve: (payload) => {
      const event = payload?.eventUpdated;
      if (!event) return null;
      return {
        ...event,
      };
    }
  },
  eventDeleted: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("eventDeleted"),
    resolve: (payload) => {
      const event = payload?.eventDeleted;
      if (!event) return null;
      return {
        ...event,
      };
    }
  },
  participantCreated: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("participantCreated"),
    resolve: (payload) => {
      const participant = payload?.participantCreated;
      if (!participant) return null;
      return {
        ...participant,
      };
    }
  },
  participantUpdated: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("participantUpdated"),
    resolve: (payload) => {
      const participant = payload?.participantUpdated;
      if (!participant) return null;
      return {
        ...participant,
      };
    }
  },
  participantDeleted: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("participantDeleted"),
    resolve: (payload) => {
      const participant = payload?.participantDeleted;
      if (!participant) return null;
      return {
        ...participant,
      };
    }
  },
  locationCreated: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("locationCreated"),
    resolve: (payload) => {
      const location = payload?.locationCreated;
      if (!location) return null;
      return {
        ...location,
      };
    }
  },
  locationUpdated: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("locationUpdated"),
    resolve: (payload) => {
      const location = payload?.locationUpdated;
      if (!location) return null;
      return {
        ...location,
      };
    }
  },
  locationDeleted: {
    subscribe: (parent, args, { pubSub }) => pubSub.asyncIterator("locationDeleted"),
    resolve: (payload) => {
      const location = payload?.locationDeleted;
      if (!location) return null;
      return {
        ...location,
      };
    }
  }
};
