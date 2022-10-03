const {
  Labelers,
  Labeler,
  GetLabelersTasks,
  Tasks,
  AddTaskToLabeler,
  DeleteLabelers,
  DeleteTaskOfLabeler,
  AddTask,
  GetTaskDetail,
} = require("./queries");

const resolvers = {
  Query: {
    getAllLabelers: Labelers,
    searchLabelers: Labeler,
    getLabelersTasks: GetLabelersTasks,
    getAllTasks: Tasks,
    getTaskDetail: GetTaskDetail,
  },
  Mutation: {
    deleteLabelers: DeleteLabelers,
    deleteTaskOfLabeler: DeleteTaskOfLabeler,
    addTask: AddTask,
    addTaskToLabeler: AddTaskToLabeler,
  },
};

module.exports = { resolvers };
