import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';

const LABELER_DELETE = gql`
  mutation ($labeler: String) {
    deleteLabelers(labeler: $labeler) {
      labeler
    }
  }
`;

const DeleteModal = ({ setIsModalOpen, labelerId }) => {
  const router = useRouter();

  const [deleteLabelers] = useMutation(LABELER_DELETE, {
    variables: { labeler: labelerId },
  });

  const deleteHandler = async () => {
    await deleteLabelers();
    setIsModalOpen(false);
    router.replace('/labeler');
  };

  const modalCancle = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrap>
      <Title>정말 삭제 하시겠습니까?</Title>
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
  height: 10rem;
  width: 20rem;
  color: black;
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
