import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LABELER_DELETE } from '../../../components/gql';
import ModalFrame from '../../../components/ModalFrame';
import DeleteButton from './DeleteButton';
import { toast } from 'react-toastify';

const DeleteModal = ({
  setIsDeleteButtonClicked,
  setClickedLabelers,
  labelers,
  setLabelers,
  clickedLabelers,
  isDeleteButtonClicked,
}) => {
  const [deleteLabelers] = useMutation(LABELER_DELETE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clickedNumber = clickedLabelers.length;

  const deleteHandler = async () => {
    try {
      clickedLabelers.forEach(labeler => {
        deleteLabelers({
          variables: { id: labeler.id },
        });
      });
      toast.success(`${clickedNumber}명의 라벨러를 삭제했습니다.`);
      initialization();
    } catch (e) {
      toast.error(e);
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
    <>
      <DeleteButton
        isDeleteButtonClicked={isDeleteButtonClicked}
        clickedLabelers={clickedLabelers}
        setIsModalOpen={setIsModalOpen}
        setIsDeleteButtonClicked={setIsDeleteButtonClicked}
      />
      {isModalOpen && (
        <ModalFrame
          deleteHandler={deleteHandler}
          modalCancle={modalCancle}
          selectedLabelers={clickedLabelers}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default DeleteModal;
