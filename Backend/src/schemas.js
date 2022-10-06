const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type DeletedLabeler {
    labeler: String
  }

  type Labeler {
    _id: ID
    labeler: String
    value: String
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
  labelers: [Labeler]
  taskName: String
  }

  type Query {
    getAllLabelers: [Labeler]
    searchLabelers(labeler: String): [Labeler]
    getLabelersTasks(labeler: String): [Task]

    getAllTasks: [Task]
    getTaskDetail(name: String): Task

    getVideos(taskName: String): [Video]
    getRandVideo(labeler: String): Video
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
      status: Boolean
      expiration_date: Date
    ): Task
  }
`;

module.exports = { typeDefs };
