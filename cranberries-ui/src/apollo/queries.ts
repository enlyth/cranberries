import { gql } from "apollo-boost";

export const GET_ZOMBIES = gql`
  query {
    zombies {
      id
      name
      type
      appearance
      location {
        id
        name
        image
      }
    }
  }
`;

export const GET_LOCATIONS = gql`
  query {
    locations {
      id
      name
      image
      zombies {
        id
        type
        name
        appearance
      }
    }
  }
`;

export const CLEANSE_LOCATION = gql`
  mutation cleanseLocation($name: String!) {
    cleanseLocation(locationName: $name) {
      id
      name
      image
      zombies {
        id
        type
        name
        appearance
      }
    }
  }
`;

export const SPAWN_AT_LOCATION = gql`
  mutation spawnAtLocation($name: String!) {
    spawnAtLocation(locationName: $name) {
      id
      name
      image
      zombies {
        id
        type
        name
        appearance
      }
    }
  }
`;

export const MOVE_ALL_TO_LOCATION = gql`
  mutation moveAllToLocation($name: String!) {
    moveAllToLocation(locationName: $name) {
      id
      name
      image
      zombies {
        id
        type
        name
        appearance
      }
    }
  }
`;

export const MOVE_ZOMBIES_TO_LOCATION = gql`
  mutation moveZombiesToLocation($zombies: [ID!]!, $name: String!) {
    moveZombiesToLocation(zombieIds: $zombies, locationName: $name) {
      id
      name
      image
      zombies {
        id
        type
        name
        appearance
      }
    }
  }
`;
