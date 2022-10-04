import styled, { css } from 'styled-components';
import Image from 'next/image';
import logo from '../../public/images/vling_logo.png';
import { useRouter } from 'next/router';
import { useState } from 'react';

function loginPage() {
  const route = useRouter();
  const [userId, setUserId] = useState({
    id: '',
    password: '',
  });

  const idUpdate = e => {
    setUserId({ ...userId, [e.target.name]: e.target.value });
  };

  const isBtnActive = userId['id'].length > 0 && userId['password'].length > 0;

  const loginValid = e => {
    e.preventDefault();
    fetch('주소', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: userId.id,
        password: userId.password,
      }),
    })
      .then(res => res.json())
      .then(validData => {
        if (validData.message === 'SUCCESS_LOGIN') {
          localStorage.setItem('token', validData.token);
          route.push('/');
        } else if (validData.message === 'UNABLE_LOGIN') {
          alert('비밀번호가 틀렸습니다!');
        }
      });
  };

  return (
    <Wrap>
      <ImageWrap>
        <Image src={logo} alt="checkBox" width={230} height={90} />
      </ImageWrap>
      <SubWrap>
        <Input
          onChange={e => idUpdate(e)}
          type="text"
          name="id"
          autoFocus
          placeholder="아이디"
        />
        <Input
          onChange={e => idUpdate(e)}
          type="password"
          name="password"
          placeholder="비밀번호"
        />
        <Buttton
          disabled={!isBtnActive}
          isBtnActive={isBtnActive}
          onClick={() => loginValid()}
        >
          로그인
        </Buttton>
      </SubWrap>
    </Wrap>
  );
}

export default loginPage;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 3rem;
`;

const SubWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 15rem;
  height: 3rem;
  margin-bottom: 1rem;
  background-color: #fafafa;
  padding-left: 1rem;
  border-radius: 5px;
  border: 1px solid gray;
  font-size: 1rem;
  border: none;

  ::placeholder {
    color: gray;
  }
`;

const InputName = styled.div``;

const Buttton = styled.button`
  width: 15rem;
  height: 4rem;
  margin-top: 3rem;
  background-color: #fafafa;
  border-radius: 5px;
  border: none;
  font-size: 1.3rem;
  ${({ isBtnActive }) =>
    isBtnActive
      ? css`
          background-color: #dfcaea;
          cursor: pointer;
          font-weight: bold;
          color: white;
        `
      : css`
          background-color: #dfcaea;
          opacity: 0.7;
        `}
`;
const ImageWrap = styled.div`
  margin-bottom: 2rem;
`;
