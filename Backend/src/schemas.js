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
    doneVideos: Int
  }

  scalar Date

  type Labeler {
    _id: ID
    googleId: String
    idToken: String
    email: String
    name: String
    value: String
    created_at: Date
  }

  type DeletedLabeler {
    _id: ID
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
    labeler: [String]
    label: [String]
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
    email: String
    value: Boolean = false
  }

  type Query {
    getAllLabelers: [Labeler]
    searchLabeler(_id: ID): [Labeler]
    searchLabelerByGId(googleId: String): Labeler
    getLabelersTasks(_id: ID): [Task]

    getAllTasks: [Task]
    getTaskDetail(_id: ID, name: String): Task

    getRandomVideo(labeler: String!, taskName: String!): Video

    masterLogIn: Master
  }

  type Mutation {
    deleteLabelers(_id: ID): [DeletedLabeler]
    addTaskToLabeler(email: String, _id: ID, name: String): Task
    deleteTaskOfLabeler(email: String, _id: ID, name: String): [Labeler]

    addTask(
      name: String
      kind: String
      labelers: [addLabelerInput]
      status: Boolean = false
      totalVideos: Int = 0
      expiration_date: Date
      doneVideos: Int = 0
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

    addCategoryValue(_id: ID, labeler: ID, label: String): Boolean

    addMasterSignUp(name: String, password: String): Master
    masterLogIn(name: String, password: String): Master

    labelerLogIn(
      email: String
      googleId: String
      name: String
      idToken: String
    ): Labeler
  }
`;

module.exports = { typeDefs };
