import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const LABELER_LIST = gql`
  query {
    getAllLabelers {
      _id
      labeler
      value
    }
  }
`;

export default function AddTask() {
  const [showLabelerList, setShowLabelerList] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskKind, setTaskKind] = useState('');
  const [expDate, setExpDate] = useState('');
  const [labelerList, setLabelerList] = useState([]);
  const [labelerListAll, setLabelerListAll] = useState([
    { __typename: '', _id: '', labeler: '', value: '' },
  ]);

  const onClickShowList = () => {
    setShowLabelerList(true);
    setLabelerListAll(data.getAllLabelers);
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
    setLabelerList([...labelerList, { name: e.target.value, value: false }]);
    setLabelerListAll(
      labelerListAll.filter(labeler => labeler.labeler !== e.target.value)
    );
  };

  const handleDeleteLabeler = e => {
    setLabelerList(
      labelerList.filter(labeler => labeler.name !== e.target.value)
    );
    labelerListAll.push({ labeler: e.target.value });
    setLabelerListAll(labelerListAll);
  };

  const onSubmitAddTask = () => {};

  const { data } = useQuery(LABELER_LIST);
  if (data === undefined) return;

  const taskInfo = {
    task: {
      name: taskName,
      kind: taskKind,
      exp_date: expDate,
      labelers: labelerList,
    },
  };

  return (
    <>
      <TaskAddWrap>
        <TaskInfoWrap>
          <TaskNameWrap>
            <CsvUploadTitle>CSV File Upload:</CsvUploadTitle>
            <CsvUploadBtn type={'file'} accept={'.csv'} />
          </TaskNameWrap>
          <TaskNameWrap>
            <TaskName>Task Name:</TaskName>
            <TaskNameInput
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
              placeholder="예: YYYY / MM / DD"
              onChange={handleExpDateInput}
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
            {labelerList.map((labeler, index) => (
              <LabelerWrap key={index}>
                <LabelerName>{labeler.name}</LabelerName>
                <AddButton onClick={handleDeleteLabeler} value={labeler.name}>
                  삭제
                </AddButton>
              </LabelerWrap>
            ))}
          </AddedLabelers>
        </TaskInfoWrap>
        {showLabelerList && (
          <LabelersListWrap>
            {labelerListAll.map(labeler => (
              <LabelerWrap key={labeler._id}>
                <LabelerName>{labeler.labeler}</LabelerName>
                <AddButton onClick={handleAddLabeler} value={labeler.labeler}>
                  추가
                </AddButton>
              </LabelerWrap>
            ))}
          </LabelersListWrap>
        )}
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
