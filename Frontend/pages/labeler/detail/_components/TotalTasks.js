import React from 'react';
import TotalTask from './TotalTask';

const TotalTasks = ({
  taskData,
  ongoingTasks,
  setOngoingTasks,
  totalTasks,
}) => {
  if (totalTasks === undefined) return;

  return (
    <>
      {totalTasks.map(task => {
        return (
          <TotalTask
            setOngoingTasks={setOngoingTasks}
            ongoingTasks={ongoingTasks}
            key={task._id}
            name={task.name}
            expirationDate={task.expiration_date}
          />
        );
      })}
    </>
  );
};

export default TotalTasks;

const tasks = [
  { id: 1, name: 'task1' },
  { id: 2, name: 'task2' },
  { id: 3, name: 'task3' },
  { id: 4, name: 'task4' },
  { id: 5, name: 'task5' },
  { id: 6, name: 'task6' },
];
