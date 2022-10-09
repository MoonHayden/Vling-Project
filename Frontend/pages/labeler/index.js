import styled from 'styled-components';
import LabelersList from './_components/LabelersList';
import { gql } from '@apollo/client';
import Search from './_components/Search';
import { useEffect, useState } from 'react';
import DeleteButton from './_components/DeleteButton';
import client from '../../components/apollo-client';
import DeleteModal from './_components/DeleteModal';

export const GET_ALL_LABELERS = gql`
  query GetAllLabelers {
    getAllLabelers {
      _id
      email
      value
    }
  }
`;

function labelersPage({ labelersData }) {
  const [labelers, setLabelers] = useState([]);
  const [clickedLabelersForDelete, setClickedLabelersForDelete] = useState([]);
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchLabelers, setSearchLabelers] = useState([]);

  useEffect(() => {
    setLabelers(labelersData.getAllLabelers);
  }, [labelersData.getAllLabelers]);

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
          <DeleteButton
            isDeleteButtonClicked={isDeleteButtonClicked}
            clickedLabelersForDelete={clickedLabelersForDelete}
            setIsModalOpen={setIsModalOpen}
            setIsDeleteButtonClicked={setIsDeleteButtonClicked}
          />
          <ModalWrap isModalOpen={isModalOpen}>
            <DeleteModal
              labelers={labelers}
              setLabelers={setLabelers}
              clickedLabelersForDelete={clickedLabelersForDelete}
              setClickedLabelersForDelete={setClickedLabelersForDelete}
              setIsModalOpen={setIsModalOpen}
              setIsDeleteButtonClicked={setIsDeleteButtonClicked}
            />
          </ModalWrap>
        </Menus>
        <TitleBox>
          <div>Email</div>
          <div>Value</div>
        </TitleBox>
        <LabelersList
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

  console.log(data);

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

const ModalWrap = styled.div`
  z-index: 3000;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: ${({ isModalOpen }) => (isModalOpen ? 'block' : 'none')};
`;
