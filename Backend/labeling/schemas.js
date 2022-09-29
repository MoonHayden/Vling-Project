const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Labelers {
    _id: ID
    labeler: String
    task: [Task]
    value: String
  }

  type Task {
    _id: ID
    name: String
    kind: String
    attendents: Int
    labelers: [Labelers]
    expiration_date: String
    status: String
    rate: String
  }

  type Labeler {
    _id: ID
    labeler: String
    tasks: [Task]
    value: String
  }

  type DeletedLabeler {
    labeler: String
  }

  type Query {
    getAllLabelers: [Labelers]
    searchLabelers(labeler: String): [Labelers]
    getLabelersTasks(labeler: String): [Labeler]
    getAllTasks: [Task]
  }

  type Mutation {
    deleteLabelers(labeler: String): [DeletedLabeler]
    updateTaskLabeler(_id: ID, labeler: String): Task
    addTaskToLabeler(labeler: String): [Labeler]
    deleteTaskOfLabeler(name: String, labeler: String): Boolean
  }
`;

module.exports = { typeDefs };
