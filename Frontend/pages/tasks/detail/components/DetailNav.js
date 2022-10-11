import styled from 'styled-components';
import Link from 'next/link';
import DeleteModal from './DeleteModal';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_TASK, UPDATE_TASK } from '../../../../components/gql';

export default function DetailNav({ taskName, taskDetail }) {
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);

  const [deleteTask] = useMutation(DELETE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);

  const onDeleteClick = () => {
    setDeleteModal(true);
  };

  const handleEditClick = () => {
    setEdit(!edit);
  };

  const handleEditNameInput = e => {
    setEditName(e.target.value);
  };

  return (
    <DetailTop>
      <TaskInfo>
        <TaskNameNav>
          {edit ? (
            <>
              <TaskNameInput
                value={editName}
                placeholder="예: 영상목록1"
                onChange={handleEditNameInput}
              ></TaskNameInput>
              <CloseIcon
                src="/images/close.png"
                alt="closeIcon"
                onClick={handleEditClick}
              />
              <CheckIcon
                src="/images/check.png"
                alt="checkIcon"
                onClick={updateTask}
              />
            </>
          ) : (
            <>
              <EditIcon
                src="/images/edit.png"
                alt="editIcon"
                onClick={handleEditClick}
              />
              <TaskName>{taskName}</TaskName>
            </>
          )}
        </TaskNameNav>
        <TaskCategory>Kind: {taskDetail.kind}</TaskCategory>
        <ExpireDate>Exp.Date: {taskDetail.expiration_date}</ExpireDate>
      </TaskInfo>
      <ButtonsWrap>
        <Link href="/tasks">
          <GoBackBtn>뒤로가기</GoBackBtn>
        </Link>
        <DeleteBtn onClick={onDeleteClick}>Task 삭제</DeleteBtn>
        {deleteModal && (
          <DeleteModal
            taskName={taskName}
            taskKind={taskDetail.kind}
            expDate={taskDetail.expiration_date}
            deleteTask={deleteTask}
            setDeleteModal={setDeleteModal}
          />
        )}
        <CompleteBtn
          disabled={
            Math.round(taskDetail.rate) == 100 && taskDetail.status === false
              ? false
              : true
          }
        >
          Task 완료
        </CompleteBtn>
      </ButtonsWrap>
    </DetailTop>
  );
}

const DetailTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskNameNav = styled.div`
  display: flex;
  align-items: center;
`;

const EditIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  cursor: pointer;
`;

const TaskName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ExpireDate = styled.p`
  font-size: 14px;
  color: #353b48;
`;

const TaskCategory = styled(ExpireDate)`
  margin-bottom: 5px;
  font-size: 14px;
  color: #353b48;
`;

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const GoBackBtn = styled.button`
  margin-right: 5px;
  cursor: pointer;
`;

const DeleteBtn = styled(GoBackBtn)`
  margin-top: 3px;
`;

const CompleteBtn = styled.button`
  margin-right: 5px;
  margin-top: 3px;
  cursor: ${props => (props.disabled ? 'null' : 'pointer')};
`;
