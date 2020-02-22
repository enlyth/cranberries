import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Location {
    id: ID!
    name: String!
    image: String!
    zombies: [Zombie]!
  }

  type Zombie {
    id: ID!
    type: String!
    name: String!
    location: Location!
    appearance: Int!
  }

  type Query {
    zombie(id: ID): Zombie
    zombies: [Zombie]!
    location(name: String): Location
    locations: [Location]!
  }

  type Mutation {
    changeLocation(zombieId: ID!, locationName: String!): Zombie!
    cleanseLocation(locationName: String): Location!
    spawnAtLocation(locationName: String): Location!
    moveAllToLocation(locationName: String): [Location]!
    moveZombiesToLocation(zombieIds: [ID!]!, locationName: String!): [Location]!
  }
`;

export default typeDefs;
