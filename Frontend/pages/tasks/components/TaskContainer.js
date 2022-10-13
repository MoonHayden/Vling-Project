import Link from 'next/link';
import styled from 'styled-components';

export default function TaskContainer({ task }) {
  const { name, labelers, totalVideos, doneVideos, status } = task;
  return (
    <>
      <Link href={`/tasks/detail/${name}`}>
        <TaskWrap>
          <StatusWrap>
            <Status status={status}></Status>
          </StatusWrap>
          <TaskInfo>
            <FolderIcon src="./images/folder.png" alt="folderIcon" />
            <NumOfVideos># Videos : {totalVideos}</NumOfVideos>
            <NumOfVideos># Labelers : {labelers?.length}</NumOfVideos>
          </TaskInfo>
          <ProgressInfo>
            <TaskName>{name}</TaskName>
            <ProgressWrap>
              <FullBar status={status}></FullBar>
              <RateBar
                status={status}
                rate={(doneVideos / totalVideos) * 100}
              ></RateBar>
            </ProgressWrap>
            <RateNumber>
              {Math.round((doneVideos / totalVideos) * 100)}%
            </RateNumber>
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
  border-radius: 5px;
  cursor: pointer;
  &:active {
    transform: scale(0.99);
  }
`;

const StatusWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0 0 0.5rem;
`;

const Status = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => (props.status ? '#32cb00' : '#ffea00')};
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FolderIcon = styled.img`
  width: 10%;
  margin-bottom: 10px;
`;

const NumOfVideos = styled.p`
  margin-bottom: 5px;
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
  margin-bottom: 5px;
  font-size: 14px;
  color: #353b48;
`;

const FullBar = styled.div`
  position: absolute;
  max-width: 100%;
  height: 0.2rem;
  border: 0.5px solid ${props => (props.status ? '#32cb00' : '#ffea00')};
  background-color: none;
`;

const RateBar = styled.div`
  position: relative;
  max-width: ${props => props.rate}%;
  height: 0.2rem;
  border: 0.5px solid ${props => (props.status ? '#32cb00' : '#ffea00')};
  background-color: ${props => (props.status ? '#32cb00' : '#ffea00')};
`;
