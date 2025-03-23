export const Subscription = {
  userCreated: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterableIterator("userCreated"),
  },
  userUpdated: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterator("userUpdated"),
  },
  userDeleted: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterator("userDeleted"),
  },
  eventCreated: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterator("eventCreated"),
  },
  eventUpdated: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterator("eventUpdated"),
  },
  eventDeleted: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterator("eventDeleted"),
  },
  participantCreated: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterator("participantCreated"),
  },
  participantUpdated: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterator("participantUpdated"),
  },
  participantDeleted: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterator("participantDeleted"),
  },
  locationCreated: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterator("locationCreated"),
  },
  locationUpdated: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterator("locationUpdated"),
  },
  locationDeleted: {
    subscribe: (parent,args,{pubSub}) => pubSub.asyncIterator("locationDeleted"),
  },
};
