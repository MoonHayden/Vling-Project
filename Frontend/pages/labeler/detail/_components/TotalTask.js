import React from 'react';
import styled, { css } from 'styled-components';
import { useMutation, gql } from '@apollo/client';

export const TASK_OF_LABELER_ADD = gql`
  mutation AddTaskToLabeler($name: String, $labeler: String) {
    addTaskToLabeler(name: $name, labeler: $labeler) {
      name
    }
  }
`;

const TotalTask = ({
  name,
  category,
  ongoingTasks,
  setOngoingTasks,
  expirationDate,
  goToTaskDetail,
  labelerId,
}) => {
  if (ongoingTasks === undefined) return;
  const [addTaskToLabeler] = useMutation(TASK_OF_LABELER_ADD);

  const isOverlap = ongoingTasks.find(task => task.name === name);

  const addOngoinTask = async clickedTask => {
    await addTaskToLabeler({
      variables: { name: clickedTask, labeler: labelerId },
    });
    setOngoingTasks([
      { name: clickedTask, expiration_date: expirationDate, kind: category },
      ...ongoingTasks,
    ]);
  };
  return (
    <Wrap isOverlap={isOverlap}>
      <Task onClick={() => goToTaskDetail(name)} isOverlap={isOverlap}>
        {name}
      </Task>
      <Text isOverlap={isOverlap}>{category}</Text>
      <Text isOverlap={isOverlap}>{expirationDate}</Text>
      {isOverlap ? (
        <div>
          <CompleteText>할당완료</CompleteText>
        </div>
      ) : (
        <button onClick={() => addOngoinTask(name)}>할당</button>
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
  padding-bottom: 0.2rem;
  border-bottom: 1px solid gray;

  opacity: ${({ isOverlap }) => isOverlap && '0.9'};
`;

const Task = styled.li`
  display: flex;
  align-items: center;
  height: 2rem;
  width: 5rem;
  padding-left: 0.4rem;
  font-size: 0.8rem;
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

const Text = styled.div`
  font-size: 0.7rem;
  width: 3rem;
  opacity: ${({ isOverlap }) => isOverlap && '0.5'};
`;
