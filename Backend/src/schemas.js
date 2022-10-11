const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Task {
    _id: ID
    name: String
    kind: String
    labelers: [Labeler]
    status: Boolean
    totalVideos: Int
    expiration_date: Date
  }

  scalar Date

  type Labeler {
    _id: ID
    idToken: String
    labeler: String
    name: String
    userId: String
    value: String
    createdAt: Date
  }

  type DeletedLabeler {
    labeler: String
  }

  type Video {
    _id: ID
    videoId: String
    title: String
    category: String
    tags: String
    tags_str: String
    description: String
    category_ori: String
    category_label: String
    category_predict: String
    taskName: String
    in_progress: [String]
    labeler: [Labeler]
    label: [Label]
    check: Boolean
  }

  type Label {
    name: String
  }

  type Master {
    _id: ID
    name: String
    password: String
  }

  input addLabelerInput {
    _id: ID
    labeler: String
    value: Boolean = false
  }

  type Query {
    getAllLabelers: [Labeler]
    searchLabelers(labeler: String): [Labeler]
    getLabelersTasks(labeler: String): [Task]

    getAllTasks: [Task]
    getTaskDetail(_id: ID, name: String): Task

    getRandomVideo(labeler: String!, taskName: String!): Video

    masterLogIn: Master
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
      totalVideos: Int = 0
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

    addCategoryValue(
      _id: ID
      labeler: ID
      label: String
      ): Boolean

    addMasterSignUp(name: String, password: String): Master
    masterLogIn(name: String, password: String): Master
  }
`;

module.exports = { typeDefs };
