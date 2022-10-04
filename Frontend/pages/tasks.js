import styled from 'styled-components';
import Link from 'next/link';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import TaskContainer from '../components/TaskContainer';
import AddTask from '../components/AddTask';
import client from '../components/apollo-client';

const TASKS = gql`
  query {
    getAllTasks {
      name
      kind
      attendents
      status
      rate
      expiration_date
    }
  }
`;

const LABELER_LIST = gql`
  query {
    getAllLabelers {
      labeler
      value
    }
  }
`;

export default function Tasks({ allTasks, allLabelers }) {
  const [addTask, setAddTask] = useState(false);

  const onClickAddTask = () => {
    setAddTask(true);
  };
  const onClickBack = () => {
    setAddTask(false);
  };

  return (
    <>
      <InnerWrap addTask={addTask}>
        <TaskNav addTask={addTask}>
          {addTask ? (
            <AddTaskBtn onClick={onClickBack}>뒤로가기</AddTaskBtn>
          ) : (
            <Link href="/">
              <AddTaskBtn>메인으로 이동</AddTaskBtn>
            </Link>
          )}
          {addTask === false && (
            <AddTaskBtn onClick={onClickAddTask}>Task 등록</AddTaskBtn>
          )}
        </TaskNav>
        {addTask === false &&
          allTasks?.data?.getAllTasks?.map(task => (
            <TaskContainer task={task} />
          ))}
        {addTask === true && <AddTask allLabelers={allLabelers} />}
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => (props.addTask ? '2rem' : '0.5rem')};
`;

const AddTaskBtn = styled.button``;

export async function getServerSideProps() {
  const allTasks = await client.query({ query: TASKS });
  const allLabelers = await client.query({ query: LABELER_LIST });
  console.log(allTasks);
  return {
    props: { allTasks, allLabelers },
  };
}
