import React from 'react';
import CheckBox from './CheckBox';
import { useRouter } from 'next/router';

import styled from 'styled-components';

const LabelerInfo = ({
  labeler,
  value,
  isDeleteButtonClicked,
  clickedLabelersForDelete,
  setClickedLabelersForDelete,
}) => {
  const router = useRouter();

  function labelerClickHandler() {
    if (isDeleteButtonClicked) {
      setClickedLabelersForDelete({
        ...clickedLabelersForDelete,
        [labeler]: !clickedLabelersForDelete[labeler],
      });
    } else {
      const url = `/labeler/detail/${labeler}`;
      router.push(url);
    }
  }

  return (
    <Wrap onClick={labelerClickHandler}>
      <SubWrap>
        <CheckBox
          labeler={labeler}
          isDeleteButtonClicked={isDeleteButtonClicked}
          clickedLabelersForDelete={clickedLabelersForDelete}
          setClickedLabelersForDelete={setClickedLabelersForDelete}
        />
        <div>{labeler}</div>
      </SubWrap>
      <div>{value}</div>
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

  :hover {
    opacity: 0.85;
  }
`;

const SubWrap = styled.div`
  display: flex;
`;
