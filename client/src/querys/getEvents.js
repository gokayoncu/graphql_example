import { gql } from "@apollo/client";

const eventFields = gql`
  fragment EventFragment on Event {
    date
    desc
    from
    id
    location_id
    title
    to
    user_id
    image
  }
`;

export const GET_EVENTS = gql`
  query Events {
    events {
      ...EventFragment
    }
  }
  ${eventFields}
`;

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
      image
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
        user {
          id
          username
          email
        }
      }
      user {
        id
        username
        email
      }
    }
  }
`;

export const GET_EVENT_SUBSCRIPTION = gql`
  subscription Subscription {
    eventCreated {
      id
      title
      desc
      date
      from
      to
      location_id
      user_id
      image
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($data: CreateEventInput!) {
    createEvent(data: $data) {
      ...EventFragment
    }
  }
  ${eventFields}
`;
