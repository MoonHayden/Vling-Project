import React from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
const TASK_OF_LABELER_DELETE = gql`
  mutation DeleteTaskOfLabeler($name: String, $labeler: String) {
    deleteTaskOfLabeler(name: $name, labeler: $labeler) {
      labeler
    }
  }
`;

const OngoingTasks = ({ ongoingTasks, goToTaskDetail, setOngoingTasks }) => {
  const router = useRouter();

  const [deleteTask] = useMutation(TASK_OF_LABELER_DELETE);

  const deleteOngoingTask = clickedTask => {
    deleteTask({
      variables: { name: clickedTask, labeler: 'ethanzzang@email.com' },
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
              <Task onClick={() => goToTaskDetail()}>{task.name}</Task>
              <Date>2023/01/14</Date>
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
  margin-bottom: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Task = styled.span`
  cursor: pointer;
  :hover {
    color: red;
  }
`;

const DeleteBtn = styled.button`
  cursor: pointer;
`;

const Date = styled.div`
  font-size: 0.8rem;
`;

const ONGOING_TASK_LIST = ['Task1', 'Task2', 'Task3', 'Task11'];
