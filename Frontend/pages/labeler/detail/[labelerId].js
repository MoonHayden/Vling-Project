import { useRouter } from 'next/router';
import styled from 'styled-components';
import TaskList from './_components/TotalTasks';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import OngoingTasks from './_components/OngoingTasks';
import CompleteTasks from './_components/CompleteTasks';
import DeleteModal from './_components/DeleteModal';
import client from '../../../components/apollo-client';
import { TASK_OF_LABELER_DELETE } from './_components/OngoingTasks';
import back from '../../../public/images/back.png';
import Image from 'next/image';

const TOTAL_TASK_LIST = gql`
  query GetAllTasks {
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
const ONGOING_TASK_LIST = gql`
  query GetLabelersTasks($labeler: String) {
    getLabelersTasks(labeler: $labeler) {
      name
      kind
      expiration_date
      labelers {
        labeler
      }
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
    router.replace(`/task/${taskName}`);
  };

  const backPage = () => {
    router.push('/labeler');
  };

  useEffect(() => {
    setOngoingTasks(props.ongoingTasks);
    setTotalTasks(props.total_tasks.getAllTasks);
  }, [props.ongoingTasks]);

  return (
    <>
      <Wrap>
        <TopWrap>
          <ImageWrap>
            <Image
              src={back}
              alt="back"
              width={40}
              height={40}
              onClick={() => backPage()}
            />
          </ImageWrap>
          <TitleWrap>
            <Email>Email: {labelerId}</Email>
            <DeleteBtn onClick={() => setIsModalOpen(true)}>
              라벨러 삭제
            </DeleteBtn>
          </TitleWrap>
        </TopWrap>
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
            <TaskBox>
              <TaskList
                goToTaskDetail={goToTaskDetail}
                setOngoingTasks={setOngoingTasks}
                ongoingTasks={ongoingTasks}
                // taskData={props.data.tasks}
                totalTasks={totalTasks}
                labelerId={labelerId}
              />
            </TaskBox>
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
  const { query } = context;

  const { data: getLabelersTasks } = await client.query({
    query: ONGOING_TASK_LIST,
    variables: { labeler: query.labelerId },
    fetchPolicy: 'network-only',
  });

  const { data: totalTasks } = await client.query({
    query: TOTAL_TASK_LIST,
    fetchPolicy: 'network-only',
  });
  return {
    props: {
      ongoingTasks: getLabelersTasks.getLabelersTasks,
      total_tasks: totalTasks,
    },
  };
}

const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  position: relative;
`;

const TitleWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-left: 1rem;
`;

const Email = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const TaskContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const TaskListBox = styled.div`
  width: 45%;
`;

const TaskBox = styled.ul`
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

const DeleteBtn = styled.button``;

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

const ImageWrap = styled.span`
  cursor: pointer;
`;

const TopWrap = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
  margin-bottom: 4rem;
  /* justify-content: space-between; */
`;
