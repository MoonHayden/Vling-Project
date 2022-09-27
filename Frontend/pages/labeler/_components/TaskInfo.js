import React from 'react';
import styled, { css } from 'styled-components';

const TaskInfo = ({ name, selectedTask, setSelectedTask }) => {
  const taskSelect = name => {
    selectedTask === name ? setSelectedTask('') : setSelectedTask(name);
  };
  return (
    <>
      <Task
        isClickedTask={selectedTask === name}
        onClick={() => taskSelect(name)}
      >
        {name}
      </Task>
    </>
  );
};

export default TaskInfo;

const Task = styled.li`
  display: flex;
  align-items: center;
  height: 2rem;
  padding-left: 0.4rem;
  margin-bottom: 0.3rem;
  background-color: white;
  color: black;
  cursor: pointer;

  :hover {
    color: blue;
  }

  ${({ isClickedTask }) =>
    isClickedTask &&
    css`
      background-color: blue;
      color: white;
      :hover {
        color: white;
      }
    `}
`;
