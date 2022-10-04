import React from 'react';
import styled from 'styled-components';

const LabelTitle = () => {
  return (
    <Wrap>
      <div>Email</div>
      <SubWrap>
        <div>Progress</div>
        <div>Value</div>
      </SubWrap>
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
`;

const SubWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 37%;
`;
