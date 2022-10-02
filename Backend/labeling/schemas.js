const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Labelers {
    _id: ID
    tasks: [Task]
    value: String
  }

  type Task {
    name: String
    kind: String
    attendents: Int
    labelers: [Labelers]
    status: String
    rate: String
    expiration_date: String
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

  input addTaskInput {
    name: String
    kind: String
    labelers: [addLabelerInput]
    status: Boolean = false
    rate: Float = 0.00
    numVideos: Int!
  }

  input addLabelerInput {
    labeler: String
    value: Boolean = false
  }

  type Query {
    getAllLabelers: [Labelers]
    searchLabelers(labeler: String): [Labelers]
    getLabelersTasks(labeler: String): [Labeler]
    getAllTasks: [Task]
    getTaskDetail(name: String): Task
  }

  type Mutation {
    deleteLabelers(labeler: String): [DeletedLabeler]
    addTaskToLabeler(labeler: String): [Labeler]
    deleteTaskOfLabeler(name: String, labeler: String): [Labeler]
    addTask(input: addTaskInput!): Task
  }
`;

module.exports = { typeDefs };
