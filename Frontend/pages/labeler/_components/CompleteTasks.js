import React from 'react';
import styled from 'styled-components';

const CompleteTasks = () => {
  return (
    <Wrap>
      <BoldText>완료한 테스크</BoldText>
      <Tasks>
        <Task>Task Name3</Task>
        <Task>Task Name3</Task>
        <Task>Task Name3</Task>
        <Task>Task Name3</Task>
        <Task>Task Name2</Task>
      </Tasks>
    </Wrap>
  );
};

export default CompleteTasks;

const Wrap = styled.div``;
const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Tasks = styled.ul`
  margin-top: 1rem;
  background-color: white;
  width: 17rem;
  height: 10rem;
  padding: 1rem;
  overflow: auto;
`;

const Task = styled.li`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  width: fit-content;

  cursor: pointer;

  :hover {
    color: red;
  }
`;
