import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import styled, { css } from 'styled-components';
import back from '../../../public/images/back.png';
import reset from '../../../public/images/reset.png';

const Search = ({ labelers, searchLabelers, setSearchLabelers }) => {
  const router = useRouter();
  const isAfterSearch = searchLabelers.length > 0;

  function SearchLabeler(event) {
    event.preventDefault();

    const value = event.target['email'].value;

    const filteredLabelers = labelers.filter(labeler =>
      labeler.email.includes(value)
    );

    if (!value) {
      setSearchLabelers([]);
    } else if (filteredLabelers.length === 0) {
      toast.error('찾으시는 라벨러가 없습니다.');
    } else {
      setSearchLabelers(
        labelers.filter(labeler => labeler.email.includes(value))
      );
    }
  }

  function goTobackPage() {
    router.push('/labeler');
  }

  function resetSearchDatas() {
    router.push('/labeler');
    setSearchLabelers([]);
  }

  return (
    <>
      <ImageWrap>
        <Image
          src={back}
          alt="back"
          width={40}
          height={40}
          onClick={() => goTobackPage()}
        />
      </ImageWrap>
      <Wrap onSubmit={SearchLabeler}>
        <ResetButton
          type="button"
          onClick={() => resetSearchDatas()}
          isAfterSearch={isAfterSearch}
        >
          <Image src={reset} alt="reset" width={12} height={12} />
        </ResetButton>
        <Input type="text" name="email" />
        <SarchButton type="submit">검색</SarchButton>
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

const SarchButton = styled.button`
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

const ResetButton = styled.button`
  visibility: ${({ isAfterSearch }) => (isAfterSearch ? 'visible' : 'hidden')};
`;
