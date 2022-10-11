import React from 'react';
import ModalPortal from './ModalPortal';
import styled from 'styled-components';

const ModalFrame = ({
  deleteHandler,
  modalCancle,
  selectedLabelers,
  setIsModalOpen,
}) => {
  return (
    <ModalPortal>
      <BlurWrap onClick={() => setIsModalOpen(false)} />
      <Wrap>
        <Title>정말 삭제 하시겠습니까?</Title>
        <SubWrap>
          {selectedLabelers?.map((labeler, idx) => {
            return <Labeler key={idx}>{labeler.email}</Labeler>;
          })}
        </SubWrap>
        <BtnWrap>
          <DeleteBtn onClick={() => deleteHandler()}>삭제하기</DeleteBtn>
          <CancleBtn onClick={() => modalCancle()}>취소</CancleBtn>
        </BtnWrap>
      </Wrap>
    </ModalPortal>
  );
};

export default ModalFrame;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background-color: #606060;
  max-height: 22rem;
  width: 30rem;
  color: white;

  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
`;

const Title = styled.div`
  font-size: 1.4rem;
  margin-bottom: 3rem;
`;

const SubWrap = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  max-height: 8rem;
  padding: 1rem;
`;

const BtnWrap = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const DeleteBtn = styled.button`
  height: 3rem;
  width: 7rem;
  margin-right: 2rem;
`;

const CancleBtn = styled.button`
  height: 3rem;
  width: 7rem;
`;

const Labeler = styled.li`
  margin-bottom: 0.5rem;
`;

const BlurWrap = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
`;
