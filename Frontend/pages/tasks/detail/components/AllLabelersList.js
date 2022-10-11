import styled from 'styled-components';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { TASK_OF_LABELER_ADD } from '../../../../components/gql';

export default function AllLabelersList({
  taskName,
  allLabelers,
  setAllLabelers,
  currLabelersList,
  setCurrLabelersList,
  added,
}) {
  const [addTaskToLabeler] = useMutation(TASK_OF_LABELER_ADD);

  const onAddLabeler = async (e, id) => {
    await addTaskToLabeler({
      variables: { _id: id, email: e.target.value, name: taskName },
    });

    setAllLabelers(
      allLabelers.filter(labeler => labeler.email !== e.target.value)
    );
  };

  console.log(allLabelers);

  return (
    <ListWrap>
      <AllLabelers>Labelers: ({allLabelers.length})</AllLabelers>
      <LabelerListWrap>
        {allLabelers.map(labeler => (
          <LabelerWrap key={labeler._id}>
            <Link href={`/labeler/detail/${labeler.labeler}`}>
              <LabelerName>{labeler.email}</LabelerName>
            </Link>
            <AddButton
              value={labeler.email}
              onClick={e => onAddLabeler(e, labeler._id)}
              added={added}
            >
              추가
            </AddButton>
          </LabelerWrap>
        ))}
      </LabelerListWrap>
    </ListWrap>
  );
}

const ListWrap = styled.div``;

const AllLabelers = styled.h1`
  margin-bottom: 1rem;
  font-size: 20px;
  font-weight: bold;
`;

const LabelerListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 70%;
  background-color: #dcdde1;
  overflow-y: scroll;
`;

const LabelerWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 1rem;
  border-bottom: 1px solid #fff;
`;

const LabelerName = styled.p`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const AddButton = styled.button``;
