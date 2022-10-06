import styled from 'styled-components';
import LabelerList from './_components/LabelerList';
import LabelTitle from './_components/LabelTitle';
import { gql } from '@apollo/client';
import Search from './_components/Search';
import { useEffect, useState } from 'react';
import DeleteLabeler from './_components/DeleteLabeler';
import client from '../../components/apollo-client';

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
  const [labelers, setLabelers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setLabelers(props.labelersData.getAllLabelers);
  }, [props.labelersData.getAllLabelers]);

  if (labelers === undefined) return;

  return (
    <>
      {isModalOpen && <BlurWrap onClick={() => setIsModalOpen(false)} />}
      <Wrap>
        <Menus>
          <Search />
          <DeleteLabeler
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
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
    </>
  );
}
export default labelersPage;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_ALL_LABELERS,
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

const BlurWrap = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 2000;
`;
