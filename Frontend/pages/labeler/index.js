import styled from 'styled-components';
import LabelersList from './_components/LabelersList';
import Search from './_components/Search';
import { useEffect, useState } from 'react';
import DeleteButton from './_components/DeleteButton';
import client from '../../components/apollo-client';
import DeleteModal from './_components/DeleteModal';
import { GET_ALL_LABELERS } from '../../components/gql';

function labelersPage({ labelersData }) {
  const [labelers, setLabelers] = useState([]);
  const [clickedLabelers, setClickedLabelers] = useState([]);
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchLabelers, setSearchLabelers] = useState([]);

  useEffect(() => {
    setLabelers(labelersData.getAllLabelers);
  }, [labelersData.getAllLabelers]);

  if (labelers === undefined) return;

  return (
    <Wrap>
      <Menus>
        <Search
          labelers={labelers}
          searchLabelers={searchLabelers}
          setSearchLabelers={setSearchLabelers}
        />
        <DeleteButton
          isDeleteButtonClicked={isDeleteButtonClicked}
          clickedLabelers={clickedLabelers}
          setIsModalOpen={setIsModalOpen}
          setIsDeleteButtonClicked={setIsDeleteButtonClicked}
        />
        <DeleteModal
          isModalOpen={isModalOpen}
          labelers={labelers}
          setLabelers={setLabelers}
          clickedLabelers={clickedLabelers}
          setClickedLabelers={setClickedLabelers}
          setIsModalOpen={setIsModalOpen}
          setIsDeleteButtonClicked={setIsDeleteButtonClicked}
        />
      </Menus>
      <TitleBox>
        <div>Email</div>
        <div>Value</div>
      </TitleBox>
      <LabelersList
        labelers={labelers}
        searchLabelers={searchLabelers}
        isDeleteButtonClicked={isDeleteButtonClicked}
        clickedLabelers={clickedLabelers}
        setClickedLabelers={setClickedLabelers}
      />
    </Wrap>
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

const TitleBox = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem 0 2rem;
  margin-top: 0.5rem;
`;
