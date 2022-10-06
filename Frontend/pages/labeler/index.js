import styled from 'styled-components';
import LabelerList from './_components/LabelerList';
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
  const [labelers, setLabelers] = useState([]);
  const [clickedLabelersForDelete, setClickedLabelersForDelete] = useState({});
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchLabelers, setSearchLabelers] = useState([]);

  useEffect(() => {
    setLabelers(props.labelersData.getAllLabelers);
  }, [props.labelersData.getAllLabelers]);

  if (labelers === undefined) return;

  return (
    <>
      {isModalOpen && <BlurWrap onClick={() => setIsModalOpen(false)} />}
      <Wrap>
        <Menus>
          <Search
            labelers={labelers}
            searchLabelers={searchLabelers}
            setSearchLabelers={setSearchLabelers}
          />
          <DeleteLabeler
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            clickedLabelersForDelete={clickedLabelersForDelete}
            setClickedLabelersForDelete={setClickedLabelersForDelete}
            isDeleteButtonClicked={isDeleteButtonClicked}
            setIsDeleteButtonClicked={setIsDeleteButtonClicked}
            labelers={labelers}
            setLabelers={setLabelers}
          />
        </Menus>
        <TitleBox>
          <div>Email</div>
          <div>Value</div>
        </TitleBox>
        <LabelerList
          labelers={labelers}
          searchLabelers={searchLabelers}
          isDeleteButtonClicked={isDeleteButtonClicked}
          clickedLabelersForDelete={clickedLabelersForDelete}
          setClickedLabelersForDelete={setClickedLabelersForDelete}
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

const TitleBox = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem 0 2rem;
  margin-top: 0.5rem;
`;
