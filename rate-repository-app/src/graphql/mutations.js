import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation ($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation ($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation ($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;

export const CREATE_USER = gql`
  mutation ($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`;
