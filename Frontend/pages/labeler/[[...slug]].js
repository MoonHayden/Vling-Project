import styled from 'styled-components';
import LabelerList from './_components/LabelerList';
import LabelTitle from './_components/LabelTitle';
import { gql } from '@apollo/client';
import Search from './_components/Search';
import { useEffect, useState } from 'react';
import DeleteLabeler from './_components/DeleteLabeler';
import client from '../../components/apollo-client';

const LabelerGET = gql`
  query ($labeler: String) {
    searchLabelers(labeler: $labeler) {
      _id
      labeler
      value
    }
  }
`;
export const GET_ALL_LABELERS = gql`
  query {
    getAllLabelers {
      _id
      labeler
      value
    }
  }
`;

function labelersPage(props) {
  const [selectedLabeler, setSelectedLabeler] = useState({});
  const [clickedDeleteBtn, setClickedDeleteBtn] = useState(false);
  const [labelers, setLabelers] = useState();
  const filteredData =
    props.labelersData.searchLabelers || props.labelersData.getAllLabelers;

  useEffect(() => {
    setLabelers(filteredData);
  }, [filteredData]);

  if (labelers === undefined) return;

  return (
    <Wrap>
      <Menus>
        <Search />
        <DeleteLabeler
          selectedLabeler={selectedLabeler}
          setSelectedLabeler={setSelectedLabeler}
          clickedDeleteBtn={clickedDeleteBtn}
          setClickedDeleteBtn={setClickedDeleteBtn}
          labelers={labelers}
          setLabelers={setLabelers}
        />
      </Menus>
      <LabelTitle />
      <LabelerList
        labeling={labelers}
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
    queryKind = GET_ALL_LABELERS;
  } else if (query.slug[0] === 'search') {
    queryKind = LabelerGET;
    variables = query.slug[1];
  }

  const { data } = await client.query({
    query: queryKind,
    variables: { labeler: variables },
    fetchPolicy: 'network-only',
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
`;

const Menus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.5rem;
`;
