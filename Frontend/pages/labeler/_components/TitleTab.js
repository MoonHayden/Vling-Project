import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import sortDefaultImg from '../../../public/images/sortDefault.png';
import sortUpImg from '../../../public/images/sortUp.png';
import sortDownImg from '../../../public/images/sortDown.png';
import { useState } from 'react';
const TitleTab = ({ labelers, setLabelers }) => {
  const TITLE_LIST = ['email', 'value'];

  const [sortType, setSortType] = useState({
    email: sortDefaultImg,
    value: sortDefaultImg,
  });

  const sortGogo = title => {
    if (sortType[title] === sortDefaultImg) {
      sortUp(title);
    } else if (sortType[title] === sortUpImg) {
      sortDown(title);
    } else if (sortType[title] === sortDownImg) {
      sortDefault(title);
    }
  };

  const sortUp = type => {
    const sortedLabelers = [...labelers].sort((a, b) =>
      a[type].toLowerCase() < b[type].toLowerCase() ? -1 : 1
    );
    setLabelers(sortedLabelers);
    setSortType({ ...sortType, [type]: sortUpImg });
  };

  const sortDown = type => {
    const sortedLabelers = [...labelers].sort((a, b) =>
      a[type].toLowerCase() < b.email.toLowerCase() ? 1 : -1
    );
    setLabelers(sortedLabelers);
    setSortType({ ...sortType, [type]: sortDownImg });
  };

  const sortDefault = type => {
    const sortedLabelers = [...labelers].sort((a, b) =>
      a._id.toLowerCase() < b._id.toLowerCase() ? -1 : 1
    );
    setLabelers(sortedLabelers);
    setSortType({ ...sortType, [type]: sortDefaultImg });
  };

  return (
    <Wrap>
      {TITLE_LIST.map(title => (
        <TitleBox onClick={() => sortGogo(title)}>
          <ImageWrap>
            <Image src={sortType[title]} width={20} height={20} alt="sort" />
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
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem 0 1rem;
  margin-top: 0.5rem;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrap = styled.div`
  margin-right: 0.5rem;
  cursor: pointer;
`;
