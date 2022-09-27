import React from 'react';
import styled from 'styled-components';
import DeleteModal from './DeleteModal';
import { useState } from 'react';

const DeleteLabeler = ({
  selectedLabeler,
  setSelectedLabeler,
  clickedDeleteBtn,
  setClickedDeleteBtn,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredLabeler = Object.keys(selectedLabeler).filter(
    key => selectedLabeler[key] === true
  );
  const selectedNum = filteredLabeler.length;
  const isSelected = selectedNum > 0;

  const deleteHandler = () => {
    if (isSelected) {
      setIsModalOpen(true);
      // alert(filteredLabeler);
    } else {
      setClickedDeleteBtn(!clickedDeleteBtn);
    }
  };

  return (
    <>
      <Wrap>
        <Num isSelected={isSelected}>{selectedNum}</Num>
        <DeleteBtn onClick={() => deleteHandler()}>라벨러 삭제</DeleteBtn>
      </Wrap>
      <ModalWrap isModalOpen={isModalOpen}>
        <DeleteModal
          filteredLabeler={filteredLabeler}
          setSelectedLabeler={setSelectedLabeler}
          setIsModalOpen={setIsModalOpen}
          setClickedDeleteBtn={setClickedDeleteBtn}
        />
      </ModalWrap>
    </>
  );
};

export default DeleteLabeler;

const Wrap = styled.div`
  margin-left: 7rem;
  display: flex;
  align-items: center;
`;

const Num = styled.span`
  color: red;
  visibility: ${({ isSelected }) => (isSelected ? 'visible' : 'hidden')};
`;

const DeleteBtn = styled.button`
  margin-left: 0.5rem;
`;

const ModalWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: ${({ isModalOpen }) => (isModalOpen ? 'block' : 'none')};
`;
