import styled from 'styled-components';
import LabelerList from './_components/LabelerList';
import client from '../../components/apollo-client';
import LabelTitle from './_components/LabelTitle';
import { gql } from '@apollo/client';
import { LABELER_LIST } from '../../data/LABELER_LIST';
import Search from './_components/Search';
import { useState } from 'react';
import DeleteLabeler from './_components/DeleteLabeler';

function labelersPage(props) {
  const [selectedLabeler, setSelectedLabeler] = useState({});
  const [clickedDeleteBtn, setClickedDeleteBtn] = useState(false);
  return (
    <Wrap>
      <Menus>
        <Search />
        <DeleteLabeler
          selectedLabeler={selectedLabeler}
          clickedDeleteBtn={clickedDeleteBtn}
          setClickedDeleteBtn={setClickedDeleteBtn}
        />
      </Menus>
      <LabelTitle>이메일</LabelTitle>
      <LabelerList
        labeling={props.data.labeling}
        clickedDeleteBtn={clickedDeleteBtn}
        selectedLabeler={selectedLabeler}
        setSelectedLabeler={setSelectedLabeler}
      />
    </Wrap>
  );
}
export default labelersPage;

///////// graphQL ///////////
export async function getServerSideProps() {
  return {
    props: {
      data: LABELER_LIST,
    },
  };
  //   const { data } = await client.query({
  //     query: GET,
  //   });

  //   return {
  //     props: {
  //       data: data,
  //     },
  //   };
}

const GET = gql`
  query {
    labeling {
      _id
      labeler
      value
    }
  }
`;

///// 스타일컴포넌트 //////
const Title = styled.div`
  width: 100%;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-size: 25px;
`;

const Menus = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 1.5rem;
`;
