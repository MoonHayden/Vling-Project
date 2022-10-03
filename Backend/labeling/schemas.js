const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Labelers {
    _id: ID
    labeler: String
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

  type Video {
    _id: ID
    task_id: ID
    labelers: [Labeler]
    status: String
    record_info: String
    confirm: String
    category: String
  }

  type Labeler {
    _id: ID
    labeler: String
    task: [Task]
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
    deleteTaskOfLabeler(name: String, labeler: String): [Labeler]
    addTask(input: addTaskInput!): Task
    addTaskToLabeler(name: String, labeler: String): [Labeler]
  }
`;

module.exports = { typeDefs };
