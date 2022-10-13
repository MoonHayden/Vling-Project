import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { TASK_DETAIL, GET_ALL_LABELERS } from '../../../components/gql';
import DetailNav from './components/DetailNav';
import CurrLabelersList from './components/CurrLabelersList';
import AllLabelersList from './components/AllLabelersList';
import client from '../../../components/apollo-client';

export default function TaskDetail({ taskName, allLabelers, taskInfo }) {
  const [taskDetail, setTaskDetail] = useState([]);
  const [currLabelersList, setCurrLabelersList] = useState([]);
  const [labelersList, setLabelersList] = useState([]);

  useEffect(() => {
    setTaskDetail(taskInfo?.data?.getTaskDetail);
    setCurrLabelersList(taskInfo?.data?.getTaskDetail?.labelers);
    setLabelersList(allLabelers?.data?.getAllLabelers);
  }, [
    taskInfo?.data?.getTaskDetail,
    taskInfo?.data?.getTaskDetail?.labelers,
    allLabelers?.data?.getAllLabelers,
  ]);

  return (
    <>
      <InnerWrap>
        <DetailNav taskName={taskName} taskDetail={taskDetail} />
        <LabelersInfoWrap>
          <CurrLabelersList
            taskName={taskName}
            currLabelersList={currLabelersList}
            setCurrLabelersList={setCurrLabelersList}
          />
          <AllLabelersList
            taskName={taskName}
            allLabelers={labelersList}
            currLabelersList={currLabelersList}
            setCurrLabelersList={setCurrLabelersList}
          />
        </LabelersInfoWrap>
        <ProgressInfo>
          <RateNumber>
            {((taskDetail?.doneVideos / taskDetail?.totalVideos) * 100).toFixed(
              2
            )}
            %
          </RateNumber>
          <ProgressWrap>
            <FullBar status={taskDetail?.status}></FullBar>
            <RateBar
              status={taskDetail?.status}
              rate={Math.round(
                (taskDetail.doneVideos / taskDetail?.totalVideos) * 100
              )}
            ></RateBar>
          </ProgressWrap>
        </ProgressInfo>
      </InnerWrap>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const taskInfo = await client.query({
    query: TASK_DETAIL,
    variables: { name: params.taskName },
    fetchPolicy: 'network-only',
  });

  const allLabelers = await client.query({
    query: GET_ALL_LABELERS,
    fetchPolicy: 'network-only',
  });

  const taskName = params.taskName;

  return {
    props: { taskName, allLabelers, taskInfo },
  };
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

const LabelersInfoWrap = styled.div`
  width: 100%;
  height: 70%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 20px;
`;

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
  border: 0.5px solid
    ${props =>
      props.status
        ? 'linear-gradient(.25turn, #b0ff57, 50%, #32cb00)'
        : 'linear-gradient(.25turn, #ffff56, 50%, #c7b800)'};
  background-color: none;
`;

const RateBar = styled.div`
  position: relative;
  max-width: ${props => props.rate}%;
  height: 1rem;
  border: 0.5px solid
    ${props =>
      props.status
        ? 'linear-gradient(.25turn, #b0ff57, 50%, #32cb00)'
        : 'linear-gradient(.25turn, #ffff56, 50%, #c7b800)'};
  background: ${props =>
    props.status
      ? 'linear-gradient(.25turn, #b0ff57, 50%, #32cb00)'
      : 'linear-gradient(.25turn, #ffff56, 50%, #c7b800)'};
`;
