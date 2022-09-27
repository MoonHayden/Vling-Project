import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import CheckBox from './CheckBox';

const LabelerInfo = ({
  labeler,
  value,
  _id,
  clickedDeleteBtn,
  selectedLabeler,
  setSelectedLabeler,
}) => {
  const router = useRouter();

  function eventHandler() {
    if (clickedDeleteBtn) {
      setSelectedLabeler({
        ...selectedLabeler,
        [labeler]: !selectedLabeler[labeler],
      });
    } else {
      const url = `/labeler/detail/${labeler}`;
      const as = `/labeler/detail`;
      router.push(url);
    }
  }

  return (
    <Wrap onClick={eventHandler}>
      <SubWrap>
        <CheckBox
          labeler={labeler}
          clickedDeleteBtn={clickedDeleteBtn}
          selectedLabeler={selectedLabeler}
          setSelectedLabeler={setSelectedLabeler}
        />
        <Email>{labeler}</Email>
      </SubWrap>
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
  padding: 10px 40px 10px 6px;

  cursor: pointer;
`;

const Email = styled.div``;

const InfoWrap = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
`;

const SubWrap = styled.div`
  display: flex;
`;
