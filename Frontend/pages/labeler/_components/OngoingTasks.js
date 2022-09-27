import React from 'react';
import styled from 'styled-components';

const OngoingTasks = () => {
  return (
    <div>
      <BoldText>진행중인 테스크</BoldText>
      <Tasks>
        <Task>Task Name3</Task>
        <Task>Task Name2</Task>
      </Tasks>
    </div>
  );
};

export default OngoingTasks;

const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Tasks = styled.ul`
  margin-top: 1rem;
  padding: 1rem;
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
