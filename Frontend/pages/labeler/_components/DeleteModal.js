import React from 'react';
import { useMutation } from '@apollo/client';
import { LABELER_DELETE } from '../../../components/gql';
import ModalFrame from '../../../components/ModalFrame';

const DeleteModal = ({
  setIsModalOpen,
  setIsDeleteButtonClicked,
  setClickedLabelers,
  labelers,
  setLabelers,
  clickedLabelers,
  isModalOpen,
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
    <>
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
