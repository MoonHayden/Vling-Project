// const { GraphQLScalarType, Kind } = require('graphql');

const {
  Labelers,
  // Labeler,
  Tasks,
  DeleteLabelers,
  DeleteTaskOfLabeler,
  AddTask,
  GetTaskDetail,
  DeleteTask,
  UpdateTask,
  GetTasksByLabeler,
} = require("./queries");

const resolvers = {
  Query: {
    getAllLabelers: Labelers,
    searchLabelers: Labelers,
    getLabelersTasks: Labelers,
    
    getAllTasks: Tasks,
    getTaskDetail: GetTaskDetail,
    getTasksByLabeler: GetTasksByLabeler,
  },

  Mutation: {
    deleteLabelers: DeleteLabelers,
    deleteTaskOfLabeler: DeleteTaskOfLabeler,
    // addTaskToLabeler: AddTaskToLabeler,
    
    addTask: AddTask,
    deleteTask: DeleteTask,
    updateTask: UpdateTask,
  },

  // Date: new GraphQLScalarType({
  //   name: 'Date',
  //   description: 'Custom date scalar',
  //   parseValue(value) {
  //     return value;
  //   },
  //   serialize(value) {
  //     return new Date(Number(value));
  //   },
  //   parseLiteral(ast) {
  //     if (ast.kind === Kind.INT) {
  //       return new Date(ast.value);
  //     }
  //     return null;
  //   }
  // })
};

module.exports = { resolvers };
