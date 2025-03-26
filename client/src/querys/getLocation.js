import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query Locations {
    locations {
    id
    name
    desc
    lng
    lat
  }
}`;

export const GET_LOCATION = gql`
  query Query($locationId: ID!) {
    location(id: $locationId) {
      id
      name
      desc
      lat
      lng
      events {
        id
        title
        date
        desc
        from
        to
        location_id
        user_id
        image
        user {
          id
          username
          email
        }
        participants {
          id
          event_id
          user_id
        }
      }
    }
  }
`;

