const {
  Labelers,
  Labeler,
  GetLabelersTasks,
  AddTaskToLabeler,
  DeleteLabelers,
  DeleteTaskOfLabeler,
} = require("./labeling/queries");

const {
  Tasks,
  AddTask,
  GetTaskDetail,
  DeleteTask,
  UpdateTask,
} = require("./tasks/queries");

const {
  GetVideos, GetRandVideo
} = require("./videos/queries");

const resolvers = {
  Query: {
    getAllLabelers: Labelers,
    searchLabelers: Labeler,
    getLabelersTasks: GetLabelersTasks,
    getAllTasks: Tasks,
    getTaskDetail: GetTaskDetail,
    getVideos: GetVideos,
    getRandVideo: GetRandVideo,
  },
  Mutation: {
    deleteLabelers: DeleteLabelers,
    deleteTaskOfLabeler: DeleteTaskOfLabeler,
    addTaskToLabeler: AddTaskToLabeler,
    addTask: AddTask,
    deleteTask: DeleteTask,
    updateTask: UpdateTask,
  }
}

module.exports = { resolvers };
