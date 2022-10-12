import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GET_ALL_TASKS, GET_ALL_LABELERS } from '../../components/gql';
import TaskContainer from './components/TaskContainer';
import AddTask from './components/AddTask';
import client from '../../components/apollo-client';

export default function Tasks({ allTasks, allLabelers }) {
  const [addTask, setAddTask] = useState(false);
  const [labelersAll, setLabelersAll] = useState([]);
  const [tasksAll, setTasksAll] = useState([]);
  const [sortHigh, setSortHigh] = useState(false);

  useEffect(() => {
    setLabelersAll(allLabelers.data.getAllLabelers);
    setTasksAll(allTasks.data.getAllTasks);
  }, [allLabelers, allTasks]);

  const onClickAddTask = () => {
    setAddTask(true);
  };
  const onClickBack = () => {
    setAddTask(false);
  };

  const sortedByStatusLow = [...tasksAll].sort(function (a, b) {
    return Number(a.status) - Number(b.status);
  });

  const sortedByStatusHigh = [...tasksAll].sort(function (a, b) {
    return Number(b.status) - Number(a.status);
  });

  const onClickSort = () => {
    setSortHigh(!sortHigh);
  };

  return (
    <>
      <InnerWrap>
        <TaskNav addTask={addTask}>
          {addTask ? (
            <AddTaskBtn onClick={onClickBack}>뒤로가기</AddTaskBtn>
          ) : (
            <div>
              <Link href="/">
                <AddTaskBtn>메인으로</AddTaskBtn>
              </Link>
              <SortByStatus onClick={onClickSort}>
                {sortHigh ? '완료순 ⬆️' : '완료순 ⬇️'}
              </SortByStatus>
            </div>
          )}
          {addTask === false && (
            <AddTaskBtn onClick={onClickAddTask}>Task 등록</AddTaskBtn>
          )}
        </TaskNav>
        {addTask ? (
          <AddTask
            labelersAll={labelersAll}
            setAllLabelers={setLabelersAll}
            tasksAll={tasksAll}
          />
        ) : sortHigh ? (
          sortedByStatusHigh.map(task => (
            <TaskContainer key={task._id} task={task} />
          ))
        ) : (
          sortedByStatusLow.map(task => (
            <TaskContainer key={task._id} task={task} />
          ))
        )}
      </InnerWrap>
    </>
  );
}

export async function getServerSideProps() {
  const allTasks = await client.query({
    query: GET_ALL_TASKS,
    fetchPolicy: 'network-only',
  });
  const allLabelers = await client.query({
    query: GET_ALL_LABELERS,
    fetchPolicy: 'network-only',
  });
  return {
    props: { allTasks, allLabelers },
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
