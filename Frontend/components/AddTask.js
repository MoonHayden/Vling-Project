import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TASKS } from '../pages/tasks';
import CreateModal from '../pages/CreateModal';
import axios from 'axios';
import { argumentsObjectFromField } from '@apollo/client/utilities';

const ADD_TASK = gql`
  mutation (
    $name: String
    $kind: String
    $labelers: [addLabelerInput]
    $expirationDate: Date
  ) {
    addTask(
      name: $name
      kind: $kind
      labelers: $labelers
      expiration_date: $expirationDate
    ) {
      name
      kind
      labelers {
        _id
        email
        value
      }
      expiration_date
    }
  }
`;

export default function AddTask({ allLabelers }) {
  const [showLabelerList, setShowLabelerList] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskKind, setTaskKind] = useState('');
  const [expDate, setExpDate] = useState('');
  const [labelerList, setLabelerList] = useState([]);
  const [labelerListAll, setLabelerListAll] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(new FormData());
  const [labelerId, setLabelerId] = useState('');

  const onClickShowList = () => {
    setShowLabelerList(true);
    setLabelerListAll(allLabelers.data.getAllLabelers);
  };

  const handleTaskNameInput = e => {
    setTaskName(e.target.value);
  };

  const handleTaskKindSelect = () => {
    const kindSelect = document.getElementById('kindSelect');
    const selected = kindSelect.options[kindSelect.selectedIndex].value;
    setTaskKind(selected);
  };

  const handleExpDateInput = e => {
    setExpDate(e.target.value);
  };

  const handleAddLabeler = e => {
    for (i in labelerListAll) {
      if (i.email === e.target.value) {
        setLabelerId(i._id);
      }
    }
    console.log(labelerId);
    /*
    setLabelerList([...labelerList, { _id: labelerId, email: e.target.value }]);
    setLabelerListAll(
      labelerListAll.filter(labeler => labeler.email !== e.target.value)
    );
    */
  };

  const handleDeleteLabeler = e => {
    setLabelerList(
      labelerList.filter(labeler => labeler.email !== e.target.value)
    );
    labelerListAll.push({ email: e.target.value });
    setLabelerListAll(labelerListAll);
  };

  const [addTask] = useMutation(ADD_TASK, {
    /*
    variables: {
      name: taskName,
      kind: taskKind,
      labelers: labelerList,
      expirationDate: expDate.split('-').join(''),
      numVideos: 1,
    },
    
    refetchQueries: () => [{ query: TASKS }, 'getAllTasks'],
    options: {
      awaitRefetchQueries: true,
    },
    */
  });

  const handleFileChange = e => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setFile(formData);
    /*
    axios({
      method: 'POST',
      url: 'http://www2.wecode.buzzntrend.com:4000/upload',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(response => {
      if (response.data.success == true) {
        alert('csv파일 등록이 성공하였습니다.');
      } else if (response.data.success == false) {
        alert('csv파일 등록이 실패하였습니다.');
      }
    });
    */
  };

  return (
    <>
      <TaskAddWrap>
        <TaskInfoWrap>
          <TaskNameWrap>
            <CsvUploadTitle>CSV File Upload:</CsvUploadTitle>
            <form encType="multipart/form-data">
              <CsvUploadBtn
                type={'file'}
                accept={'.csv'}
                name="file"
                onChange={handleFileChange}
              />
            </form>
          </TaskNameWrap>
          <TaskNameWrap>
            <TaskName>Task Name:</TaskName>
            <TaskNameInput
              value={taskName}
              placeholder="예: 영상목록1"
              onChange={handleTaskNameInput}
            ></TaskNameInput>
          </TaskNameWrap>
          <TaskNameWrap>
            <TaskName>Task Kind:</TaskName>
            <TaskKindSelect id="kindSelect" onChange={handleTaskKindSelect}>
              <TaskKindOption selected disabled>
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
              src="./images/labelers.png"
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
              Labelers ({showLabelerList && labelerListAll.length}):
            </AllLabelers>

            <SubmitButton
              onClick={() => {
                setModalOpen(true);
              }}
            >
              task 등록
            </SubmitButton>
            {modalOpen && (
              <CreateModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                addTask={addTask}
                taskName={taskName}
                taskKind={taskKind}
                labelerList={labelerList}
                expDate={expDate}
                file={file}
              />
            )}
          </NavTop>
          {showLabelerList && (
            <LabelersListWrap>
              {labelerListAll.map(labeler => (
                <LabelerWrap key={labeler._id}>
                  <LabelerName>{labeler.email}</LabelerName>
                  <AddButton onClick={handleAddLabeler} value={labeler.email}>
                    추가
                  </AddButton>
                </LabelerWrap>
              ))}
            </LabelersListWrap>
          )}
        </LabelerListAllWrap>
      </TaskAddWrap>
    </>
  );
}

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
  margin-bottom: 2rem;
`;

const CsvUploadTitle = styled.p`
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const CsvUploadBtn = styled.input``;

const UploadFileBtn = styled.button``;

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
  border-bottom: 2px solid black;
  background-color: transparent;
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    color: transparent;
  }
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
  height: 12rem;
  overflow-y: scroll;
`;

const LabelersListIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const LabelersListWrap = styled.div`
  width: 80%;
  height: 80%;
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
