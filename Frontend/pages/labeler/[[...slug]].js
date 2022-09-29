import styled from 'styled-components';
import LabelerList from './_components/LabelerList';
import LabelTitle from './_components/LabelTitle';
import { gql } from '@apollo/client';
import Search from './_components/Search';
import { useState } from 'react';
import DeleteLabeler from './_components/DeleteLabeler';
import client from '../../components/apollo-client';

const LabelerGET = gql`
  query ($labeler: String) {
    labeling(labeler: $labeler) {
      _id
      labeler
      value
    }
    # searchLabelers(labeler: $labeler) {
    #   _id
    #   labeler
    #   value
    # }
  }
`;
const LabelersGET = gql`
  query {
    labelings {
      _id
      labeler
      value
    }
    # getAllLabelers {
    #   _id
    #   labeler
    #   value
    # }
  }
`;

function labelersPage(props) {
  console.log(props);
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
      <LabelTitle />
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

export async function getServerSideProps(context) {
  const { query } = context;

  let queryKind = '';
  let variables = '';

  if (query.slug === undefined) {
    queryKind = LabelersGET;
  } else if (query.slug[0] === 'search') {
    queryKind = LabelerGET;
    variables = query.slug[1];
  }

  const { data } = await client.query({
    query: queryKind,
    variables: { labeler: variables },
  });

  return {
    props: {
      labelersData: data,
    },
  };
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-size: 25px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
`;

const Menus = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 1.5rem;
`;
