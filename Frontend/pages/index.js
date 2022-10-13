import Link from 'next/link';
import styled from 'styled-components';

export default function Home() {
  return (
    <Wrap>
      <Logo src="./images/vling_logo.png" />
      <MainWrap>
        <SubWrap>
          <Link href="/labeler">
            <ButtonWrap>
              <Icon src="./images/main_labeler.png" />
              <Text>Labeler 관리</Text>
            </ButtonWrap>
          </Link>
        </SubWrap>
        <SubWrap>
          <Link href="/tasks">
            <ButtonWrap>
              <Icon src="./images/main_task.png" />
              <Text>Task 관리</Text>
            </ButtonWrap>
          </Link>
        </SubWrap>
      </MainWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Logo = styled.img`
  width: 15%;
  align-self: center;
`;

const MainWrap = styled.div`
  width: 90%;
  height: 50%;
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: center;
  align-self: center;
`;

const SubWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
`;

const ButtonWrap = styled.div`
  width: 100%;
  height: 70%;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: linear-gradient(#fff7ff, #d1c4e9);
  cursor: pointer;
  &:active {
    transform: scale(0.99);
  }
`;

const Icon = styled.img`
  width: 15%;
`;

const Text = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #34495e;
`;
