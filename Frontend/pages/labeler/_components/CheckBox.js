import React from 'react';
import checkBox from '../../../public/images/checkBox.png';
import blankBox from '../../../public/images/blankBox.png';
import Image from 'next/image';
import styled from 'styled-components';

const CheckBox = ({ _id, clickedDeleteBtn, selectedLabeler }) => {
  console.log(selectedLabeler);
  console.log(selectedLabeler[_id]);
  const isCheck = selectedLabeler[_id] ? checkBox : blankBox;

  return (
    <Wrap clickedDeleteBtn={clickedDeleteBtn}>
      <Image src={isCheck} alt="checkBox" />
    </Wrap>
  );
};

export default CheckBox;

const Wrap = styled.span`
  visibility: ${({ clickedDeleteBtn }) =>
    clickedDeleteBtn ? 'visible' : 'hidden'};

  margin-right: 0.4rem;
`;
