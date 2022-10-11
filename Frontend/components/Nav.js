import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Nav = () => {
  const router = useRouter();
  const hiddenPageList = ['/', '/login'];
  const isVisible = !hiddenPageList.includes(router.pathname);

  const currentPagePath = router.pathname.split('/')[1];

  const pageMove = pageName => {
    router.replace(`/${pageName}`);
  };

  return (
    <MenuWrap isVisible={isVisible}>
      <Menu
        onClick={() => pageMove('labeler')}
        isCurrentPage={currentPagePath === 'labeler'}
      >
        Labelers
      </Menu>
      <Menu
        onClick={() => pageMove('tasks')}
        isCurrentPage={
          currentPagePath === 'task' || currentPagePath === 'tasks'
        }
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
  border-radius: 5px 5px 0px 0px;

  cursor: pointer;

  background-color: ${({ isCurrentPage }) =>
    isCurrentPage ? '#9715CF' : '#dfcaea'};
`;
