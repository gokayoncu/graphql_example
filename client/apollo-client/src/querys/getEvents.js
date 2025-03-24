import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query Events {
    events {
    date
    desc
    from
    id
    location_id
    title
    to
    user_id
  }
}`;

export const GET_EVENT = gql`
  query Event($eventId: ID!) {
    event(id: $eventId) {
      date
      desc
      from
      id
      location_id
      title
      to
      user_id
      location {
        name
        lng
        lat
        id
        desc
      }
      participants {
        id
        event_id
        user_id
      }
      user {
        id
        username
        email
      }
    }
  }
`;
