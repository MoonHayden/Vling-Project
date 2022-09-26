import styled from 'styled-components';
import LabelerList from './_components/LabelerList';
import client from '../../components/apollo-client';
import LabelTitle from './_components/LabelTitle';
import { gql } from '@apollo/client';

function labelersPage(props) {
  return (
    <Wrap>
      <LabelTitle>이메일</LabelTitle>
      <LabelerList labeling={props.data.labeling} />
    </Wrap>
  );
}
export default labelersPage;

//////////////////////////////////////
export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET,
  });

  return {
    props: {
      data: data,
    },
  };
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

///////////////////////////////////////////////////
const Title = styled.div`
  width: 100%;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  font-size: 25px;
`;
