import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import TaskContainer from '../components/TaskContainer';

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
  const { data } = useQuery(TASKS);
  return (
    <>
      <InnerWrap data={data}>
        {data?.tasks?.map(task => (
          <TaskContainer key={task.id} task={task} />
        ))}
      </InnerWrap>
    </>
  );
}

const InnerWrap = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  overflow-y: scroll;
`;
