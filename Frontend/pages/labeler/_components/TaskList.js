import React from 'react';
import TaskInfo from './TaskInfo';

const TaskList = ({ taskData, selectedTask, setSelectedTask }) => {
  console.log(taskData);
  return (
    <>
      {tasks.map(task => {
        return (
          <TaskInfo
            key={task.id}
            // taskData={taskData}
            name={task.name}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
        );
      })}
    </>
  );
};

export default TaskList;

const tasks = [
  { id: 1, name: 'Task1' },
  { id: 2, name: 'Task2' },
  { id: 3, name: 'Task3' },
  { id: 4, name: 'Task4' },
  { id: 5, name: 'Task5' },
  { id: 6, name: 'Task6' },
];
