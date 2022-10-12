import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function CreateModal({
  setModalOpen,
  addTask,
  taskName,
  taskKind,
  labelerList,
  expDate,
  bodyFormData,
}) {
  const [loading, setLoading] = useState(false);
  console.log(labelerList);

  const handleAddTask = () => {
    bodyFormData.append('taskName', taskName);
    addTask({
      variables: {
        name: taskName,
        kind: taskKind,
        labelers: labelerList,
        expirationDate: expDate.split('-').join(''),
      },
    });
    axios({
      method: 'POST',
      url: 'http://www2.wecode.buzzntrend.com:4000/upload',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: bodyFormData,
    }).then(response => {
      if (response.data.success == true) {
        alert('task 등록이 완료되었습니다.');
        setModalOpen(false);
        window.location.reload();
      } else if (response.data.success == false) {
        alert('task 등록이 실패하였습니다.');
        setModalOpen(false);
        window.location.reload();
      }
    });
  };

  return (
    <Wrap>
      <Title>Task를 등록 하시겠습니까?</Title>
      <Text>등록할 Task:</Text>
      <SubWrap>
        <Text>Name: </Text>
        <TextValue>{taskName}</TextValue>
        <Text>Kind: </Text>
        <TextValue>{taskKind}</TextValue>
        <Text>ExpDate: </Text>
        <TextValue>{expDate}</TextValue>
        <Text>#Labelers ({labelerList.length}): </Text>
        {labelerList.map(labeler => (
          <TextValue>{labeler.email}</TextValue>
        ))}
      </SubWrap>
      <BtnWrap>
        <DeleteBtn onClick={handleAddTask}>등록하기</DeleteBtn>
        <CancleBtn onClick={() => setModalOpen(false)}>취소</CancleBtn>
      </BtnWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  background-color: #606060;
  width: 30%;
  height: 50%;
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

const Title = styled.div`
  color: white;
  font-size: 1.4rem;
`;

const Text = styled.div`
  margin-top: 0.7rem;
  font-size: 1rem;
  color: #ccccff;
`;

const TextValue = styled.span`
  margin-top: 0.7rem;
  font-size: 1rem;
  color: #fff;
`;

const SubWrap = styled.div`
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
