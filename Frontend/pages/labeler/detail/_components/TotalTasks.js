import React from 'react';
import TotalTask from './TotalTask';

const TotalTasks = ({
  ongoingTasks,
  setOngoingTasks,
  totalTasks,
  goToTaskDetail,
  labelerId,
  labelerInformation,
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
            labelerInformation={labelerInformation}
          />
        );
      })}
    </>
  );
};

export default TotalTasks;
