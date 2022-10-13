import { gql } from '@apollo/client';

export const GET_ALL_TASKS = gql`
  query {
    getAllTasks {
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
      totalVideos
      doneVideos
    }
  }
`;

export const TASK_DETAIL = gql`
  query ($name: String) {
    getTaskDetail(name: $name) {
      _id
      name
      kind
      labelers {
        _id
        email
        value
      }
      status
      expiration_date
      totalVideos
      doneVideos
    }
  }
`;

export const DELETE_TASK = gql`
  mutation ($name: String!) {
    deleteTask(name: $name) {
      name
    }
  }
`;

// export const UPDATE_TASK = gql`
//   mutation ($name: String, $newName: String) {
//     updateTask(name: $name, newName: $newName) {
//       name
//     }
//   }
// `;

export const UPDATE_TASK = gql`
  mutation ($status: Boolean, $name: String) {
    updateTask(status: $status, name: $name) {
      name
      status
    }
  }
`;

export const ADD_TASK = gql`
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

export const ONGOING_TASK_LIST = gql`
  query GetLabelersTasks($id: ID) {
    getLabelersTasks(_id: $id) {
      _id
      name
      kind
      status
      expiration_date
      totalVideos
      doneVideos
    }
  }
`;

export const ADD_TASK_TO_LABELER = gql`
  mutation AddTaskToLabeler($email: String, $id: ID, $name: String) {
    addTaskToLabeler(email: $email, _id: $id, name: $name) {
      _id
    }
  }
`;

export const DELETE_TASK_OF_LABELER = gql`
  mutation DeleteTaskOfLabeler($email: String, $id: ID, $name: String) {
    deleteTaskOfLabeler(email: $email, _id: $id, name: $name) {
      _id
    }
  }
`;

export const LABELER_DELETE = gql`
  mutation DeleteLabelers($id: ID) {
    deleteLabelers(_id: $id) {
      _id
    }
  }
`;

export const GET_ALL_LABELERS = gql`
  query GetAllLabelers {
    getAllLabelers {
      _id
      email
      value
    }
  }
`;

export const GET_ALL_LABELERS_TIME = gql`
  query GetAllLabelers {
    getAllLabelers {
      _id
      email
      created_at
    }
  }
`;

export const TOTAL_TASK_LIST = gql`
  query GetAllTasks {
    getAllTasks {
      _id
      name
      kind
      status
      totalVideos
      expiration_date
    }
  }
`;

export const TOTAL_TASK_DETAIL_LIST = gql`
  query {
    getAllTasks {
      _id
      name
      kind
      status
      totalVideos
      doneVideos
      expiration_date
      labelers {
        _id
        email
      }
    }
  }
`;

export const SEARCH_LABELER = gql`
  query SearchLabeler($id: ID) {
    searchLabeler(_id: $id) {
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
