export const Location = {
  events: (parent,args, { jsonData }) =>
    jsonData.events.filter((event) => String(event.location_id) === String(parent.id)),
};
