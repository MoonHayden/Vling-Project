const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # scalar Date
  
  # type Labeler {
  #   labeler: String
  #   tasks: [Task]
  #   value: String
  # }

  type DeletedLabeler {
    labeler: String
  }

  type Labeler {
    labeler: String
    value: Boolean
  }

  type Task {
    name: String
    kind: String
    attendants: Int
    labelers: [Labeler]
    status: Boolean
    rate: Float
    expiration_date: String
  }

  input addLabelerInput {
    labeler: String
    value: Boolean = false
  }

  type Query {
    getAllLabelers: [Labeler]
    searchLabelers(labeler: String): [Labeler]
    getLabelersTasks(labeler: String): [Labeler]

    getAllTasks: [Task]
    getTaskDetail(name: String): Task
  }

  type Mutation {
    deleteLabelers(labeler: String): [DeletedLabeler]
    addTaskToLabeler(labeler: String): [Labeler]
    deleteTaskOfLabeler(name: String, labeler: String): [Labeler]
    
    addTask(
      name: String,
      kind: String,
      labelers: [addLabelerInput],
      status: Boolean = false,
      rate: Float = 0.00,
      numVideos: Int
      expiration_date: String
    ): Task
    deleteTask(name: String): Task
    updateTask(
      name: String,
      newName: String,
      kind: String,
      labelers: [addLabelerInput],
      status: Boolean = false,
      expiration_date: String): Task
  }
`;

module.exports = { typeDefs };
