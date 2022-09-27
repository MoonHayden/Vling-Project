import styled from 'styled-components';

export default function Layout({ children }) {
  return (
    <>
      <MainWrap>
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
