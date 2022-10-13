import styled, { css } from 'styled-components';
import Image from 'next/image';
import logo from '../../public/images/vling_logo.png';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const MASTER_LOGIN = gql`
  mutation MasterLogIn($name: String, $password: String) {
    masterLogIn(name: $name, password: $password) {
      _id
    }
  }
`;

function loginPage() {
  const router = useRouter();

  const [userId, setUserId] = useState({
    id: '',
    password: '',
  });

  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const [masterLogin] = useMutation(MASTER_LOGIN, {
    variables: { name: userId.id, password: userId.password },
  });

  const idUpdate = e => {
    setUserId({ ...userId, [e.target.name]: e.target.value });
  };

  const isBtnActive = userId['id'].length > 0 && userId['password'].length > 0;

  const loginValid = async e => {
    e.preventDefault();
    const result = await masterLogin();

    if (result.data.masterLogIn == null) {
      setIsLoginFailed(true);
    } else {
      localStorage.setItem('masterToken', 'master');
      toast.success('로그인에 성공했습니다.');
      router.push('/');
    }
  };

  return (
    <Wrap>
      <ImageWrap>
        <Image src={logo} alt="checkBox" width={230} height={90} />
      </ImageWrap>
      <Form>
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
        <Box>
          <FailedText isLoginFailed={isLoginFailed}>
            이메일 혹은 비밀번호가 틀렸습니다.
          </FailedText>
          <Buttton
            disabled={!isBtnActive}
            isBtnActive={isBtnActive}
            onClick={e => loginValid(e)}
          >
            로그인
          </Buttton>
        </Box>
      </Form>
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

const Form = styled.form`
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

const Buttton = styled.button`
  width: 15rem;
  height: 4rem;
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

const Box = styled.div`
  margin-top: 3rem;
`;

const FailedText = styled.div`
  font-size: 0.8rem;
  color: red;
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  visibility: ${({ isLoginFailed }) => (isLoginFailed ? 'visible' : 'hidden')};
`;
