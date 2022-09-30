const {
  Labelers,
  Labeler,
  Tasks,
  DeleteLabelers,
  DeleteTaskOfLabeler,
  AddTask,
  GetTaskDetail,
} = require("./queries");

const resolvers = {
  Query: {
    getAllLabelers: Labelers,
    searchLabelers: Labeler,
    getLabelersTasks: Labeler,
    getAllTasks: Tasks,
    getTaskDetail: GetTaskDetail,
  },
  Mutation: {
    deleteLabelers: DeleteLabelers,
    deleteTaskOfLabeler: DeleteTaskOfLabeler,
    addTask: AddTask,
    // addTaskToLabeler: AddTaskToLabeler,
  },
};

module.exports = { resolvers };
