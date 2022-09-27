import Link from 'next/link';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

export default function TaskContainer({ task }) {
  const { id, name, numVideos, labeler, status, rate } = task;
  return (
    <>
      <Link href={`/task/${id}`}>
        <TaskWrap>
          <StatusWrap>
            <Status status={status}></Status>
          </StatusWrap>
          <TaskInfo>
            <FolderIcon src="./images/folder.png" alt="folderIcon" />
            <NumOfVideos>#videos : {numVideos}</NumOfVideos>
            <NumOfVideos>#labelers : {labeler}</NumOfVideos>
          </TaskInfo>
          <ProgressInfo>
            <TaskName>{name}</TaskName>
            <ProgressWrap>
              <FullBar status={status}></FullBar>
              <RateBar status={status} rate={rate}></RateBar>
            </ProgressWrap>
            <RateNumber>{Math.round(rate)}%</RateNumber>
          </ProgressInfo>
        </TaskWrap>
      </Link>
    </>
  );
}

const TaskWrap = styled.div`
  width: 30%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  background-color: #ffffff;
  cursor: pointer;
`;

const StatusWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0 0 0.5rem;
`;

const Status = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${props => (props.status ? '#4cd137' : '#fbc531')};
`;

/*
const DeleteBtn = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  cursor: pointer;
`;
*/

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FolderIcon = styled.img`
  width: 10%;
`;

const NumOfVideos = styled.p`
  margin: 0;
  font-size: 14px;
  color: #7f8c8d;
`;

const ProgressInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskName = styled.h4`
  margin: 0;
  font-weight: bold;
`;

const ProgressWrap = styled.div`
  position: relative;
  width: 50%;
  margin: 10px 0;
`;

const RateNumber = styled.p`
  font-size: 14px;
  color: #353b48;
`;

const FullBar = styled.div`
  position: absolute;
  max-width: 100%;
  height: 0.2rem;
  border: 0.5px solid ${props => (props.status ? '#4cd137' : '#fbc531')};
  background-color: none;
`;

const RateBar = styled.div`
  position: relative;
  max-width: ${props => props.rate}%;
  height: 0.2rem;
  border: 0.5px solid ${props => (props.status ? '#4cd137' : '#fbc531')};
  background-color: ${props => (props.status ? '#4cd137' : '#fbc531')};
`;
