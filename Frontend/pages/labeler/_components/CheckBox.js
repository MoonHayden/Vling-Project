import React from 'react';
import checkBox from '../../../public/images/checkBox.png';
import blankBox from '../../../public/images/blankBox.png';
import Image from 'next/image';
import styled from 'styled-components';

const CheckBox = ({ isDeleteButtonClicked, isIncludeClickedLabelers }) => {
  const checkImage = isIncludeClickedLabelers ? checkBox : blankBox;

  return (
    <Wrap isDeleteButtonClicked={isDeleteButtonClicked}>
      <Image src={checkImage} alt="checkBox" />
    </Wrap>
  );
};

export default CheckBox;

const Wrap = styled.span`
  margin-right: 0.4rem;

  visibility: ${({ isDeleteButtonClicked }) =>
    isDeleteButtonClicked ? 'visible' : 'hidden'};
`;
