const {
  Labelers,
  Labeler,
  Task,
  AddTaskToLabeler,
  DeleteLabelers,
  UpdateTaskLabeler,
  DeleteTaskOfLabeler,
} = require("./queries");

const resolvers = {
  Query: {
    getAllLabelers: Labelers,
    searchLabelers: Labeler,
    getLabelersTasks: Labeler,
    getAllTasks: Task,
  },
  Mutation: {
    deleteLabelers: DeleteLabelers,
    updateTaskLabeler: UpdateTaskLabeler,
    addTaskToLabeler: AddTaskToLabeler,
    deleteTaskOfLabeler: DeleteTaskOfLabeler,
  },
};

module.exports = { resolvers };
