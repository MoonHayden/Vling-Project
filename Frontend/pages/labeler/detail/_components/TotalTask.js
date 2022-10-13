import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { ADD_TASK_TO_LABELER } from '../../../../components/gql';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const TotalTask = ({
  name,
  category,
  totalVideos,
  doneVideos,
  ongoingTasks,
  setLabelersTasks,
  expirationDate,
  labelerInformation,
  labelersTasks,
}) => {
  const router = useRouter();

  const goToTaskDetail = taskName => {
    router.push(`/tasks/detail/${taskName}`);
  };

  if (ongoingTasks === undefined) return;

  const [addTaskToLabeler] = useMutation(ADD_TASK_TO_LABELER);

  const isOverlap = ongoingTasks.find(task => task.name === name);

  const addOngoinTask = async clickedTask => {
    try {
      await addTaskToLabeler({
        variables: {
          email: labelerInformation.email,
          id: labelerInformation._id,
          name: clickedTask,
        },
      });
      toast.success(`'${clickedTask}'를 할당하였습니다.`);
      setLabelersTasks([
        { name: clickedTask, expiration_date: expirationDate, kind: category },
        ...labelersTasks,
      ]);
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <Wrap isOverlap={isOverlap}>
      <Task onClick={() => goToTaskDetail(name)} isOverlap={isOverlap}>
        {name}
      </Task>
      <Text isOverlap={isOverlap}>{category}</Text>
      <Text isOverlap={isOverlap}>{expirationDate}</Text>
      {isOverlap ? (
        <div>
          <CompleteText>할당완료</CompleteText>
        </div>
      ) : (
        <button onClick={() => addOngoinTask(name)}>할당</button>
      )}
    </Wrap>
  );
};

export default TotalTask;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid gray;

  opacity: ${({ isOverlap }) => isOverlap && '0.9'};
`;

const Task = styled.li`
  display: flex;
  align-items: center;
  height: 2rem;
  width: 5rem;
  padding-left: 0.4rem;
  font-size: 0.8rem;

  cursor: pointer;
  :hover {
    color: red;
  }

  opacity: ${({ isOverlap }) => (isOverlap ? '0.3' : '1')};
`;

const CompleteText = styled.div`
  font-size: 0.6rem;
`;

const Text = styled.div`
  font-size: 0.7rem;
  width: 3rem;
  opacity: ${({ isOverlap }) => isOverlap && '0.5'};
`;
