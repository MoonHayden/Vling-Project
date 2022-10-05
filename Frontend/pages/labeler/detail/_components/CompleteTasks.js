import React from 'react';
import styled from 'styled-components';
import { TASK_LIST } from '../../../../data/TASK_LIST';

const CompleteTasks = ({ goToTaskDetail }) => {
  return (
    <Wrap>
      <BoldText>완료한 테스크</BoldText>
      <Tasks>
        {TASK_LIST.map((task, idx) => {
          return (
            <TaskBox key={idx}>
              <Task onClick={() => goToTaskDetail(task.name)}>{task.name}</Task>
              <Text>카테고리</Text>
              <Text>정답률:{task.correctRate}</Text>
            </TaskBox>
          );
        })}
      </Tasks>
    </Wrap>
  );
};

export default CompleteTasks;

const Wrap = styled.div`
  height: 50%;
  padding-top: 1rem;
`;
const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Tasks = styled.ul`
  margin-top: 1rem;
  background-color: white;
  width: 100%;
  height: 80%;
  padding: 1rem;
  overflow: auto;
`;

const Task = styled.li`
  font-size: 0.8rem;
  width: fit-content;

  cursor: pointer;

  :hover {
    color: red;
  }
`;

const TaskBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  margin-bottom: 0.6rem;
  padding-bottom: 0.4rem;

  :last-of-type {
    border: 0px;
  }
`;

const Text = styled.div`
  font-size: 0.7rem;
`;
