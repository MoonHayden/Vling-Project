import React from 'react';
import styled from 'styled-components';

const LabelerInfo = ({ labelerInformation }) => {
  const { email, name, created_at } = labelerInformation;
  const getCreatedDate = new Date(created_at);

  const year = getCreatedDate.getFullYear();
  const month = getCreatedDate.getMonth() + 1;
  const date = getCreatedDate.getDate();
  const hours = getCreatedDate.getHours();
  const minutes = getCreatedDate.getMinutes();

  // const zero = (time) => {
  //   time<10? time
  // }
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
