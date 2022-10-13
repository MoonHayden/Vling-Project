import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GET_ALL_TASKS } from '../../components/gql';
import { useRouter } from 'next/router';
import TaskContainer from './components/TaskContainer';
import client from '../../components/apollo-client';

export default function Tasks({ allTasks }) {
  const [tasksAll, setTasksAll] = useState([]);
  const [sortHigh, setSortHigh] = useState(false);
  const [sortOngoing, setSortOngoing] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setTasksAll(allTasks.data.getAllTasks);
  }, [allTasks]);

  const onClickAddTask = () => {
    router.push('/tasks/addTask');
  };

  const sortedByStatusLow = [...tasksAll].sort(function (a, b) {
    if (a.status === false && b.status === true) {
      return -1;
    } else if (a.status === true && b.status === false) {
      return 1;
    } else if (a.status === b.status) {
      if (a.doneVideos / a.totalVideos < b.doneVideos / b.totalVideos) {
        return -1;
      } else if (a.doneVideos / a.totalVideos > b.doneVideos / b.totalVideos) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  const sortedByStatusHigh = [...tasksAll].sort(function (a, b) {
    if (a.status === false && b.status === true) {
      return 1;
    } else if (a.status === true && b.status === false) {
      return -1;
    } else if (a.status === b.status) {
      if (a.doneVideos / a.totalVideos > b.doneVideos / b.totalVideos) {
        return -1;
      } else if (a.doneVideos / a.totalVideos < b.doneVideos / b.totalVideos) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  const onGoingTasks = [...tasksAll].filter(task => task.status === false);

  const completedTasks = [...tasksAll].filter(task => task.status === true);

  const onClickSort = () => {
    setSortHigh(!sortHigh);
  };

  return (
    <InnerWrap>
      <TaskNav>
        <div>
          <Link href="/">
            <AddTaskBtn>메인으로</AddTaskBtn>
          </Link>
          <SortByStatus onClick={onClickSort}>
            {sortHigh ? '완료순↑' : '완료순↓'}
          </SortByStatus>
        </div>
        <AddTaskBtn onClick={onClickAddTask}>Task 등록</AddTaskBtn>
      </TaskNav>
      {sortHigh
        ? sortedByStatusHigh.map(task => (
            <TaskContainer key={task._id} task={task} />
          ))
        : sortedByStatusLow.map(task => (
            <TaskContainer key={task._id} task={task} />
          ))}
    </InnerWrap>
  );
}

export async function getServerSideProps() {
  const allTasks = await client.query({
    query: GET_ALL_TASKS,
    fetchPolicy: 'network-only',
  });
  return {
    props: { allTasks },
  };
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
  margin-bottom: 0.5rem;
`;

const AddTaskBtn = styled.button``;

const SortByStatus = styled(AddTaskBtn)`
  display: block;
  width: 100%;
  margin-top: 10px;
`;
