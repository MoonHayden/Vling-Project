import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Logout = () => {
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem('masterToken');
    toast.success('로그아웃 되었습니다.');
    router.push('/login');
  };

  return <Text onClick={() => logoutHandler()}>로그아웃</Text>;
};

export default Logout;

const Text = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  color: #8e26c9;
  :hover {
    color: red;
  }
`;
