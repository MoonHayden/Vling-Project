import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import CreateModal from './components/CreateModal';
import {
  ADD_TASK,
  GET_ALL_TASKS,
  GET_ALL_LABELERS,
} from '../../../components/gql';
import { useRouter } from 'next/router';
import client from '../../../components/apollo-client';

export default function AddTask({ allTasks, allLabelers }) {
  const [labelersAll, setLabelersAll] = useState([]);
  const [tasksAll, setTasksAll] = useState([]);
  const [showLabelerList, setShowLabelerList] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskKind, setTaskKind] = useState('');
  const [expDate, setExpDate] = useState('');
  const [labelerList, setLabelerList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [bodyFormData, setBodyFormData] = useState(new FormData());

  useEffect(() => {
    setLabelersAll(allLabelers.data.getAllLabelers);
    setTasksAll(allTasks.data.getAllTasks);
  }, [allLabelers, allTasks]);

  const router = useRouter();

  const onClickShowList = () => {
    setShowLabelerList(true);
  };

  const handleTaskNameInput = e => {
    setTaskName(e.target.value);
  };

  const handleTaskKindSelect = e => {
    const kindSelect = document.getElementById('kindSelect');
    const selected = kindSelect.options[kindSelect.selectedIndex].value;
    setTaskKind(selected);
  };

  const handleExpDateInput = e => {
    setExpDate(e.target.value);
  };

  const handleAddLabeler = (e, id) => {
    setLabelerList([...labelerList, { _id: id, email: e.target.value }]);
    setLabelersAll(
      labelersAll.filter(labeler => labeler.email !== e.target.value)
    );
  };

  const handleDeleteLabeler = e => {
    setLabelerList(
      labelerList.filter(labeler => labeler.email !== e.target.value)
    );
    labelersAll.push({ email: e.target.value });
    setLabelersAll(labelersAll);
  };

  const handleFileChange = e => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setBodyFormData(formData);
  };

  const [addTask] = useMutation(ADD_TASK);

  const isNotValid =
    bodyFormData.get('file') == undefined ||
    taskName.length === 0 ||
    tasksAll.find(task => task.name === taskName) ||
    taskKind === '---선택---' ||
    taskKind.length === 0 ||
    expDate.length === 0 ||
    labelerList.length === 0;

  const onClickBack = () => {
    router.push('/tasks');
  };

  return (
    <InnerWrap>
      <TaskNav>
        <AddTaskBtn onClick={onClickBack}>뒤로가기</AddTaskBtn>
        <SubmitButton
          onClick={() => {
            setModalOpen(true);
          }}
          disabled={isNotValid}
        >
          task 등록
        </SubmitButton>
      </TaskNav>
      <TaskAddWrap>
        <TaskInfoWrap>
          <TaskNameWrap>
            <CsvUploadTitle>CSV File Upload:</CsvUploadTitle>
            <CsvForm encType="multipart/form-data">
              <CsvUploadBtn
                type={'file'}
                accept={'.csv'}
                name="file"
                onChange={handleFileChange}
              />
            </CsvForm>
          </TaskNameWrap>
          <TaskNameWrap>
            <TaskName>Task Name:</TaskName>
            <TaskNameInput
              value={taskName}
              placeholder="예: 영상목록1"
              onChange={handleTaskNameInput}
              duplicated={tasksAll.find(task => task.name === taskName)}
            ></TaskNameInput>
            <ErrorMsg
              duplicated={tasksAll.find(task => task.name === taskName)}
            >
              ! 중복된 이름입니다.
            </ErrorMsg>
          </TaskNameWrap>
          <TaskNameWrap>
            <TaskName>Task Kind:</TaskName>
            <TaskKindSelect
              id="kindSelect"
              onChange={e => handleTaskKindSelect(e)}
            >
              <TaskKindOption defaultValue="---선택---">
                ---선택---
              </TaskKindOption>
              <TaskKindOption value="카테고리">카테고리</TaskKindOption>
              <TaskKindOption value="감성분류">감성분류</TaskKindOption>
              <TaskKindOption value="NER">NER</TaskKindOption>
            </TaskKindSelect>
          </TaskNameWrap>
          <TaskNameWrap>
            <TaskName>Expire Date:</TaskName>
            <TaskNameInput
              type="date"
              onChange={handleExpDateInput}
              value={expDate}
            ></TaskNameInput>
          </TaskNameWrap>
          <LabelersInfoWrap>
            <TaskName>Labelers ({labelerList.length}):</TaskName>
            <LabelersListIcon
              src="/images/labelers.png"
              alt="showLabelersList"
              onClick={onClickShowList}
            />
          </LabelersInfoWrap>
          <AddedLabelers>
            {labelerList.map(labeler => (
              <LabelerWrap key={labeler.email}>
                <LabelerName>{labeler.email}</LabelerName>
                <AddButton onClick={handleDeleteLabeler} value={labeler.email}>
                  삭제
                </AddButton>
              </LabelerWrap>
            ))}
          </AddedLabelers>
        </TaskInfoWrap>
        <LabelerListAllWrap>
          <NavTop>
            <AllLabelers>
              All Labelers ({showLabelerList && labelersAll.length}):
            </AllLabelers>
            {modalOpen && (
              <CreateModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                addTask={addTask}
                taskName={taskName}
                taskKind={taskKind}
                labelerList={labelerList}
                expDate={expDate}
                bodyFormData={bodyFormData}
              />
            )}
          </NavTop>
          {showLabelerList && (
            <LabelersListWrap>
              {labelersAll.map(labeler => (
                <LabelerWrap key={labeler._id}>
                  <LabelerName>{labeler.email}</LabelerName>
                  <AddButton
                    onClick={e => handleAddLabeler(e, labeler._id)}
                    value={labeler.email}
                  >
                    추가
                  </AddButton>
                </LabelerWrap>
              ))}
            </LabelersListWrap>
          )}
        </LabelerListAllWrap>
      </TaskAddWrap>
    </InnerWrap>
  );
}

export async function getServerSideProps() {
  const allTasks = await client.query({
    query: GET_ALL_TASKS,
    fetchPolicy: 'network-only',
  });
  const allLabelers = await client.query({
    query: GET_ALL_LABELERS,
    fetchPolicy: 'network-only',
  });
  return {
    props: { allTasks, allLabelers },
  };
}

const InnerWrap = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem;
`;

const TaskNav = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const TaskAddWrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 10px;
`;

const TaskInfoWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const TaskNameWrap = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const CsvUploadTitle = styled.p`
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const CsvForm = styled.form``;

const CsvUploadBtn = styled.input``;

const TaskName = styled.h1`
  margin-bottom: 1rem;
  font-size: 20px;
  font-weight: bold;
`;

const TaskNameInput = styled.input`
  width: 100%;
  padding-bottom: 5px;
  font-size: 16px;
  border: none;
  border-bottom: ${props =>
    props.duplicated ? '2px solid red' : '2px solid black'};
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

const ErrorMsg = styled.p`
  margin-top: 10px;
  color: red;
  font-size: 12px;
  visibility: ${props => (props.duplicated ? 'visible' : 'hidden')};
`;

const TaskKindSelect = styled.select`
  width: 100%;
  height: 2rem;
  padding-left: 5px;
  border: none;
`;

const TaskKindOption = styled.option``;

const LabelersInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AddedLabelers = styled.div`
  height: 8rem;
  overflow-y: scroll;
`;

const LabelersListIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const LabelersListWrap = styled.div`
  width: 80%;
  height: 70%;
  margin-left: 5rem;
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

const LabelerName = styled.p``;

const AddButton = styled.button``;

const LabelerListAllWrap = styled.div`
  height: 600px;
`;

const NavTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const AllLabelers = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-left: 5rem;
`;

const SubmitButton = styled.button``;

const AddTaskBtn = styled.button``;
