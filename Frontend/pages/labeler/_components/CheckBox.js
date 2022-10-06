import React from 'react';
import checkBox from '../../../public/images/checkBox.png';
import blankBox from '../../../public/images/blankBox.png';
import Image from 'next/image';
import styled from 'styled-components';

const CheckBox = ({
  labeler,
  isDeleteButtonClicked,
  clickedLabelersForDelete,
}) => {
  const isCheck = clickedLabelersForDelete[labeler] ? checkBox : blankBox;

  return (
    <Wrap isDeleteButtonClicked={isDeleteButtonClicked}>
      <Image src={isCheck} alt="checkBox" />
    </Wrap>
  );
};

export default CheckBox;

const Wrap = styled.span`
  visibility: ${({ isDeleteButtonClicked }) =>
    isDeleteButtonClicked ? 'visible' : 'hidden'};

  margin-right: 0.4rem;
`;
