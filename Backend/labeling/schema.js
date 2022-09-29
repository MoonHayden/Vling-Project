const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Labelers {
    _id: ID
    labeler: String
    value: String
  }

  type Labeler {
    _id: ID
    labeler: String
  }

  type Test {
    labeler: String
  }

  type Query {
    getAllLabelers: [Labelers]
    searchLabelers(labeler: String): [Labelers]
  }

  type Mutation {
    deleteLabelers(labeler: String): [Test]
  }
`;

module.exports = { typeDefs };
