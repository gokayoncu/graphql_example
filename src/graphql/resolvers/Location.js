export const Location = {
  events: (parent,{jsonData}) =>
    jsonData.events.filter((event) => String(event.location_id) === String(parent.id)),
};
