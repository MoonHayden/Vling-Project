import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
const CompleteTasks = ({ completedTasks }) => {
  const router = useRouter();

  const goToTaskDetail = taskName => {
    router.push(`/tasks/detail/${taskName}`);
  };

  const ishaveCompleteTask = completedTasks.length > 0;
  return (
    <Wrap>
      <BoldText>완료한 테스크 {`(${completedTasks.length})`}</BoldText>
      <Tasks>
        {ishaveCompleteTask ? (
          completedTasks.map((task, idx) => {
            return (
              <TaskBox key={idx}>
                <Task onClick={() => goToTaskDetail(task.name)}>
                  {task.name}
                </Task>
                <Text>{task.kind}</Text>
                <Text>정답률:mock</Text>
              </TaskBox>
            );
          })
        ) : (
          <Notice>완료한 테스크가 없습니다!</Notice>
        )}
      </Tasks>
    </Wrap>
  );
};

export default CompleteTasks;

const Wrap = styled.div`
  height: 50%;
  padding-top: 1rem;
`;
const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Tasks = styled.ul`
  margin-top: 1rem;
  background-color: white;
  width: 100%;
  height: 80%;
  padding: 1rem;
  overflow: auto;
`;

const Task = styled.li`
  font-size: 0.8rem;
  width: fit-content;

  cursor: pointer;

  :hover {
    color: red;
  }
`;

const TaskBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  margin-bottom: 0.6rem;
  padding-bottom: 0.4rem;

  :last-of-type {
    border: 0px;
  }
`;

const Text = styled.div`
  font-size: 0.7rem;
`;

const Notice = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
`;
