// const { GraphQLScalarType, Kind } = require('graphql');

const {
  Tasks,
  AddTask,
  GetTaskDetail,
  DeleteTask,
  UpdateTask,
} = require("./tasks/queries");

const resolvers = {
  Query: {
    getAllTasks: Tasks,
    getTaskDetail: GetTaskDetail,
  },

  Mutation: {
    addTask: AddTask,
    deleteTask: DeleteTask,
    updateTask: UpdateTask,
  },

};

module.exports = { resolvers };
