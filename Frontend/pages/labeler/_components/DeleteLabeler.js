import React from 'react';
import styled from 'styled-components';

const DeleteLabeler = ({
  selectedLabeler,
  clickedDeleteBtn,
  setClickedDeleteBtn,
}) => {
  const selectedValue = Object.values(selectedLabeler);
  const filteredLabeler = Object.keys(selectedLabeler).find(
    key => selectedLabeler[key] === true
  );

  const deleteHandler = () => {
    console.log(Object.keys(selectedLabeler));

    if (selectedValue.includes(true)) {
      alert(filteredLabeler);
    } else {
      setClickedDeleteBtn(!clickedDeleteBtn);
    }
  };
  return <DeleteBtn onClick={() => deleteHandler()}>라벨러 삭제!</DeleteBtn>;
};

export default DeleteLabeler;

const DeleteBtn = styled.button`
  margin-left: 7rem;
`;
