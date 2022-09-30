import React from 'react';
import styled, { css } from 'styled-components';

const TotalTask = ({ name, ongoingTasks, setOngoingTasks, expirationDate }) => {
  if (ongoingTasks === undefined) return;

  const isOverlap = ongoingTasks.find(task => task.name === name);

  const createOngoingTask = clickedTask => {
    setOngoingTasks([{ name: clickedTask }, ...ongoingTasks]);
  };
  return (
    <Wrap isOverlap={isOverlap}>
      <Task isOverlap={isOverlap}>{name}</Task>
      <Date isOverlap={isOverlap}>{expirationDate}</Date>
      {isOverlap ? (
        <div>
          <CompleteText>할당완료</CompleteText>
        </div>
      ) : (
        <button onClick={() => createOngoingTask(name)}>할당</button>
      )}
    </Wrap>
  );
};

export default TotalTask;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;

  opacity: ${({ isOverlap }) => isOverlap && '0.9'};
`;

const Task = styled.li`
  display: flex;
  align-items: center;
  height: 2rem;
  padding-left: 0.4rem;
  cursor: pointer;
  :hover {
    color: red;
  }
  ${({ isOverlap }) =>
    isOverlap &&
    css`
      opacity: 0.3;
    `}
`;

const CompleteText = styled.div`
  font-size: 0.6rem;
`;

const Date = styled.div`
  font-size: 0.8rem;
  opacity: ${({ isOverlap }) => isOverlap && '0.5'};
`;
