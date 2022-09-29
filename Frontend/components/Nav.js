import React from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

const Nav = () => {
  const router = useRouter();
  const isVisible = router.pathname !== '/' && router.pathname !== '/login';

  const pagePath = router.pathname.split('/')[1];

  const pageMove = pageName => {
    router.push(`/${pageName}`);
  };

  return (
    <MenuWrap isVisible={isVisible}>
      <Menu
        onClick={() => pageMove('labeler')}
        isCurrentPage={pagePath === 'labeler'}
      >
        Labelers
      </Menu>
      <Menu
        onClick={() => pageMove('tasks')}
        isCurrentPage={pagePath === 'task' || pagePath === 'tasks'}
      >
        Tasks
      </Menu>
    </MenuWrap>
  );
};

export default Nav;

const MenuWrap = styled.div`
  display: flex;
  width: 60%;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 2.5rem;
  width: 7rem;
  padding: 0.2rem;
  font-size: 1.5rem;
  margin-right: 1rem;
  background-color: #dfcaea;
  cursor: pointer;

  background-color: ${({ isCurrentPage }) =>
    isCurrentPage ? '#9715CF' : '#dfcaea'};
`;
