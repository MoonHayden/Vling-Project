import React from 'react';
import LabelerInfo from './LabelerInfo';

const LabelerList = ({ labeling }) => {
  return (
    <>
      {labeling.map(labeler => {
        return <LabelerInfo key={labeler._id} {...labeler} />;
      })}
    </>
  );
};

export default LabelerList;
