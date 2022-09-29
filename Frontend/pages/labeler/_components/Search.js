import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
const Search = () => {
  const router = useRouter();

  function SearchLabeler(event) {
    event.preventDefault();
    const value = event.target['name'].value;
    const url = `/labeler/search/${value}`;
    router.push(url);
  }

  return (
    <Wrap onSubmit={SearchLabeler}>
      <Input type="text" name="name" />
      <Btn type="submit">검색</Btn>
    </Wrap>
  );
};

export default Search;

const Wrap = styled.form`
  display: flex;
  align-items: center;
  height: 1.5rem;
`;

const Btn = styled.button`
  height: 1.5rem;
`;

const Input = styled.input`
  height: 1.5rem;
  font-size: 1.1rem;
`;
