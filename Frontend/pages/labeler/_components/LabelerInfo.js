import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const LabelerInfo = ({ labeler, value, _id }) => {
  const router = useRouter();

  function routerHandler() {
    const path = `/labeler/${_id}`;
    router.push(path);
  }

  return (
    <Wrap onClick={routerHandler}>
      <Email>{labeler}</Email>
      <InfoWrap>
        <div>3</div>
        <div>{value}</div>
      </InfoWrap>
    </Wrap>
  );
};

export default LabelerInfo;

const Wrap = styled.div`
  width: 100%;
  height: 4rem;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;

  cursor: pointer;
`;

const Email = styled.div``;

const InfoWrap = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
`;
