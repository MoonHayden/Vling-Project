import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LABELER_DELETE } from '../../../components/gql';
import ModalFrame from '../../../components/ModalFrame';
import DeleteButton from './DeleteButton';
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
