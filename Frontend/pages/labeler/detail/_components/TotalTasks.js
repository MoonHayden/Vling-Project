import React from 'react';
import TotalTask from './TotalTask';
const TotalTasks = ({
  ongoingTasks,
  setLabelersTasks,
  totalTasks,
  labelerId,
  labelerInformation,
  labelersTasks,
}) => {
  if (totalTasks === undefined) return;

  const availableTasks = totalTasks.filter(task => !task.status);

  return (
    <>
      {availableTasks.map((task, idx) => {
        return (
          <TotalTask
            labelerId={labelerId}
            key={idx}
            setLabelersTasks={setLabelersTasks}
            ongoingTasks={ongoingTasks}
            name={task.name}
            category={task.kind}
            totalVideos={task.totalVideos}
            doneVideos={task.doneVideos}
            expirationDate={task.expiration_date}
            labelerInformation={labelerInformation}
            labelersTasks={labelersTasks}
          />
        );
      })}
    </>
  );
};

export default TotalTasks;
