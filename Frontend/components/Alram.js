import React from 'react';
import styled from 'styled-components';
import admin from '../public/images/admin.png';
import adminAlarm from '../public/images/adminAlarm.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MESSAGE_LIST } from '../data/MESSAGE_LIST';
import { useEffect } from 'react';
import { GET_ALL_LABELERS_TIME } from './gql';
import { useQuery } from '@apollo/client';
const Alram = () => {
  const router = useRouter();
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { data } = useQuery(GET_ALL_LABELERS_TIME);
  const [newLabelers, setNewLabelers] = useState([]);

  // useEffect(() => {
  //   const b = JSON.parse(localStorage.getItem('eeeee'));
  //   const filter = b.filter(c => c.watch === false);
  //   setNewLabelers(b);
  // }, []);

  // if (data === undefined) return;

  // const labelers = data?.getAllLabelers;
  // const today = new Date().getTime();
  // const millisecondsOfDay = 86400000;

  // const endDt = new Date(today - 86400000);
  // const isNewMember = createdDate => today - createdDate < millisecondsOfDay;

  // const ass = labelers.filter(c => {
  //   return isNewMember(c.created_at);
  // });

  // const newMembers = data.filter((c)=>isNewMember(c.createDate))

  // useEffect(() => {
  //   setTest(data);
  //   console.log(test, 'zz');
  // }, []);

  // useEffect(() => {
  //   setMessages(MESSAGE_LIST);
  // }, []);

  // useEffect(() => {
  //   setIsMessageBoxOpen(false);
  // }, [router]);

  const boxHandler = () => {
    isMessageBoxOpen === true
      ? setIsMessageBoxOpen(false)
      : setIsMessageBoxOpen(true);
  };

  const messageHandler = message => {
    setIsMessageBoxOpen(false);
    newLabelers._id.watch = true;
    setMessages(messages.filter(item => item.id !== message.id));
    // router.push(message.url);
  };

  const isHaveAlarm = messages?.length > 0;
  const adminSrc = isHaveAlarm ? adminAlarm : admin;

  const setLocalStorage = () => {
    // const a = { aaa: 'ss', ggg: 'ssss' };
    localStorage.setItem('eeeee', JSON.stringify(ass));
    const b = JSON.parse(localStorage.getItem('eeeee'));
    console.log(b);
  };

  return (
    <Wrap>
      <SubWrap>
        <ImageWrap onClick={() => boxHandler()}>
          <Image src={adminSrc} alt="admin" width={40} height={40} />
        </ImageWrap>
        <MessageBox isMessageBoxOpen={isMessageBoxOpen}>
          <>
            {isHaveAlarm ? (
              messages.map((message, idx) => {
                return (
                  <Message key={idx} onClick={() => messageHandler(message)}>
                    {message.content}
                  </Message>
                );
              })
            ) : (
              <Message>알람이 없습니다!</Message>
            )}
          </>
        </MessageBox>
      </SubWrap>
    </Wrap>
  );
};

export default Alram;

const Wrap = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  margin-top: 25px;
  background: #dfcaea;
  position: absolute;
  color: #9715cf;
  border-radius: 5px;
  top: 40px;
  right: -80px;
  padding: 1rem;
  z-index: 3000;
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 1);
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

  :last-of-type {
    border-bottom: 0px;
    margin-bottom: 0px;
    padding-bottom: 0px;
  }
`;
