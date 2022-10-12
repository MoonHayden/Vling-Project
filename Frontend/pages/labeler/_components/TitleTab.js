import React, { useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import sortDefault from '../../../public/images/sortDefault.png';
import sortUp from '../../../public/images/sortUp.png';
import sortDown from '../../../public/images/sortDown.png';
import { useState } from 'react';
const TitleTab = ({ labelers, setLabelers }) => {
  const TITLE_LIST = ['email', 'value', 'progress'];
  const [sortType, setSortType] = useState({
    email: sortDefault,
    value: sortDefault,
    progress: sortDefault,
  });

  const sorting = title => {
    if (sortType[title] === sortDefault) {
      setLabelers(upSortedLabelers(title));
      changeSortType(title, sortUp);
    } else if (sortType[title] === sortUp) {
      setLabelers(downSortedLabelers(title));
      changeSortType(title, sortDown);
    } else if (sortType[title] === sortDown) {
      setLabelers(defaultLabelers());
      changeSortType(title, sortDefault);
    }
  };

  useEffect(() => {
    console.log('dzzz');
  }, [labelers]);

  const upSortedLabelers = title => {
    return [...labelers].sort((a, b) =>
      a[title].toLowerCase() < b[title].toLowerCase() ? -1 : 1
    );
  };

  const downSortedLabelers = title => {
    return [...labelers].sort((a, b) =>
      a[title].toLowerCase() < b[title].toLowerCase() ? 1 : -1
    );
  };

  const defaultLabelers = () => {
    return [...labelers].sort((a, b) => (a._id < b._id ? -1 : 1));
  };

  const changeSortType = (title, src) => {
    const tmp_sortType = { ...sortType };

    for (var key in sortType) {
      key === title
        ? (tmp_sortType[key] = src)
        : (tmp_sortType[key] = sortDefault);
    }
    setSortType(tmp_sortType);
  };

  //소트한후 라벨러 바뀐거 x 소트안했는데 라벨러 바뀌면 타입 리셋시키기
  return (
    <Wrap>
      {TITLE_LIST.map((title, idx) => (
        <TitleBox onClick={() => sorting(title)} key={idx}>
          <ImageWrap>
            <Image src={sortType[title]} width={15} height={15} alt="sort" />
          </ImageWrap>
          {title}
        </TitleBox>
      ))}
    </Wrap>
  );
};

export default TitleTab;

const Wrap = styled.div`
  display: flex;

  width: 100%;
  height: 3rem;
  justify-content: space-between;
  padding-left: 1rem;
  margin-top: 0.5rem;

  font-size: 1.3rem;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 1rem;

  :hover {
    color: red;
  }

  :first-of-type {
    width: 70%;
  }
`;

const ImageWrap = styled.div`
  margin-right: 0.5rem;
`;
