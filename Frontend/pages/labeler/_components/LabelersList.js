import React from 'react';
import Labeler from './Labeler';
import styled from 'styled-components';

const LabelersList = ({
  labelers,
  searchLabelers,
  isDeleteButtonClicked,
  clickedLabelers,
  setClickedLabelers,
}) => {
  const filteredLabelers =
    searchLabelers.length === 0 ? labelers : searchLabelers;

  return (
    <Wrap>
      {filteredLabelers.map(labeler => {
        return (
          <Labeler
            key={labeler._id}
            {...labeler}
            isDeleteButtonClicked={isDeleteButtonClicked}
            clickedLabelers={clickedLabelers}
            setClickedLabelers={setClickedLabelers}
          />
        );
      })}
    </Wrap>
  );
};

export default LabelersList;

const Wrap = styled.div`
  height: 27rem;
  overflow: auto;
`;
