export const GET_ALL_TASKS = gql`
  query {
    getAllTasks {
      _id
      name
      kind
      attendents
      status
      rate
      expiration_date
    }
  }
`;

export const TASK_DETAIL = gql`
  query ($name: String!) {
    getTaskDetail(name: $name) {
      _id
      name
      kind
      labelers {
        labeler
        value
      }
      status
      rate
      expiration_date
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

export const UPDATE_TASK = gql`
  mutation (
    $name: String
    $kind: String
    $labelers: [addLabelerInput]
    $expirationDate: String
  ) {
    updateTask(
      name: $name
      kind: $kind
      labelers: $labelers
      expiration_date: $expirationDate
    ) {
      name
      kind
      attendants
      labelers {
        labeler
        value
      }
      status
      rate
      expiration_date
    }
  }
`;

export const GET_ALL_LABELER = gql`
  query {
    getAllLabelers {
      labeler
      value
    }
  }
`;

export const ONGOING_TASK_LIST = gql`
  query GetLabelersTasks($labeler: String) {
    getLabelersTasks(labeler: $labeler) {
      name
      kind
      expiration_date
      labelers {
        labeler
      }
    }
  }
`;

export const TASK_OF_LABELER_ADD = gql`
  mutation AddTaskToLabeler($name: String, $labeler: String) {
    addTaskToLabeler(name: $name, labeler: $labeler) {
      name
    }
  }
`;

export const TASK_OF_LABELER_DELETE = gql`
  mutation DeleteTaskOfLabeler($name: String, $labeler: String) {
    deleteTaskOfLabeler(name: $name, labeler: $labeler) {
      labeler
    }
  }
`;

export const LABELER_DELETE = gql`
  mutation ($labeler: String) {
    deleteLabelers(labeler: $labeler) {
      labeler
    }
  }
`;
