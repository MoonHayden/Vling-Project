import React from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';

//id-라벨러, name-테스크네임
export const TASK_OF_LABELER_DELETE = gql`
  mutation DeleteTaskOfLabeler($email: String, $name: String) {
    deleteTaskOfLabeler(email: $email, name: $name) {
      _id
    }
  }
`;

const OngoingTasks = ({
  ongoingTasks,
  goToTaskDetail,
  setOngoingTasks,
  labelerInformation,
}) => {
  const [deleteTaskOfLabeler] = useMutation(TASK_OF_LABELER_DELETE);

  const deleteOngoingTask = async clickedTask => {
    await deleteTaskOfLabeler({
      variables: {
        email: labelerInformation.email,
        name: clickedTask,
      },
    });

    const changedTask = ongoingTasks.filter(task => {
      return task.name !== clickedTask;
    });

    setOngoingTasks(changedTask);
  };

  if (ongoingTasks === undefined) return;

  return (
    <Wrap>
      <BoldText>진행중인 테스크</BoldText>
      <TaskWrap>
        {ongoingTasks.map((task, idx) => {
          return (
            <TaskBox key={idx}>
              <Task onClick={() => goToTaskDetail(task.name)}>{task.name}</Task>
              <Text>{task.kind}</Text>
              <Text>{task.expiration_date}</Text>
              <DeleteBtn onClick={() => deleteOngoingTask(task.name)}>
                삭제
              </DeleteBtn>
            </TaskBox>
          );
        })}
      </TaskWrap>
    </Wrap>
  );
};

export default OngoingTasks;

const Wrap = styled.div`
  height: 10rem;
`;

const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const TaskWrap = styled.ul`
  margin-top: 1rem;
  padding: 1rem;
  background-color: white;
  height: 80%;
  overflow: auto;
`;

const TaskBox = styled.li`
  font-size: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  margin-bottom: 0.4rem;
  padding-bottom: 0.4rem;

  :last-of-type {
    border: 0px;
  }
`;

const Task = styled.span`
  width: 5rem;
  font-size: 0.8rem;
  cursor: pointer;
  :hover {
    color: red;
  }
`;

const DeleteBtn = styled.button`
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 0.7rem;
  width: 3rem;
`;
