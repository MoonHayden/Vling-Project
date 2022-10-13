import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { DELETE_TASK_OF_LABELER } from '../../../../components/gql';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const OngoingTasks = ({
  ongoingTasks,
  setLabelersTasks,
  labelerInformation,
  labelersTasks,
}) => {
  const [deleteTaskOfLabeler] = useMutation(DELETE_TASK_OF_LABELER);

  const router = useRouter();
  const goToTaskDetail = taskName => {
    router.push(`/tasks/detail/${taskName}`);
  };

  const deleteOngoingTask = async clickedTask => {
    const changedTask = labelersTasks.filter(task => {
      return task.name !== clickedTask;
    });
    try {
      await deleteTaskOfLabeler({
        variables: {
          email: labelerInformation.email,
          id: labelerInformation._id,
          name: clickedTask,
        },
      });

      toast.success(`'${clickedTask}'를 할당 취소하였습니다.`);
      setLabelersTasks(changedTask);
    } catch (e) {
      toast.error(e);
    }
  };

  if (ongoingTasks === undefined) return;

  console.log(ongoingTasks.doneVideos);
  const isHaveOngoingTask = ongoingTasks.length > 0;
  return (
    <Wrap>
      <BoldText>진행중인 테스크 {`(${ongoingTasks.length})`}</BoldText>
      <TaskWrap>
        {isHaveOngoingTask ? (
          ongoingTasks.map((task, idx) => {
            return (
              <TaskBox key={idx}>
                <Task onClick={() => goToTaskDetail(task.name)}>
                  {task.name}
                </Task>
                <Text>{task.kind}</Text>
                <Text>{task.expiration_date}</Text>
                <DeleteBtn onClick={() => deleteOngoingTask(task.name)}>
                  삭제
                </DeleteBtn>
              </TaskBox>
            );
          })
        ) : (
          <Notice>진행중인 테스크가 없습니다!</Notice>
        )}
      </TaskWrap>
    </Wrap>
  );
};

export default OngoingTasks;

const Wrap = styled.div`
  height: 10rem;
`;

const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const TaskWrap = styled.ul`
  margin-top: 1rem;
  padding: 1rem;
  background-color: white;
  height: 80%;
  overflow: auto;
`;

const TaskBox = styled.li`
  font-size: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  margin-bottom: 0.4rem;
  padding-bottom: 0.4rem;

  :last-of-type {
    border: 0px;
  }
`;

const Task = styled.span`
  width: 5rem;
  font-size: 0.8rem;
  cursor: pointer;
  :hover {
    color: red;
  }
`;

const DeleteBtn = styled.button`
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 0.7rem;
  width: 3rem;
`;

const Notice = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
`;
