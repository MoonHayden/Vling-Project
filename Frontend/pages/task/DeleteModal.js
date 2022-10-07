import React from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

export default function DeleteModal({
  deleteTask,
  params,
  taskName,
  taskKind,
  expDate,
  setDeleteModal,
}) {
  const router = useRouter();
  const handleDeleteTask = () => {
    deleteTask({ variables: { name: params.taskName } });
    alert(`${params.taskName}이 삭제 되었습니다.`);
    setDeleteModal(false);
    router.push('/tasks');
  };

  return (
    <DeleteWrap>
      <DeleteTitle>Task를 삭제 하시겠습니까?</DeleteTitle>
      <DeleteText>삭제할 Task:</DeleteText>
      <DeleteSubWrap>
        <DeleteText>Name: </DeleteText>
        <DeleteTextValue>{taskName}</DeleteTextValue>
        <DeleteText>Kind: </DeleteText>
        <DeleteTextValue>{taskKind}</DeleteTextValue>
        <DeleteText>Name: </DeleteText>
        <DeleteTextValue>{expDate}</DeleteTextValue>
      </DeleteSubWrap>
      <DeleteBtnWrap>
        <DeleteButton onClick={handleDeleteTask}>삭제하기</DeleteButton>
        <CancleButton onClick={() => setDeleteModal(false)}>취소</CancleButton>
      </DeleteBtnWrap>
    </DeleteWrap>
  );
}

const DeleteWrap = styled.div`
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DeleteTitle = styled.div`
  color: white;
  font-size: 1.4rem;
`;

const DeleteText = styled.div`
  margin-top: 0.7rem;
  font-size: 1rem;
  color: #ccccff;
`;

const DeleteTextValue = styled.span`
  margin-top: 0.7rem;
  font-size: 1rem;
  color: #fff;
`;

const DeleteSubWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  border: 1px solid #ccccff;
  height: 9rem;
  border-radius: 7px;
  padding: 0.3rem;
  color: #ccccff;
  width: 400px;
  height: 250px;
`;

const DeleteBtnWrap = styled.div`
  display: flex;
`;

const DeleteButton = styled.button`
  height: 3rem;
  width: 7rem;
  margin-right: 2rem;
`;

const CancleButton = styled.button`
  height: 3rem;
  width: 7rem;
`;
