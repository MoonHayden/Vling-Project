import React, { useEffect } from 'react';
import styled from 'styled-components';
import MoonLoader from 'react-spinners/MoonLoader';

export default function Loading({ loading }) {
  const check = loading == null ? false : loading;
  return (
    check && (
      <AxiosLoading>
        <AxiosLoadingIndicator>
          <MoonLoader loading={loading} />
        </AxiosLoadingIndicator>
      </AxiosLoading>
    )
  );
}

const AxiosLoading = styled.div`
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: auto;
  display: ${props => (props.loading === true ? 'block' : 'none')};
`;

const AxiosLoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
