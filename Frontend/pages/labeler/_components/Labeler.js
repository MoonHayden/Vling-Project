import React from 'react';
import CheckBox from './CheckBox';
import { useRouter } from 'next/router';

import styled from 'styled-components';

const Labeler = ({
  _id,
  email,
  value,
  isDeleteButtonClicked,
  clickedLabelers,
  setClickedLabelers,
}) => {
  const router = useRouter();
  const url = `/labeler/detail/${_id}`;

  function labelerClickHandler() {
    isDeleteButtonClicked ? sortLabelers() : router.push(url);
  }

  const isIncludeClickedLabelers = clickedLabelers.some(
    labeler => labeler.id === _id
  );

  const filteredLabelers = clickedLabelers.filter(
    labeler => labeler.id !== _id
  );

  function sortLabelers() {
    if (isIncludeClickedLabelers) {
      setClickedLabelers(filteredLabelers);
    } else {
      setClickedLabelers([...clickedLabelers, { email: email, id: _id }]);
    }
  }

  return (
    <Wrap onClick={labelerClickHandler}>
      <SubWrap>
        <CheckBox
          email={email}
          isDeleteButtonClicked={isDeleteButtonClicked}
          clickedLabelers={clickedLabelers}
          isIncludeClickedLabelers={isIncludeClickedLabelers}
          setClickedLabelers={setClickedLabelers}
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
