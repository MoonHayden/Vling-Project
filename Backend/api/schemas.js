const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Labelers {
    _id: ID
    labeler: String
    value: String
  }

  type DeletedLabeler {
    labeler: String
  }

  type Labeler {
    _id: ID
    labeler: String
    value: String
  }

  type Task {
    _id: ID
    name: String
    kind: String
    attendents: Int
    labelers: [Labeler]
    status: Boolean
    rate: Float
    expiration_date: Date
  }

  input addLabelerInput {
    _id: ID
    labeler: String
    value: Boolean = false
  }

  type Category {
    name: String
  }

  scalar Date

  type Task {
    _id: ID
    name: String
    kind: String
    attendants: Int
    labelers: [Labeler]
    status: Boolean
    rate: Float
    expiration_date: Date
  }

  type Query {
    getAllLabelers: [Labelers]
    searchLabelers(labeler: String): [Labelers]
    getLabelersTasks(labeler: String): [Task]

    getAllTasks: [Task]
    getTaskDetail(_id: ID, name: String): Task
  }

  type Mutation {
    deleteLabelers(labeler: String): [DeletedLabeler]
    addTaskToLabeler(name: String, labeler: String): Task
    deleteTaskOfLabeler(name: String, labeler: String): [Labeler]

    addTask(
      name: String
      kind: String
      labelers: [addLabelerInput]
      status: Boolean = false
      rate: Float = 0.00
      numVideos: Int
      expiration_date: Date
    ): Task

    deleteTask(name: String): Task

    updateTask(
      name: String
      newName: String
      kind: String
      labelers: [addLabelerInput]
      status: Boolean = false
      expiration_date: Date
    ): Task
  }
`;

module.exports = { typeDefs };
