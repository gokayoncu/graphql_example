import { gql } from "@apollo/client";
export const GET_PARTICIPANTS = gql`
  query Participants {
    participants {
      id
      event_id
      user_id
      event {
        id
        date
        desc
        from
        location_id
        title
        to
        user_id
        image
      }
      user {
        id
        username
        email
      }
    }
  }
`;

export const GET_PARTICIPANT = gql`
  query Query($participantId: ID!) {
    participant(id: $participantId) {
      id
      user_id
      event_id
      event {
        id
        title
        desc
        date
        from
        to
        location_id
        user_id
        image
        location {
          id
          name
          desc
          lat
          lng
        }
      }
    }
  }
`;

export const ADD_PARTICIPANT = gql`
  mutation Mutation($data: CreateParticipantInput!) {
    createParticipant(data: $data) {
      event_id
      id
      user_id
    }
  }
`;

export const SUBSCRIPTION_PARTICIPANTS = gql`
  subscription Subscription {
    participantCreated {
      id
      user_id
      event_id
    }
  }
`;
