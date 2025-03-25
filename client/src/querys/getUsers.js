import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users {
    users {
      id
      username
      email
    }
  }
`;

export const GET_USER = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
    id
    username
    email
  }
  }
`;
