export const User = {
    events: (parent,args,{jsonData}) =>
      jsonData.events.filter((event) => String(event.user_id) === String(parent.id)),
  }