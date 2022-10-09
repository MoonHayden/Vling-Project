import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LABELER_DELETE } from '../../../../components/gql';
import ModalFrame from '../../../../components/ModalFrame';
const DeleteModal = ({ setIsModalOpen, isModalOpen, labelerInformation }) => {
  const router = useRouter();
  console.log(labelerInformation);

  const [deleteLabelers] = useMutation(LABELER_DELETE, {
    variables: { id: labelerInformation._id },
  });

  const deleteHandler = async () => {
    try {
      await deleteLabelers();
      initialization();
    } catch (e) {
      alert(e);
    }
  };

  const initialization = () => {
    setIsModalOpen(false);
    router.replace('/labeler');
  };

  const modalCancle = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <ModalFrame
          setIsModalOpen={setIsModalOpen}
          deleteHandler={deleteHandler}
          modalCancle={modalCancle}
          selectedLabelers={[labelerInformation]}
        />
      )}
    </>
  );
};

export default DeleteModal;

// const Wrap = styled.div`
//   background-color: #606060;
//   height: 10rem;
//   width: 20rem;
//   color: black;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 2rem;
//   border-radius: 15px;
//   justify-content: space-between;
//   box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
// `;

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
