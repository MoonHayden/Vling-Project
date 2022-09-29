import styled from 'styled-components';
import Link from 'next/link';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import TaskContainer from '../components/TaskContainer';
import AddTask from '../components/AddTask';

/*
const ADD_TASK = gql`
  mutation addTask($name: String!) {
    addTasks(name: $name) {
      name
    }
  }
`;
*/

const TASKS = gql`
  query getTasks {
    tasks {
      id
      name
      numVideos
      labeler
      status
      rate
    }
  }
`;

export default function Tasks() {
  /*
  const [addTasks] = useMutation(ADD_TASK, {
    variables: { name: 'TASK1 NAME' },
  });
  */

  const [addTask, setAddTask] = useState(false);
  const onClickAddTask = () => {
    setAddTask(true);
  };
  const onClickBack = () => {
    setAddTask(false);
  };
  const { data } = useQuery(TASKS);
  return (
    <>
      <InnerWrap data={data} addTask={addTask}>
        <TaskNav addTask={addTask}>
          {addTask === true && (
            <AddTaskBtn onClick={onClickBack}>뒤로가기</AddTaskBtn>
          )}
          {addTask ? (
            <AddTaskBtn>등록하기</AddTaskBtn>
          ) : (
            <AddTaskBtn onClick={onClickAddTask}>Task 등록</AddTaskBtn>
          )}
        </TaskNav>
        {addTask === false &&
          data?.tasks?.map(task => <TaskContainer key={task.id} task={task} />)}
        {addTask === true && <AddTask />}
      </InnerWrap>
    </>
  );
}

const InnerWrap = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-wrap: ${props => (props.addTask ? 'null' : 'wrap')};
  flex-direction: ${props => (props.addTask ? 'column' : 'null')};
  justify-content: ${props => (props.addTask ? 'flex-start' : 'space-between')};
  align-items: flex-start;
  padding: 1rem;
  overflow-y: ${props => (props.addTask ? 'null' : 'scroll')};
`;

const TaskNav = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: ${props => (props.addTask ? 'space-between' : 'flex-end')};
  align-items: center;
  margin-bottom: ${props => (props.addTask ? '2rem' : '0.5rem')};
`;

const AddTaskBtn = styled.button``;
