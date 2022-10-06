import React from 'react';
import styled from 'styled-components';
import DeleteModal from './DeleteModal';

const DeleteLabeler = ({
  labelers,
  setLabelers,
  isModalOpen,
  setIsModalOpen,
  clickedLabelersForDelete,
  setClickedLabelersForDelete,
  isDeleteButtonClicked,
  setIsDeleteButtonClicked,
}) => {
  const filteredLabeler = Object.keys(clickedLabelersForDelete).filter(
    key => clickedLabelersForDelete[key] === true
  );
  const selectedNum = filteredLabeler.length;
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
    <>
      <Wrap>
        <DeleteBtn onClick={() => deleteHandler()}>{buttonTitle()}</DeleteBtn>
      </Wrap>
      <ModalWrap isModalOpen={isModalOpen}>
        <DeleteModal
          labelers={labelers}
          setLabelers={setLabelers}
          filteredLabeler={filteredLabeler}
          setClickedLabelersForDelete={setClickedLabelersForDelete}
          setIsModalOpen={setIsModalOpen}
          setIsDeleteButtonClicked={setIsDeleteButtonClicked}
        />
      </ModalWrap>
    </>
  );
};

export default DeleteLabeler;

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const Num = styled.span`
  color: red;
  visibility: ${({ isSelected }) => (isSelected ? 'visible' : 'hidden')};
`;

const DeleteBtn = styled.button`
  margin-left: 0.5rem;
  width: 8rem;
  cursor: pointer;
`;

const ModalWrap = styled.div`
  z-index: 3000;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: ${({ isModalOpen }) => (isModalOpen ? 'block' : 'none')};
`;
