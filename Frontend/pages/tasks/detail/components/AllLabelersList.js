import styled from 'styled-components';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { ADD_TASK_TO_LABELER } from '../../../../components/gql';

export default function AllLabelersList({
  taskName,
  allLabelers,
  currLabelersList,
  setCurrLabelersList,
}) {
  const [addTaskToLabeler] = useMutation(ADD_TASK_TO_LABELER);

  const onAddLabeler = async (e, id) => {
    await addTaskToLabeler({
      variables: { id: id, email: e.target.value, name: taskName },
    });

    setCurrLabelersList([
      ...currLabelersList,
      { _id: id, email: e.target.value },
    ]);
  };

  const sortedLabelers = allLabelers.sort(function (a, b) {
    if (
      currLabelersList.find(
        curr => curr.email === a.email && curr.email !== b.email
      )
    ) {
      return 1;
    } else if (
      currLabelersList.find(
        curr => curr.email === b.email && curr.email !== a.email
      )
    ) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <ListWrap>
      <AllLabelers>Labelers: ({allLabelers.length})</AllLabelers>
      <LabelerListWrap>
        {sortedLabelers.map(labeler => (
          <LabelerWrap key={labeler._id}>
            <Link href={`/labeler/detail/${labeler._id}`}>
              <LabelerName>{labeler.email}</LabelerName>
            </Link>
            <AddButton
              value={labeler.email}
              onClick={e => onAddLabeler(e, labeler._id)}
              disabled={currLabelersList.find(
                curr => curr.email === labeler.email
              )}
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
