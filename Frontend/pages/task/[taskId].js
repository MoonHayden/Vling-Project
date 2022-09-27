import styled from 'styled-components';
import { useQuery, useMutation, gql } from '@apollo/client';

const TASK_DETAIL = gql`
  query getTaskDetail($name: String!) {
    taskDetail(name: $name) {
      id
      name
      kind
      labelers
      exp_date
      status
      rate
    }
  }
`;

const DELETE_TASK = gql`
  mutation Mutation($name: String) {
    deleteTask(name: $name) {
      id
      name
      numVideos
      labeler
      status
      rate
    }
  }
`;

const LABELER_LIST = gql`
  query getLabelerList {
    labelings {
      _id
      labeler
      value
    }
  }
`;

export default function TaskDetail({ taskId }) {
  const { data: taskDetail } = useQuery(TASK_DETAIL, {
    variables: { name: '영상목록' + taskId },
  });

  const { data: labelers } = useQuery(LABELER_LIST);
  console.log(labelers);

  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: { name: '영상목록' + taskId },
  });

  if (taskDetail === undefined) return;
  console.log(taskDetail.taskDetail[0].labelers.length);

  return (
    <>
      <InnerWrap data={taskDetail}>
        <DetailTop>
          <TaskInfo>
            <TaskName>{taskDetail.taskDetail[0].name}</TaskName>
            <TaskCategory>Kind: {taskDetail.taskDetail[0].kind}</TaskCategory>
            <ExpireDate>
              Exp.Date: {taskDetail.taskDetail[0].exp_date}
            </ExpireDate>
          </TaskInfo>
          <DeleteBtn onClick={deleteTask}>Task 삭제</DeleteBtn>
        </DetailTop>
        <LabelersInfoWrap>
          <CurrentLabelers>
            <ol>
              Current Labelers ({taskDetail.taskDetail[0].labelers.length}):
              {taskDetail?.taskDetail?.[0]?.labelers?.map((labeler, index) => (
                <li key={index}>{labeler}</li>
              ))}
            </ol>
          </CurrentLabelers>
          <LabelerListWrap>
            <LabelerListNav>
              <NavName>Name:</NavName>
              <NavName>Email:</NavName>
              <NavName>Add:</NavName>
            </LabelerListNav>
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
        </LabelersInfoWrap>
        <ProgressInfo>
          <RateNumber>{Math.round(taskDetail.taskDetail[0].rate)}%</RateNumber>
          <ProgressWrap>
            <FullBar status={taskDetail.taskDetail[0].status}></FullBar>
            <RateBar
              status={taskDetail.taskDetail[0].status}
              rate={taskDetail.taskDetail[0].rate}
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

const DeleteBtn = styled.button`
  margin-right: 5px;
  cursor: pointer;
`;

const LabelersInfoWrap = styled.div`
  width: 100%;
  height: 70%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 5px;
`;

const CurrentLabelers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const LabelerListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

export function getServerSideProps({ query: { taskId } }) {
  return {
    props: { taskId },
  };
}
