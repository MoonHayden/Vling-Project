import { useRouter } from 'next/router';
import styled from 'styled-components';
import TaskList from './_components/TotalTasks';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import OngoingTasks from './_components/OngoingTasks';
import sehanClient from '../../../components/apollo-client-sehan';
import CompleteTasks from './_components/CompleteTasks';
import DeleteModal from './_components/DeleteModal';
import client from '../../../components/apollo-client';

const TASK_LIST_GET = gql`
  query {
    tasks {
      name
      id
    }
  }
`;

const ONGOING_TASK_LIST = gql`
  query Query($labeler: String) {
    searchLabelers(labeler: $labeler) {
      task {
        name
      }
    }
  }
`;

const TOTAL_TASK_LIST = gql`
  query Query {
    getAllTasks {
      _id
      name
      attendents
      kind
      labelers {
        labeler
      }
      status
      expiration_date
      rate
    }
  }
`;

function labelerDetail(props) {
  const router = useRouter();
  const labelerId = router.query.labelerId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ongoingTasks, setOngoingTasks] = useState();
  const [totalTasks, setTotalTasks] = useState();
  const goToTaskDetail = taskName => {
    router.push(`/task/${taskName}`);
  };

  useEffect(() => {
    setOngoingTasks(props.data.searchLabelers[0].task);
    setTotalTasks(props.total_tasks.getAllTasks);
  }, []);

  return (
    <>
      <Wrap>
        <TitleWrap>
          <Email>Email: {labelerId}</Email>
          <DeleteBtn onClick={() => setIsModalOpen(true)}>
            라벨러 삭제
          </DeleteBtn>
        </TitleWrap>
        <TaskContainer>
          <SubWrap>
            <OngoingTasks
              labelerId={labelerId}
              goToTaskDetail={goToTaskDetail}
              ongoingTasks={ongoingTasks}
              setOngoingTasks={setOngoingTasks}
            />
            <CompleteTasks goToTaskDetail={goToTaskDetail} />
          </SubWrap>
          <TaskListBox>
            <ListBoxTitle>
              <BoldText>테스크 리스트</BoldText>
            </ListBoxTitle>
            <TotalTasks>
              <TaskList
                setOngoingTasks={setOngoingTasks}
                ongoingTasks={ongoingTasks}
                // taskData={props.data.tasks}
                totalTasks={totalTasks}
              />
            </TotalTasks>
          </TaskListBox>
        </TaskContainer>
      </Wrap>
      <ModalWrap isModalOpen={isModalOpen}>
        <DeleteModal labelerId={labelerId} setIsModalOpen={setIsModalOpen} />
      </ModalWrap>
    </>
  );
}

export default labelerDetail;

export async function getServerSideProps(context) {
  // return {
  //   props: {
  //     data: { data: { tasks: 'tmp' } },
  //   },
  // };

  const { query } = context;
  const ongoing_tasks = await client.query({
    query: ONGOING_TASK_LIST,
    variables: { labeler: query.labelerId },
    fetchPolicy: 'no-cache',
  });

  const totalTasks = await client.query({
    query: TOTAL_TASK_LIST,
    fetchPolicy: 'no-cache',
  });

  // const { data } = await sehanClient.query({
  //   query: TASK_LIST_GET,
  // });

  return {
    props: {
      data: ongoing_tasks.data,
      total_tasks: totalTasks.data,
    },
  };
}

const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Wrap = styled.div`
  width: 90%;
  height: 90%;
  padding: 1rem;
  position: relative;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Email = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4rem;
`;

const TaskContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TaskListBox = styled.div`
  width: 45%;
`;

const TotalTasks = styled.ul`
  margin-top: 1rem;
  padding: 1rem;
  height: 20rem;
  background-color: white;
  overflow: auto;
`;

const ListBoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteBtn = styled.button`
  position: absolute;
  right: 1rem;
`;

const SelectedText = styled.div`
  color: #08088a;
  font-weight: bold;
`;

const SubWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: ${({ isModalOpen }) => (isModalOpen ? 'block' : 'none')};
`;
