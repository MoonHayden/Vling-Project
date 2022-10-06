import React from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import back from '../../../public/images/back.png';
import Image from 'next/image';
const Search = ({ labelers, setSearchLabelers }) => {
  const router = useRouter();

  // const isSearchUrl = router.query.slug?.includes('search'); ////

  function SearchLabeler(event) {
    event.preventDefault();
    const value = event.target['name'].value;
    if (value === '') {
      setSearchLabelers([]);
    } else {
      setSearchLabelers(
        labelers.filter(labeler => labeler.labeler.includes(value))
      );
    }
  }

  function backPage() {
    isSearchUrl && router.push('/labeler');
  }

  return (
    <>
      <ImageWrap>
        <Image
          src={back}
          alt="back"
          width={40}
          height={40}
          onClick={() => backPage()}
        />
      </ImageWrap>
      <Wrap onSubmit={SearchLabeler}>
        <Input type="text" name="name" />
        <Btn type="submit">검색</Btn>
      </Wrap>
    </>
  );
};

export default Search;

const Wrap = styled.form`
  display: flex;
  align-items: center;
  height: 1.5rem;
  padding: 1rem;
`;

const Btn = styled.button`
  height: 1.5rem;
`;

const Input = styled.input`
  height: 1.5rem;
  font-size: 1.1rem;
`;

const ImageWrap = styled.div`
  ${({ isSearchUrl }) =>
    isSearchUrl
      ? css`
          cursor: pointer;
        `
      : css`
          opacity: 0.3;
        `}
`;
