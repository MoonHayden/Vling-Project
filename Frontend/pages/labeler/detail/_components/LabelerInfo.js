import React from 'react';
import styled from 'styled-components';

const LabelerInfo = ({ labelerInformation }) => {
  const { name, created_at } = labelerInformation;
  const getCreatedDate = new Date(created_at);

  const year = getCreatedDate.getFullYear();
  const month = (getCreatedDate.getMonth() + 1).toString().padStart(2, '0');
  const date = getCreatedDate.getDate().toString().padStart(2, '0');
  const hours = getCreatedDate.getHours().toString().padStart(2, '0');
  const minutes = getCreatedDate.getMinutes().toString().padStart(2, '0');

  const createdDate = `${year}/${month}/${date} ${hours}:${minutes}`;
  return (
    <Wrap>
      <div>Name : {name}</div>
      <div>Create Date : {createdDate}</div>
    </Wrap>
  );
};

export default LabelerInfo;

const Wrap = styled.div`
  margin: 0 0 3rem 4rem;
  color: #353b48;
  line-height: 1.2rem;
`;
