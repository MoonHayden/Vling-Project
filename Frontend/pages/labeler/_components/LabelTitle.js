import React from 'react';
import styled from 'styled-components';

const LabelTitle = () => {
  return (
    <Wrap>
      <div>Email</div>
      <div>Value</div>
    </Wrap>
  );
};

export default LabelTitle;

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem 0 2rem;
  margin-top: 0.5rem;
`;
