import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LABELER_DELETE } from '../../../../components/gql';
import ModalFrame from '../../../../components/ModalFrame';
import { useState } from 'react';
import { toast } from 'react-toastify';

const DeleteModal = ({ labelerInformation }) => {
  const router = useRouter();

  const [deleteLabelers] = useMutation(LABELER_DELETE, {
    variables: { id: labelerInformation._id },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteHandler = async () => {
    try {
      await deleteLabelers();
      toast.success(`라벨러 '${labelerInformation.email}'님을 삭제했습니다.`);
      initialization();
    } catch (e) {
      toast.error(e);
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
      <Button onClick={() => setIsModalOpen(true)}>라벨러 삭제</Button>
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

const Button = styled.button`
  width: 8rem;
`;
