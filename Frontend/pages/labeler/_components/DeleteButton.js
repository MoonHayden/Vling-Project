import React from 'react';
import styled from 'styled-components';

const DeleteButton = ({
  setIsModalOpen,
  clickedLabelers,
  isDeleteButtonClicked,
  setIsDeleteButtonClicked,
}) => {
  const selectedNum = clickedLabelers.length;
  const isSelected = selectedNum > 0;

  function buttonTitle() {
    if (isDeleteButtonClicked && !isSelected) {
      return '취소';
    } else if (!isDeleteButtonClicked) {
      return '라벨러 삭제';
    } else if (isDeleteButtonClicked && isSelected) {
      return `라벨러 삭제 (${selectedNum})`;
    }
  }

  const deleteHandler = () => {
    if (isSelected) {
      setIsModalOpen(true);
    } else {
      setIsDeleteButtonClicked(!isDeleteButtonClicked);
    }
  };

  return (
    <Wrap>
      <Button onClick={() => deleteHandler()}>{buttonTitle()}</Button>
    </Wrap>
  );
};

export default DeleteButton;

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  margin-left: 0.5rem;
  width: 8rem;
  cursor: pointer;
`;
