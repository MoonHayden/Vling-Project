import styled from 'styled-components';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import DeleteModal from './DeleteModal';
import client from '../../components/apollo-client';

const TASK_DETAIL = gql`
  query ($name: String!) {
    getTaskDetail(name: $name) {
      _id
      name
      kind
      labelers {
        _id
        googleId
        idToken
        email
        name
        value
        created_at
      }
      status
      rate
      expiration_date
    }
  }
`;

const LABELER_LIST = gql`
  query {
    getAllLabelers {
      _id
      googleId
      idToken
      email
      name
      value
      created_at
    }
  }
`;

const DELETE_TASK = gql`
  mutation ($name: String!) {
    deleteTask(name: $name) {
      name
    }
  }
`;

const ADD_LABELER = gql`
  mutation ($email: String, $name: String, $id: ID) {
    addTaskToLabeler(email: $email, name: $name, _id: $id) {
      name
    }
  }
`;

const DELETE_LABELER = gql`
  mutation ($email: String, $name: String) {
    deleteTaskOfLabeler(email: $email, name: $name) {
      email
    }
  }
`;

const UPDATE_TASK = gql`
  mutation (
    $name: String
    $kind: String
    $labelers: [addLabelerInput]
    $expirationDate: Date
  ) {
    updateTask(
      name: $name
      kind: $kind
      labelers: $labelers
      expiration_date: $expirationDate
    ) {
      name
      kind
      labelers {
        _id
        googleId
        idToken
        email
        name
        value
        created_at
      }
      status
      rate
      expiration_date
    }
  }
`;

export default function TaskDetail({ params, allLabelers }) {
  const [edit, setEdit] = useState(false);
  const [editName, setEditName] = useState('');
  const [currLabelers, setCurrLabelers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data: taskDetail } = useQuery(TASK_DETAIL, {
    variables: { name: params.taskName },
  });

  const [deleteTask] = useMutation(
    DELETE_TASK
    /*
    {
      variables: { name: params.taskName },
    }
    {
      update(cache, { data: { deleteTask } }) {
        const allTasks = cache.readQuery({ query: TASKS });
        cache.writeQuery({
          query: TASKS,
          data: { getAllTasks: [addTask, ...allTasks.data.getAllTasks] },
        });
      },
    }
    */
  );

  const [updateTask] = useMutation(UPDATE_TASK);

  const [deleteTaskOfLabeler] = useMutation(DELETE_LABELER);

  const [addTaskToLabeler] = useMutation(ADD_LABELER);

  if (taskDetail === undefined) return;

  const handleEditClick = () => {
    setEdit(!edit);
  };

  const handleEditNameInput = e => {
    setEditName(e.target.value);
  };

  const handleEditSubmit = () => {
    setEditName();
  };

  const handleCurrLabelers = () => {
    setCurrLabelers(taskDetail.getTaskDetail.labelers);
  };

  const onDeleteClick = () => {
    setDeleteModal(true);
  };

  const onDeleteLabeler = async e => {
    await deleteTaskOfLabeler({
      variables: { email: e.target.value, name: params.taskName },
    });
    /*
    updateTask({
      variables: {
        labelers: taskDetail.getTaskDetail.labelers.filter(
          labeler => labeler.email !== e.target.value
        ),
        name: params.taskName,
      },
    });
    */
    window.location.reload();
  };

  const onAddLabeler = async e => {
    await addTaskToLabeler({
      variables: { email: e.target.value, name: params.taskName },
    });
    /*
    updateTask({
      variables: {
        labelers: [...taskDetail.getTaskDetail.labelers, newobj],
        name: params.taskName,
      },
    });
    */
    window.location.reload();
  };

  return (
    <>
      <InnerWrap data={taskDetail}>
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
                  <TaskName>{taskDetail.getTaskDetail.name}</TaskName>
                </>
              )}
            </TaskNameNav>
            <TaskCategory>Kind: {taskDetail.getTaskDetail.kind}</TaskCategory>
            <ExpireDate>
              Exp.Date: {taskDetail.getTaskDetail.expiration_date}
            </ExpireDate>
          </TaskInfo>
          <ButtonsWrap>
            <Link href="/tasks">
              <GoBackBtn>뒤로가기</GoBackBtn>
            </Link>
            <DeleteBtn onClick={onDeleteClick}>Task 삭제</DeleteBtn>
            {deleteModal && (
              <DeleteModal
                deleteTask={deleteTask}
                params={params}
                taskName={taskDetail.getTaskDetail.name}
                taskKind={taskDetail.getTaskDetail.kind}
                expDate={taskDetail.getTaskDetail.expiration_date}
                setDeleteModal={setDeleteModal}
              />
            )}
            <CompleteBtn
              disabled={
                Math.round(taskDetail.getTaskDetail.rate) == 100 &&
                taskDetail.getTaskDetail.status === false
                  ? false
                  : true
              }
            >
              Task 완료
            </CompleteBtn>
          </ButtonsWrap>
        </DetailTop>
        <LabelersInfoWrap>
          <CurrentLabelersWrap>
            <CurrentLabelersTitle>
              Current Labelers ({taskDetail.getTaskDetail.labelers.length}):
            </CurrentLabelersTitle>
            <CurrentLabelers>
              {taskDetail?.getTaskDetail?.labelers?.map(labeler => (
                <CurrentListWrap key={labeler._id}>
                  <LabelerListNav>
                    <Link href={`/labeler/detail/${labeler.email}`}>
                      <LabelerName>{labeler.email}</LabelerName>
                    </Link>
                    <AddButton
                      value={labeler.email}
                      onClick={e => onDeleteLabeler(e)}
                    >
                      삭제
                    </AddButton>
                  </LabelerListNav>
                </CurrentListWrap>
              ))}
            </CurrentLabelers>
          </CurrentLabelersWrap>
          <ListWrap>
            <AllLabelers>
              Labelers: ({allLabelers.data.getAllLabelers.length})
            </AllLabelers>
            {/*
            <LabelerListNav>
              <NavName>Name:</NavName>
              <NavName>Email:</NavName>
              <NavName>Add:</NavName>
            </LabelerListNav>
            */}
            <LabelerListWrap>
              {allLabelers.data.getAllLabelers.map(labeler => (
                <LabelerWrap key={labeler._id}>
                  <Link href={`/labeler/detail/${labeler.labeler}`}>
                    <LabelerName>{labeler.email}</LabelerName>
                  </Link>
                  <AddButton value={labeler.email} onClick={onAddLabeler}>
                    추가
                  </AddButton>
                </LabelerWrap>
              ))}
            </LabelerListWrap>
          </ListWrap>
        </LabelersInfoWrap>
        <ProgressInfo>
          <RateNumber>{Math.round(taskDetail.getTaskDetail.rate)}%</RateNumber>
          <ProgressWrap>
            <FullBar status={taskDetail.getTaskDetail.status}></FullBar>
            <RateBar
              status={taskDetail.getTaskDetail.status}
              rate={taskDetail.getTaskDetail.rate}
            ></RateBar>
          </ProgressWrap>
        </ProgressInfo>
      </InnerWrap>
    </>
  );
}

const InnerWrap = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
`;

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

const LabelersInfoWrap = styled.div`
  width: 100%;
  height: 70%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 20px;
`;

const CurrentLabelersWrap = styled.div``;

const CurrentLabelers = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 70%;
  overflow-y: scroll;
`;

const CurrentLabelersTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: bold;
`;

const CurrentListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const LabelerListWrap = styled(CurrentListWrap)`
  height: 70%;
  background-color: #dcdde1;
  overflow-y: scroll;
`;

const AllLabelers = styled.h1`
  margin-bottom: 1rem;
  font-size: 20px;
  font-weight: bold;
`;

const LabelerListNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 1rem;
  border-bottom: 1px solid #fff;
`;

const ListWrap = styled.div``;

const NavName = styled.p`
  font-weight: bold;
`;

const LabelerWrap = styled(LabelerListNav)``;

const LabelerName = styled.p`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const AddButton = styled.button``;

const ProgressInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
`;

const RateNumber = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #353b48;
`;

const FullBar = styled.div`
  position: absolute;
  max-width: 100%;
  height: 1rem;
  border: 0.5px solid ${props => (props.status ? '#4cd137' : '#fbc531')};
  background-color: none;
`;

const RateBar = styled.div`
  position: relative;
  max-width: ${props => props.rate}%;
  height: 1rem;
  border: 0.5px solid ${props => (props.status ? '#4cd137' : '#fbc531')};
  background-color: ${props => (props.status ? '#4cd137' : '#fbc531')};
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

export async function getServerSideProps({ params }) {
  /*
  const taskDetail = await client.query(
    { query: TASK_DETAIL },
    { variables: { name: params.taskName } }
  );
  */
  const allLabelers = await client.query({ query: LABELER_LIST });
  return {
    props: { params, allLabelers },
  };
}
