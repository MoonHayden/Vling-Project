const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # type Labelers {
  #   _id: ID
  #   labeler: String
  #   value: String
  # }

  type Task {
    _id: ID
    name: String
    kind: String
    labelers: [Labeler]
    status: Boolean
    rate: Float
    expiration_date: Date
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
    category_predict: [Category]
    taskName: String
  }

  type Category {
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
    searchLabeler(email: String): [Labeler]
    getLabelersTasks(labeler: String): [Task]

    getAllTasks: [Task]
    getTaskDetail(_id: ID, name: String): Task

    getRandomVideo(taskName: String): [Video]

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
      rate: Float = 0.00
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

    addCategoryValue(videoId: String, label: String): Category

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
