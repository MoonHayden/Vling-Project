import React from 'react';
import styled from 'styled-components';
import admin from '../public/images/admin.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MESSAGE_LIST } from '../data/MESSAGE_LIST';

const DDD = () => {
  const router = useRouter();
  const isVisible = router.pathname !== '/' && router.pathname !== '/login';
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);

  const boxHandler = () => {
    isMessageBoxOpen === true
      ? setIsMessageBoxOpen(false)
      : setIsMessageBoxOpen(true);
  };

  const goToLink = url => {
    setIsMessageBoxOpen(false);
    router.push(url);
  };
  return (
    <Wrap isVisible={isVisible}>
      <SubWrap>
        <ImageWrap onClick={() => boxHandler()}>
          <Image src={admin} alt="admin" width={40} height={40} />
        </ImageWrap>
        <MessageBox isMessageBoxOpen={isMessageBoxOpen}>
          {MESSAGE_LIST.map(message => {
            return (
              <Message onClick={() => goToLink(message.url)}>
                {message.content}
              </Message>
            );
          })}
        </MessageBox>
      </SubWrap>
    </Wrap>
  );
};

export default DDD;

const Wrap = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-end;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const SubWrap = styled.div`
  margin-right: 3rem;
  position: relative;
`;

const ImageWrap = styled.div`
  cursor: pointer;
`;

const MessageBox = styled.div`
  width: 200px;
  height: 300px;
  margin-top: 25px;
  background: #dfcaea;
  position: absolute;
  color: #9715cf;
  border-radius: 5px;
  top: 40px;
  right: -80px;
  padding: 1rem;
  z-index: 100;

  ::after {
    content: '';
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
    border: 24px solid transparent;
    border-bottom-color: #dfcaea;
    border-top: 0;
  }

  visibility: ${({ isMessageBoxOpen }) =>
    isMessageBoxOpen ? 'visible' : 'hidden'};
`;

const Message = styled.div`
  margin-bottom: 0.5rem;
  border-bottom: 1px solid white;
  padding-bottom: 0.5rem;
  cursor: pointer;

  :hover {
    color: red;
  }
`;
