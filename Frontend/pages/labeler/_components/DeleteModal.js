import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { LABELER_DELETE } from '../../../components/gql';

const DeleteModal = ({
  setIsModalOpen,
  setIsDeleteButtonClicked,
  setClickedLabelers,
  labelers,
  setLabelers,
  clickedLabelers,
}) => {
  const [deleteLabelers] = useMutation(LABELER_DELETE);

  const deleteHandler = async () => {
    try {
      clickedLabelers.forEach(labeler => {
        deleteLabelers({
          variables: { id: labeler.id },
        });
      });
      initialization();
    } catch (e) {
      alert(e);
    }
  };

  const initialization = () => {
    setLabelers(deleteFilter());
    setIsDeleteButtonClicked(false);
    setClickedLabelers([]);
    setIsModalOpen(false);
  };

  const deleteFilter = () => {
    const deleteLabelersList = clickedLabelers.map(labeler => labeler.id);
    return labelers.filter(
      labeler => !deleteLabelersList.includes(labeler._id)
    );
  };

  const modalCancle = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrap>
      <Title>정말 삭제 하시겠습니까?</Title>
      <SubWrap>
        {clickedLabelers.map((labeler, idx) => {
          return <Labeler key={idx}>{labeler.email}</Labeler>;
        })}
      </SubWrap>
      <BtnWrap>
        <DeleteBtn onClick={() => deleteHandler()}>삭제하기</DeleteBtn>
        <CancleBtn onClick={() => modalCancle()}>취소</CancleBtn>
      </BtnWrap>
    </Wrap>
  );
};

export default DeleteModal;

const Wrap = styled.div`
  background-color: #606060;
  height: 22rem;
  width: 30rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 15px;
  justify-content: space-between;
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
`;

const Title = styled.div`
  color: white;
  font-size: 1.4rem;
`;

const SubWrap = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  border: 1px solid #ccccff;
  width: 20rem;
  max-height: 8rem;
  border-radius: 7px;
  padding: 1rem;
  color: #ccccff;
`;

const BtnWrap = styled.div`
  display: flex;
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
