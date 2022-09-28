const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type GetAllLabelers {
    _id: ID
    labeler: String
    value: String
  }

  type SearchLabelers {
    _id: ID
    labeler: String
    value: String
  }

  type Query {
    getAllLabelers: [GetAllLabelers]
    searchLabelers(labeler: String): [SearchLabelers]
  }

  type Mutation {
    deleteLabelers(labeler: String): String
  }
`;

module.exports = { typeDefs };
