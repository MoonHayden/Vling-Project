import React from 'react';
import LabelerInfo from './LabelerInfo';
import styled from 'styled-components';

const LabelerList = ({
  labeling,
  SearchLabelers,
  clickedDeleteBtn,
  selectedLabeler,
  setSelectedLabeler,
}) => {
  const filteredLabelers =
    SearchLabelers.length === 0 ? labeling : SearchLabelers;
  return (
    <Wrap>
      {filteredLabelers.map(labeler => {
        return (
          <LabelerInfo
            key={labeler._id}
            {...labeler}
            clickedDeleteBtn={clickedDeleteBtn}
            selectedLabeler={selectedLabeler}
            setSelectedLabeler={setSelectedLabeler}
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
