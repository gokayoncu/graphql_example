export const getListData = (value, events) => {
  const day = value.date();
  const month = value.month() + 1;
  const year = value.year();

  return events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() + 1 === month &&
        eventDate.getFullYear() === year
      );
    })
    .map((event) => ({
      type: "success",
      content: `${event.title} (${event.from} - ${event.to})`,
    }));
};

export const getMonthData = (value, events) => {
  const month = value.month() + 1;
  const year = value.year();

  const monthEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() + 1 === month && eventDate.getFullYear() === year
    );
  });

  return monthEvents.length;
};
