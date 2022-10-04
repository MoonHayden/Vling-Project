import React from 'react';
import TotalTask from './TotalTask';

const TotalTasks = ({
  taskData,
  ongoingTasks,
  setOngoingTasks,
  totalTasks,
  goToTaskDetail,
  labelerId,
}) => {
  if (totalTasks === undefined) return;
  return (
    <>
      {totalTasks.map((task, idx) => {
        return (
          <TotalTask
            labelerId={labelerId}
            key={idx}
            goToTaskDetail={goToTaskDetail}
            setOngoingTasks={setOngoingTasks}
            ongoingTasks={ongoingTasks}
            name={task.name}
            category={task.kind}
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
