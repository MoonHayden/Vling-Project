import styled from 'styled-components';
import LabelersList from './_components/LabelersList';
import Search from './_components/Search';
import { useEffect, useState } from 'react';
import client from '../../components/apollo-client';
import DeleteModal from './_components/DeleteModal';
import { GET_ALL_LABELERS } from '../../components/gql';
import TitleTab from './_components/TitleTab';
import { ONGOING_TASK_LIST } from '../../components/gql';
import { toast } from 'react-toastify';

function labelersPage({ labelersData, tasksData }) {
  const [labelers, setLabelers] = useState([]);
  const [clickedLabelers, setClickedLabelers] = useState([]);
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const [searchLabelers, setSearchLabelers] = useState([]);

  useEffect(() => {
    const LabellersAddedValues = labelersData.map((labeler, idx) => {
      labeler.value = tasksData[idx].length ? 'InProgress' : 'none';
      labeler.progress = tasksData[idx].length.toString();
      return labeler;
    });

    setLabelers(LabellersAddedValues);
  }, [labelersData]);

  if (!labelers) return;

  const isSearch = searchLabelers.length > 0;
  return (
    <Wrap>
      <Menus>
        <Search
          labelers={labelers}
          searchLabelers={searchLabelers}
          setSearchLabelers={setSearchLabelers}
        />
        <DeleteModal
          labelers={labelers}
          clickedLabelers={clickedLabelers}
          isDeleteButtonClicked={isDeleteButtonClicked}
          setLabelers={setLabelers}
          setClickedLabelers={setClickedLabelers}
          setIsDeleteButtonClicked={setIsDeleteButtonClicked}
        />
      </Menus>
      <TitleTab
        labelers={isSearch ? searchLabelers : labelers}
        setLabelers={isSearch ? setSearchLabelers : setLabelers}
      />
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
  const { data: labelersData } = await client.query({
    query: GET_ALL_LABELERS,
    fetchPolicy: 'network-only',
  });

  const useTaskQuery = async labelerId => {
    try {
      const data = await client.query({
        query: ONGOING_TASK_LIST,
        variables: { id: labelerId },
        fetchPolicy: 'network-only',
      });
      return data.data.getLabelersTasks;
    } catch (e) {
      console.log(e);
    }
  };

  const tasksData = await Promise.all(
    labelersData.getAllLabelers.map(
      async labeler => await useTaskQuery(labeler._id)
    )
  );

  return {
    props: {
      labelersData: labelersData.getAllLabelers,
      tasksData: tasksData,
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
