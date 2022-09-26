import styled from 'styled-components';
import NavBar from './NavBar';

export default function Layout({ children }) {
  return (
    <>
      <MainWrap>
        <NavBar />
        <SubWrap>
          <InnerWrap></InnerWrap>
        </SubWrap>
      </MainWrap>
    </>
  );
}

const MainWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ede7f6;
`;

const SubWrap = styled.div`
  width: 60%;
  height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bbb5c3;
`;

const InnerWrap = styled.div`
  width: 90%;
  height: 90%;
  padding: 1rem;
`;
