import { useRouter } from 'next/router';
import styled from 'styled-components';
import TaskList from './_components/TaskList';
import { useState } from 'react';
import { gql } from '@apollo/client';
import client from '../../components/apollo-client';
import OngoingTasks from './_components/OngoingTasks';

function labelerDetail() {
  const router = useRouter();
  const labelerId = router.query.labelerId;

  const [selectedTask, setSelectedTask] = useState('');

  return (
    <Wrap>
      <InfoContainer>
        <Email>ID: {labelerId}</Email>
        <OngoingTasks />
      </InfoContainer>
      <TaskContainer>
        <DeleteBtn>라벨러 삭제</DeleteBtn>
        <TaskListBox>
          <ListBoxTitle>
            <BoldText>테스크 리스트</BoldText>
            <SelectedText>{selectedTask}</SelectedText>
            <button>추가</button>
          </ListBoxTitle>
          <TotalTasks>
            <TaskList
              // taskData={props.data.tasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
            />
          </TotalTasks>
        </TaskListBox>
      </TaskContainer>
    </Wrap>
  );
}

export default labelerDetail;

// export async function getServerSideProps() {
//   const { data } = await client.query({
//     query: GET,
//   });

//   return {
//     props: {
//       data: data,
//     },
//   };
// }

// ///////// graphQL ///////////
// const GET = gql`
//   query {
//     tasks {
//       name
//       id
//     }
//   }
// `;

///// 스타일컴포넌트 //////
const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Wrap = styled.div`
  width: 90%;
  height: 90%;
  padding: 1rem;
  display: flex;
  position: relative;
`;

const InfoContainer = styled.div`
  width: 50%;
`;

const Email = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4rem;
`;

const TaskContainer = styled.div`
  width: 50%;
`;

const TaskListBox = styled.div`
  margin-top: 5rem;
`;

const TotalTasks = styled.ul`
  padding: 1rem;
  height: 20rem;
  background-color: white;
  overflow: auto;
`;

const ListBoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const DeleteBtn = styled.button`
  position: absolute;
  right: 1rem;
`;

const SelectedText = styled.div`
  color: #08088a;
  font-weight: bold;
`;
