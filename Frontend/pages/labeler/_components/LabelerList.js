import React from 'react';
import LabelerInfo from './LabelerInfo';

import styled from 'styled-components';

const LabelerList = ({
  labelers,
  searchLabelers,
  isDeleteButtonClicked,
  clickedLabelersForDelete,
  setClickedLabelersForDelete,
}) => {
  const filteredLabelers =
    searchLabelers.length === 0 ? labelers : searchLabelers;
  return (
    <Wrap>
      {filteredLabelers.map(labeler => {
        return (
          <LabelerInfo
            key={labeler._id}
            {...labeler}
            isDeleteButtonClicked={isDeleteButtonClicked}
            clickedLabelersForDelete={clickedLabelersForDelete}
            setClickedLabelersForDelete={setClickedLabelersForDelete}
          />
        );
      })}
    </Wrap>
  );
};

export default LabelerList;

const Wrap = styled.div`
  height: 27rem;
  overflow: auto;
`;
