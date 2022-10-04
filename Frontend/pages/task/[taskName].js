import styled from 'styled-components';
import Link from 'next/link';
import { useQuery, useMutation, gql } from '@apollo/client';
import client from '../../components/apollo-client';

const TASK_DETAIL = gql`
  query ($name: String!) {
    getTaskDetail(name: $name) {
      name
      kind
      labelers {
        labeler
        value
      }
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

const DELETE_TASK = gql`
  mutation ($name: String!) {
    deleteTask(name: $name) {
      name
    }
  }
`;

/*
const DELETE_LABELER = gql`
  mutation deleteLabeler {

  }
`;
*/

const COMPLETE_TASK = gql`
  mutation {
    completeTask {
      id
      value
    }
  }
`;

export default function TaskDetail({ params, allLabelers }) {
  const { data: taskDetail } = useQuery(TASK_DETAIL, {
    variables: { name: params.taskName },
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: { name: params.taskName },
  });

  const [completeTask] = useMutation(COMPLETE_TASK, {
    variables: { value: true },
  });

  if (taskDetail === undefined) return;

  return (
    <>
      <InnerWrap data={taskDetail}>
        <DetailTop>
          <TaskInfo>
            <TaskName>{taskDetail.getTaskDetail.name}</TaskName>
            <TaskCategory>Kind: {taskDetail.getTaskDetail.kind}</TaskCategory>
            <ExpireDate>
              Exp.Date: {taskDetail.getTaskDetail.exp_date}
            </ExpireDate>
          </TaskInfo>
          <ButtonsWrap>
            <Link href="/tasks">
              <GoBackBtn>뒤로가기</GoBackBtn>
            </Link>
            <DeleteBtn onClick={deleteTask}>Task 삭제</DeleteBtn>
            <CompleteBtn
              disabled={
                Math.round(taskDetail.getTaskDetail.rate) == 100 &&
                taskDetail.getTaskDetail.status === false
                  ? false
                  : true
              }
            >
              Task 완료
            </CompleteBtn>
          </ButtonsWrap>
        </DetailTop>
        <LabelersInfoWrap>
          <CurrentLabelersWrap>
            <CurrentLabelersTitle>
              Current Labelers ({taskDetail.getTaskDetail.labelers.length}):
            </CurrentLabelersTitle>
            <CurrentLabelers>
              {taskDetail?.getTaskDetail?.labelers?.map((labeler, index) => (
                <CurrentListWrap key={index}>
                  <LabelerListNav>
                    <LabelerName>{labeler.labeler}</LabelerName>
                    <LabelerName>wonho@email.com</LabelerName>
                    <AddButton>삭제</AddButton>
                  </LabelerListNav>
                </CurrentListWrap>
              ))}
            </CurrentLabelers>
          </CurrentLabelersWrap>
          <ListWrap>
            <LabelerListNav>
              <NavName>Name:</NavName>
              <NavName>Email:</NavName>
              <NavName>Add:</NavName>
            </LabelerListNav>
            <LabelerListWrap>
              <LabelerWrap>
                <LabelerName>Wonho</LabelerName>
                <LabelerName>wonho@email.com</LabelerName>
                <AddButton>추가</AddButton>
              </LabelerWrap>
              <LabelerWrap>
                <LabelerName>JoonKi</LabelerName>
                <LabelerName>joonki@email.com</LabelerName>
                <AddButton>추가</AddButton>
              </LabelerWrap>
              <LabelerWrap>
                <LabelerName>Bosung</LabelerName>
                <LabelerName>bosung@email.com</LabelerName>
                <AddButton>추가</AddButton>
              </LabelerWrap>
              <LabelerWrap>
                <LabelerName>Sehan</LabelerName>
                <LabelerName>sehan@email.com</LabelerName>
                <AddButton>추가</AddButton>
              </LabelerWrap>
              <LabelerWrap>
                <LabelerName>Yerin</LabelerName>
                <LabelerName>yerin@email.com</LabelerName>
                <AddButton>추가</AddButton>
              </LabelerWrap>
              <LabelerWrap>
                <LabelerName>Wonho</LabelerName>
                <LabelerName>wonho@email.com</LabelerName>
                <AddButton>추가</AddButton>
              </LabelerWrap>
              <LabelerWrap>
                <LabelerName>JoonKi</LabelerName>
                <LabelerName>joonki@email.com</LabelerName>
                <AddButton>추가</AddButton>
              </LabelerWrap>
              <LabelerWrap>
                <LabelerName>Bosung</LabelerName>
                <LabelerName>bosung@email.com</LabelerName>
                <AddButton>추가</AddButton>
              </LabelerWrap>
              <LabelerWrap>
                <LabelerName>Sehan</LabelerName>
                <LabelerName>sehan@email.com</LabelerName>
                <AddButton>추가</AddButton>
              </LabelerWrap>
              <LabelerWrap>
                <LabelerName>Yerin</LabelerName>
                <LabelerName>yerin@email.com</LabelerName>
                <AddButton>추가</AddButton>
              </LabelerWrap>
            </LabelerListWrap>
          </ListWrap>
        </LabelersInfoWrap>
        <ProgressInfo>
          <RateNumber>{Math.round(taskDetail.getTaskDetail.rate)}%</RateNumber>
          <ProgressWrap>
            <FullBar status={taskDetail.getTaskDetail.status}></FullBar>
            <RateBar
              status={taskDetail.getTaskDetail.status}
              rate={taskDetail.getTaskDetail.rate}
            ></RateBar>
          </ProgressWrap>
        </ProgressInfo>
      </InnerWrap>
    </>
  );
}

const InnerWrap = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
`;

const DetailTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ExpireDate = styled.p`
  font-size: 14px;
  color: #353b48;
`;

const TaskCategory = styled(ExpireDate)`
  margin-bottom: 5px;
  font-size: 14px;
  color: #353b48;
`;

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const GoBackBtn = styled.button`
  margin-right: 5px;
  cursor: pointer;
`;

const DeleteBtn = styled(GoBackBtn)`
  margin-top: 3px;
`;

const CompleteBtn = styled.button`
  margin-right: 5px;
  margin-top: 3px;
  cursor: ${props => (props.disabled ? 'null' : 'pointer')};
`;

const LabelersInfoWrap = styled.div`
  width: 100%;
  height: 70%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 20px;
`;

const CurrentLabelersWrap = styled.div``;

const CurrentLabelers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 70%;
  overflow-y: scroll;
`;

const CurrentLabelersTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: bold;
`;

const CurrentListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const LabelerListWrap = styled(CurrentListWrap)`
  height: 70%;
  background-color: #dcdde1;
  overflow-y: scroll;
`;

const LabelerListNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 1rem;
  border-bottom: 1px solid #fff;
`;

const ListWrap = styled.div``;

const NavName = styled.p`
  font-weight: bold;
`;

const LabelerWrap = styled(LabelerListNav)``;

const LabelerName = styled.p``;

const AddButton = styled.button``;

const ProgressInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
`;

const RateNumber = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #353b48;
`;

const FullBar = styled.div`
  position: absolute;
  max-width: 100%;
  height: 1rem;
  border: 0.5px solid ${props => (props.status ? '#4cd137' : '#fbc531')};
  background-color: none;
`;

const RateBar = styled.div`
  position: relative;
  max-width: ${props => props.rate}%;
  height: 1rem;
  border: 0.5px solid ${props => (props.status ? '#4cd137' : '#fbc531')};
  background-color: ${props => (props.status ? '#4cd137' : '#fbc531')};
`;

export async function getServerSideProps({ params }) {
  /*
  const taskDetail = await client.query(
    { query: TASK_DETAIL },
    { variables: { name: params.taskName } }
  );
  */

  const allLabelers = await client.query({ query: LABELER_LIST });
  return {
    props: { params, allLabelers },
  };
}
