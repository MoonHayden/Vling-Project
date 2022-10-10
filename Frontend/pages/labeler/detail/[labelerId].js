import { useRouter } from 'next/router';
import styled from 'styled-components';
import TaskList from './_components/TotalTasks';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import OngoingTasks from './_components/OngoingTasks';
import CompleteTasks from './_components/CompleteTasks';
import DeleteModal from './_components/DeleteModal';
import client from '../../../components/apollo-client';
import back from '../../../public/images/back.png';
import Image from 'next/image';
import { TOTAL_TASK_LIST } from '../../../components/gql';
import { ONGOING_TASK_LIST } from '../../../components/gql';
import { SEARCH_LABELER } from '../../../components/gql';

function labelerDetail(props) {
  const router = useRouter();
  const labelerId = router.query.labelerId;
  const [labelerInformation, setLabelerInformation] = useState({});
  const [ongoingTasks, setOngoingTasks] = useState();
  const [totalTasks, setTotalTasks] = useState();

  const goToTaskDetail = taskName => {
    router.replace(`/task/${taskName}`);
  };

  const backPage = () => {
    router.push('/labeler');
  };

  var today = new Date(labelerInformation.created_at);
  console.log(today);

  useEffect(() => {
    setOngoingTasks(props.ongoingTasks);
    setTotalTasks(props.total_tasks.getAllTasks);
    setLabelerInformation(props.labelerInformation);
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
            <Email>Email: {labelerInformation.email}</Email>
            <DeleteModal labelerInformation={labelerInformation} />
          </TitleWrap>
        </TopWrap>
        <TaskContainer>
          <SubWrap>
            <OngoingTasks
              labelerId={labelerId}
              goToTaskDetail={goToTaskDetail}
              ongoingTasks={ongoingTasks}
              setOngoingTasks={setOngoingTasks}
              labelerInformation={labelerInformation}
            />
            <CompleteTasks goToTaskDetail={goToTaskDetail} />
          </SubWrap>
          <TaskListBox>
            <ListBoxTitle>
              <BoldText>테스크 리스트</BoldText>
            </ListBoxTitle>
            <TaskBox>
              <TaskList
                labelerInformation={labelerInformation}
                goToTaskDetail={goToTaskDetail}
                setOngoingTasks={setOngoingTasks}
                ongoingTasks={ongoingTasks}
                totalTasks={totalTasks}
                labelerId={labelerId}
              />
            </TaskBox>
          </TaskListBox>
        </TaskContainer>
      </Wrap>
    </>
  );
}

export default labelerDetail;

export async function getServerSideProps(context) {
  const { query } = context;

  const { data: labelerInformation } = await client.query({
    query: SEARCH_LABELER,
    variables: { id: query.labelerId },
    fetchPolicy: 'network-only',
  });

  const { data: getLabelersTasks } = await client.query({
    query: ONGOING_TASK_LIST,
    variables: { id: query.labelerId },
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
      labelerInformation: labelerInformation.searchLabeler[0],
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

const SubWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
`;

const ImageWrap = styled.span`
  cursor: pointer;
`;

const TopWrap = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
  margin-bottom: 4rem;
`;
