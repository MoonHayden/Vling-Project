import React from 'react';
import CheckBox from './CheckBox';
import { useRouter } from 'next/router';

import styled from 'styled-components';

const Labeler = ({
  _id,
  email,
  value,
  progress,
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
        <Email>{email}</Email>
      </SubWrap>
      <DD>
        <Divv>{value}</Divv>
        <Progess>{progress}</Progess>
      </DD>
    </Wrap>
  );
};

export default Labeler;

const Wrap = styled.div`
  width: 100%;
  height: 4rem;
  background-color: white;
  display: flex;
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
  width: 75%;
`;

const Progess = styled.div``;
const Email = styled.div``;
const Divv = styled.div``;
const DD = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
`;
