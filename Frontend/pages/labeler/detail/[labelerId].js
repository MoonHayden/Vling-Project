import { useRouter } from 'next/router';
import styled from 'styled-components';
import TaskList from './_components/TotalTasks';
import { useEffect, useState } from 'react';
import OngoingTasks from './_components/OngoingTasks';
import CompleteTasks from './_components/CompleteTasks';
import DeleteModal from './_components/DeleteModal';
import client from '../../../components/apollo-client';
import back from '../../../public/images/back.png';
import Image from 'next/image';
import { TOTAL_TASK_DETAIL_LIST } from '../../../components/gql';
import { ONGOING_TASK_LIST } from '../../../components/gql';
import { SEARCH_LABELER } from '../../../components/gql';
import LabelerInfo from './_components/LabelerInfo';

function labelerDetail(props) {
  const router = useRouter();
  const labelerId = router.query.labelerId;
  const [labelerInformation, setLabelerInformation] = useState({});
  const [labelersTasks, setLabelersTasks] = useState();
  const [totalTasks, setTotalTasks] = useState();

  useEffect(() => {
    setLabelersTasks(props.labelersTasks);
    setTotalTasks(props.totalTasks);
    setLabelerInformation(props.labelerInformation);
  }, [props.labelersTasks]);

  if (!totalTasks) return;

  const completedTasks = labelersTasks.filter(task => task.status);
  const ongoingTasks = labelersTasks.filter(task => !task.status);

  const backPage = () => {
    router.push('/labeler');
  };

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
        <LabelerInfo labelerInformation={labelerInformation} />
        <TaskContainer>
          <SubWrap>
            <OngoingTasks
              labelerId={labelerId}
              ongoingTasks={ongoingTasks}
              labelersTasks={labelersTasks}
              setLabelersTasks={setLabelersTasks}
              labelerInformation={labelerInformation}
            />
            <CompleteTasks
              completedTasks={completedTasks}
              labelerInformation={labelerInformation}
            />
          </SubWrap>
          <TaskListBox>
            <BoldText>테스크 리스트</BoldText>
            <TaskBox>
              <TaskList
                ongoingTasks={ongoingTasks}
                labelerInformation={labelerInformation}
                setLabelersTasks={setLabelersTasks}
                labelersTasks={labelersTasks}
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
  });

  const { data: getLabelersTasks } = await client.query({
    query: ONGOING_TASK_LIST,
    variables: { id: query.labelerId },
    fetchPolicy: 'network-only',
  });

  const { data: totalTasks } = await client.query({
    query: TOTAL_TASK_DETAIL_LIST,
    fetchPolicy: 'network-only',
  });

  return {
    props: {
      labelersTasks: getLabelersTasks.getLabelersTasks,
      totalTasks: totalTasks.getAllTasks,
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
  width: 45%;
`;

const ImageWrap = styled.span`
  cursor: pointer;
`;

const TopWrap = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
  margin-bottom: 0.5rem;
`;
