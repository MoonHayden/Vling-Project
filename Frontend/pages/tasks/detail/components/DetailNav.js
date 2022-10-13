import styled from 'styled-components';
import Link from 'next/link';
import DeleteModal from './DeleteModal';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { DELETE_TASK, UPDATE_TASK } from '../../../../components/gql';
import { toast } from 'react-toastify';

export default function DetailNav({ taskName, taskDetail }) {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);

  if (taskDetail == undefined) {
    return;
  }

  const { kind, status, expiration_date, totalVideos, doneVideos } = taskDetail;

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

  const handleEditSubmit = () => {
    updateTask({ variables: { name: taskName, newName: editName } });
    alert('task 이름이 수정되었습니다.');
    setEdit(!edit);
    router.push(`/tasks/detail/${editName}`);
  };

  const setTaskDone = async () => {
    try {
      await updateTask({ variables: { name: taskName, status: !status } });
      toast.success(`"${taskName}" 을 완료하였습니다.`);
    } catch (err) {
      toast.error(err);
    }
    router.push('/tasks');
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
                onClick={handleEditSubmit}
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
        <TaskCategory>Kind: {kind}</TaskCategory>
        <ExpireDate>Exp.Date: {expiration_date}</ExpireDate>
      </TaskInfo>
      <ButtonsWrap>
        <Link href="/tasks">
          <GoBackBtn>뒤로가기</GoBackBtn>
        </Link>
        <DeleteBtn onClick={onDeleteClick}>Task 삭제</DeleteBtn>
        {deleteModal && (
          <DeleteModal
            taskName={taskName}
            taskKind={kind}
            expDate={expiration_date}
            deleteTask={deleteTask}
            setDeleteModal={setDeleteModal}
          />
        )}
        <CompleteBtn
          disabled={
            Math.round((doneVideos / totalVideos) * 100) == 100 &&
            taskDetail.status === false
              ? false
              : true
          }
          onClick={setTaskDone}
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
const TaskNameInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding-bottom: 5px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid black;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const CloseIcon = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const CheckIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
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
