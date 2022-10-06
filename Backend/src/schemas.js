const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Labelers {
    _id: ID
    labeler: String
    value: String
  }

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
    category_predict: [Category]
    taskName: String
    labelers: [Labeler]
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
    getAllLabelers: [Labelers]
    searchLabelers(labeler: String): [Labelers]
    getLabelersTasks(labeler: String): [Task]

    getAllTasks: [Task]
    getTaskDetail(_id: ID, name: String): Task

    getRandomVideo(taskName: String): Video

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

    addCategoryValue(videoId: String, category_predict: String): Category

    addMasterSignUp(name: String, password: String): Master
    masterLogIn(name: String, password: String): Master
  }
`;

module.exports = { typeDefs };
