import React from 'react';
import CheckBox from './CheckBox';
import { useRouter } from 'next/router';

import styled from 'styled-components';

const Labeler = ({
  email,
  value,
  isDeleteButtonClicked,
  clickedLabelersForDelete,
  setClickedLabelersForDelete,
}) => {
  const router = useRouter();
  const url = `/labeler/detail/${email}`;

  function labelerClickHandler() {
    isDeleteButtonClicked ? sortLabelers() : router.push(url);
  }

  function sortLabelers() {
    if (clickedLabelersForDelete.includes(email)) {
      const filteredLabelers = clickedLabelersForDelete.filter(
        clickedLabeler => clickedLabeler !== email
      );
      setClickedLabelersForDelete(filteredLabelers);
    } else {
      setClickedLabelersForDelete([...clickedLabelersForDelete, email]);
    }
  }

  return (
    <Wrap onClick={labelerClickHandler}>
      <SubWrap>
        <CheckBox
          email={email}
          isDeleteButtonClicked={isDeleteButtonClicked}
          clickedLabelersForDelete={clickedLabelersForDelete}
          setClickedLabelersForDelete={setClickedLabelersForDelete}
        />
        <div>{email}</div>
      </SubWrap>
      <div>{value}</div>
    </Wrap>
  );
};

export default Labeler;

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
