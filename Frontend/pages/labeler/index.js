import styled from 'styled-components';
import LabelerList from './_components/LabelerList';
import LabelTitle from './_components/LabelTitle';
import { gql } from '@apollo/client';
import { LABELER_LIST } from '../../data/LABELER_LIST';
import Search from './_components/Search';
import { useState } from 'react';
import DeleteLabeler from './_components/DeleteLabeler';
import client from '../../components/apollo-client';

function labelersPage(props) {
  const [selectedLabeler, setSelectedLabeler] = useState({});
  const [clickedDeleteBtn, setClickedDeleteBtn] = useState(false);
  const filteredData =
    props.labelersData.labeling || props.labelersData.labelings;
  return (
    <Wrap>
      <Menus>
        <Search />
        <DeleteLabeler
          selectedLabeler={selectedLabeler}
          setSelectedLabeler={setSelectedLabeler}
          clickedDeleteBtn={clickedDeleteBtn}
          setClickedDeleteBtn={setClickedDeleteBtn}
        />
      </Menus>
      <LabelTitle>이메일</LabelTitle>
      <LabelerList
        labeling={filteredData}
        clickedDeleteBtn={clickedDeleteBtn}
        selectedLabeler={selectedLabeler}
        setSelectedLabeler={setSelectedLabeler}
      />
    </Wrap>
  );
}
export default labelersPage;

//////////////////////// graphQL /////////////////////////
export async function getServerSideProps(context) {
  const { query } = context;
  const { search } = context;

  const LabelerGET = gql`
    query {
      labeling(labeler: search) {
        _id
        labeler
        value
      }
    }
  `;

  let a = 'ff';

  if (query.page !== undefined) {
    a = LabelersGET;
  } else if (query.search !== undefined) {
    a = LabelersGET;
  } else {
    a = LabelersGET;
  }

  const { data } = await client.query({
    query: LabelerGET,
  });

  return {
    props: {
      labelersData: data,
    },
  };
}

const LabelersGET = gql`
  query {
    labelings {
      _id
      labeler
      value
    }
  }
`;

// // 테스트용
// return {
//   props: {
//     labelersData: LABELER_LIST,
//   },
// };

//////////////////////// 스타일컴포넌트 /////////////////////////

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
