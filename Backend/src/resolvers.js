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
  MasterSignUp, 
  MasterLogIn 
} = require("./master/queries");

const { 
  GetRandomVideo, 
  AddCategoryValue 
} = require("./videos/queries");

const resolvers = {
  Query: {
    getAllLabelers: Labelers,
    searchLabelers: Labeler,
    getLabelersTasks: GetLabelersTasks,
    getAllTasks: Tasks,
    getTaskDetail: GetTaskDetail,
    getRandomVideo: GetRandomVideo,
  },
  Mutation: {
    deleteLabelers: DeleteLabelers,
    deleteTaskOfLabeler: DeleteTaskOfLabeler,
    addTaskToLabeler: AddTaskToLabeler,
    addTask: AddTask,
    deleteTask: DeleteTask,
    updateTask: UpdateTask,
    addCategoryValue: AddCategoryValue,
    
    addMasterSignUp: MasterSignUp,
    masterLogIn: MasterLogIn,
  },
};

module.exports = { resolvers };
