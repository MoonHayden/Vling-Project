import styled from 'styled-components';
import Nav from './Nav';
import Alram from './Alram';
import Logout from './Logout';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
export default function Layout({ children }) {
  const router = useRouter();
  const isVisible = router.pathname !== '/login';

  if (typeof window !== 'undefined') {
    injectStyle();
  }

  return (
    <>
      <MainWrap>
        <ToastContainer autoClose={2000} />
        <MenuWrap isVisible={isVisible}>
          <Alram />
          <Logout />
        </MenuWrap>
        <Nav />
        <SubWrap>{children}</SubWrap>
      </MainWrap>
    </>
  );
}

const MainWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
  background-color: #ede7f6;
`;

const SubWrap = styled.div`
  width: 60%;
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bbb5c3;
`;

const MenuWrap = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;
